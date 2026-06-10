<?php
/**
 * Shared MySQL connection for the auth.butterfield sub-app.
 *
 * Uses the SAME database as the main bank app (oikacpmf_root).
 * Update the credentials below to match your cPanel MySQL database
 * (the same ones you put in the main app's .env DATABASE section).
 *
 * Tables used by this sub-app (created automatically on first run):
 *   - auth_accounts : the auth-lookup users shown in the admin dashboard
 *   - auth_config   : a single-row key/value store for prices + wallets
 */

// ---------------------------------------------------------------------
// DATABASE CREDENTIALS  (match your main app .env)
// ---------------------------------------------------------------------
$DB_HOST = 'localhost';
$DB_NAME = 'pxkkzkoy_butterfieldapp';
$DB_USER = 'pxkkzkoy_butterfieldapp';
$DB_PASS = 'pxkkzkoy_butterfieldapp';
$DB_PORT = 3306;

header('Content-Type: application/json');

/**
 * Returns a shared mysqli connection, or sends a JSON 500 and exits.
 */
function auth_db()
{
    global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS, $DB_PORT;
    static $conn = null;

    if ($conn instanceof mysqli) {
        return $conn;
    }

    mysqli_report(MYSQLI_REPORT_OFF); // we handle errors manually

    $conn = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, (int) $DB_PORT);
    if ($conn->connect_errno) {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Database connection failed',
        ]);
        exit;
    }
    $conn->set_charset('utf8mb4');

    auth_ensure_schema($conn);

    return $conn;
}

/**
 * Creates the required tables if they don't exist, and seeds a default
 * config row so the dashboard always has something to read.
 */
function auth_ensure_schema(mysqli $conn)
{
    $conn->query(
        "CREATE TABLE IF NOT EXISTS `auth_accounts` (
            `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            `account_id` VARCHAR(20) NOT NULL,
            `name` VARCHAR(190) NOT NULL DEFAULT '',
            `password` VARCHAR(190) NOT NULL DEFAULT '',
            `code_type` VARCHAR(10) NOT NULL DEFAULT 'COT',
            PRIMARY KEY (`id`),
            KEY `idx_account_id` (`account_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
    );

    $conn->query(
        "CREATE TABLE IF NOT EXISTS `auth_config` (
            `id` TINYINT UNSIGNED NOT NULL DEFAULT 1,
            `data` LONGTEXT NOT NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
    );

    // Seed a default config row if the table is empty.
    $res = $conn->query("SELECT COUNT(*) AS c FROM `auth_config`");
    if ($res && ($row = $res->fetch_assoc()) && (int) $row['c'] === 0) {
        $default = json_encode([
            'prices'  => ['COT' => 0, 'IMF' => 0, 'TAX' => 0],
            'wallets' => ['BTC' => '', 'USDT' => '', 'USDC' => ''],
        ]);
        $stmt = $conn->prepare("INSERT INTO `auth_config` (`id`, `data`) VALUES (1, ?)");
        $stmt->bind_param('s', $default);
        $stmt->execute();
        $stmt->close();
    }
}
