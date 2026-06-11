<?php
// /api/save-accounts.php  —  saves the full auth-lookup account list to MySQL
require __DIR__ . '/db.php';

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
    exit;
}

$rows = json_decode($raw, true);
if (!is_array($rows)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

$conn = auth_db();

// Replace the whole set atomically (the dashboard always sends the full list).
$conn->begin_transaction();
try {
    $conn->query("DELETE FROM `auth_accounts`");

    $stmt = $conn->prepare(
        "INSERT INTO `auth_accounts` (`account_id`, `name`, `password`, `code_type`) VALUES (?, ?, ?, ?)"
    );

    foreach ($rows as $row) {
        $accountId = substr(trim((string) ($row['accountId'] ?? '')), 0, 20);
        $name      = substr(trim((string) ($row['name'] ?? '')), 0, 190);
        $password  = substr(trim((string) ($row['password'] ?? '')), 0, 190);
        $codeType  = substr(trim((string) ($row['codeType'] ?? 'COT')), 0, 10);

        if ($accountId === '') {
            continue; // skip empty rows
        }

        $stmt->bind_param('ssss', $accountId, $name, $password, $codeType);
        $stmt->execute();
    }
    $stmt->close();

    $conn->commit();
    echo json_encode(['status' => 'success', 'message' => '✅ Accounts saved successfully']);
} catch (Throwable $e) {
    $conn->rollback();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => '❌ Failed to save accounts']);
}
