<?php
// /api/get-config.php  —  reads prices + wallets config from MySQL
require __DIR__ . '/db.php';

$conn = auth_db();

// One-time migration from the old JSON file if present and config is still default/empty.
$jsonPath = __DIR__ . '/../data/config.json';
$res = $conn->query("SELECT `data` FROM `auth_config` WHERE `id` = 1 LIMIT 1");
$current = ($res && ($row = $res->fetch_assoc())) ? json_decode($row['data'], true) : null;

$isEmpty = !is_array($current)
    || (empty(array_filter((array) ($current['prices'] ?? [])))
        && empty(array_filter((array) ($current['wallets'] ?? []))));

if ($isEmpty && is_file($jsonPath)) {
    $fileCfg = json_decode((string) @file_get_contents($jsonPath), true);
    if (is_array($fileCfg)) {
        $payload = json_encode([
            'prices'  => $fileCfg['prices']  ?? ['COT' => 0, 'IMF' => 0, 'TAX' => 0],
            'wallets' => $fileCfg['wallets'] ?? ['BTC' => '', 'USDT' => '', 'USDC' => ''],
        ]);
        $stmt = $conn->prepare(
            "INSERT INTO `auth_config` (`id`, `data`) VALUES (1, ?) ON DUPLICATE KEY UPDATE `data` = VALUES(`data`)"
        );
        $stmt->bind_param('s', $payload);
        $stmt->execute();
        $stmt->close();
        $current = json_decode($payload, true);
    }
}

if (!is_array($current)) {
    $current = [
        'prices'  => ['COT' => 0, 'IMF' => 0, 'TAX' => 0],
        'wallets' => ['BTC' => '', 'USDT' => '', 'USDC' => ''],
    ];
}

echo json_encode($current);
