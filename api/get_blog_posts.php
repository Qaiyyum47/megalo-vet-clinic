<?php
header('Content-Type: application/json'); // Ensure JSON response

$servername = "localhost:8889"; 
$username = "test";  
$password = "test1234";  
$database = "WebDev";  

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get page number from request, default to 1
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = 10; // Number of articles per request
$offset = ($page - 1) * $limit; // Offset calculation

$sql = "SELECT title, content, imageLink FROM Article ORDER BY id DESC LIMIT $limit OFFSET $offset";
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