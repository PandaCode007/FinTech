<?php
// /api/save-config.php  —  saves prices + wallets config to MySQL
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

$prices  = (isset($data['prices'])  && is_array($data['prices']))  ? $data['prices']  : [];
$wallets = (isset($data['wallets']) && is_array($data['wallets'])) ? $data['wallets'] : [];

// Coerce prices to numbers
foreach (['COT', 'IMF', 'TAX'] as $k) {
    if (isset($prices[$k])) {
        $prices[$k] = 0 + $prices[$k];
    }
}
// Sanitize wallet strings
foreach ($wallets as $k => $v) {
    $wallets[$k] = substr(trim((string) $v), 0, 128);
}

$conn = auth_db();

// Merge with existing so we don't drop keys not sent in this request.
$current = ['prices' => [], 'wallets' => []];
$res = $conn->query("SELECT `data` FROM `auth_config` WHERE `id` = 1 LIMIT 1");
if ($res && ($row = $res->fetch_assoc())) {
    $existing = json_decode($row['data'], true);
    if (is_array($existing)) {
        $current = array_merge($current, $existing);
    }
}

$current['prices']  = array_merge((array) $current['prices'],  $prices);
$current['wallets'] = array_merge((array) $current['wallets'], $wallets);

$payload = json_encode($current, JSON_UNESCAPED_SLASHES);

$stmt = $conn->prepare(
    "INSERT INTO `auth_config` (`id`, `data`) VALUES (1, ?) ON DUPLICATE KEY UPDATE `data` = VALUES(`data`)"
);
$stmt->bind_param('s', $payload);

if ($stmt->execute()) {
    $stmt->close();
    echo json_encode(['status' => 'success', 'message' => 'Config saved']);
} else {
    $stmt->close();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to save config']);
}
