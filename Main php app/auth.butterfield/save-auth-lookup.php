<?php
header("Content-Type: application/json");

$data = file_get_contents("php://input");
if (!$data) {
  echo json_encode(["message" => "No data received."]);
  exit;
}

$decoded = json_decode($data, true);
if (!is_array($decoded)) {
  echo json_encode(["message" => "Invalid data format."]);
  exit;
}

$output = "<?php\n\nwindow.AccountDatabase = " . json_encode($decoded, JSON_PRETTY_PRINT) . ";\n";
$fileSaved = file_put_contents(__DIR__ . "/js/auth-lookup.js", $output);

if ($fileSaved !== false) {
  echo json_encode(["message" => "✅ Data synced to auth-lookup.js"]);
} else {
  echo json_encode(["message" => "❌ Failed to write file. Check permissions."]);
}
?>
