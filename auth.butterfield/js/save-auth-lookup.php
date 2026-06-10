<?php
// save-auth-lookup.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit;
  }

  $jsContent = 'window.AccountDatabase = ' . json_encode($data, JSON_PRETTY_PRINT) . ';';

  $result = file_put_contents(__DIR__ . '/js/auth-lookup.js', $jsContent);

  if ($result !== false) {
    echo json_encode(["status" => "success", "message" => "auth-lookup.js updated"]);
  } else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to write file"]);
  }
} else {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>