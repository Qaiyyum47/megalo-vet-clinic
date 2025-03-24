<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database configuration
require_once 'config.php'; 

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get page number from request, default to 1
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 10; // Number of articles per request
$offset = ($page - 1) * $limit; // Offset calculation

// FIXED: Include `id` in the query
$sql = "SELECT id, title, content, imageLink, DATE_FORMAT(publishedDateTime, '%Y-%m-%d %H:%i:%s') AS formattedDate FROM Article ORDER BY id DESC LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

$articles = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $articles[] = $row;
    }
}

// Check if there are more articles
$hasMore = ($result->num_rows == $limit);

echo json_encode([
    "articles" => $articles,
    "hasMore" => $hasMore
]);

$conn->close();
?>