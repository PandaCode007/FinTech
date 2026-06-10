<?php
// /api/get-accounts.php  —  reads auth-lookup accounts from MySQL
require __DIR__ . '/db.php';

$conn = auth_db();

// One-time migration: if the table is empty but the old JSON file exists,
// import it so no existing data is lost.
$check = $conn->query("SELECT COUNT(*) AS c FROM `auth_accounts`");
if ($check && ($r = $check->fetch_assoc()) && (int) $r['c'] === 0) {
    $jsonPath = __DIR__ . '/../data/accounts.json';
    if (is_file($jsonPath)) {
        $rows = json_decode((string) @file_get_contents($jsonPath), true);
        if (is_array($rows)) {
            $stmt = $conn->prepare(
                "INSERT INTO `auth_accounts` (`account_id`, `name`, `password`, `code_type`) VALUES (?, ?, ?, ?)"
            );
            foreach ($rows as $row) {
                $accountId = (string) ($row['accountId'] ?? '');
                $name      = (string) ($row['name'] ?? '');
                $password  = (string) ($row['password'] ?? '');
                $codeType  = (string) ($row['codeType'] ?? 'COT');
                $stmt->bind_param('ssss', $accountId, $name, $password, $codeType);
                $stmt->execute();
            }
            $stmt->close();
        }
    }
}

$accounts = [];
$res = $conn->query("SELECT `account_id`, `name`, `password`, `code_type` FROM `auth_accounts` ORDER BY `id` ASC");
if ($res) {
    while ($row = $res->fetch_assoc()) {
        $accounts[] = [
            'accountId' => $row['account_id'],
            'name'      => $row['name'],
            'password'  => $row['password'],
            'codeType'  => $row['code_type'],
        ];
    }
}

echo json_encode($accounts);
