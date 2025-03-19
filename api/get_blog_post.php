<?php
header('Content-Type: application/json');

$servername = "localhost:8889"; 
$username = "test";  
$password = "test1234";  
$database = "WebDev";  

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the article ID from the URL
$articleId = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($articleId <= 0) {
    die(json_encode(["error" => "Invalid article ID."]));
}

// Fetch the article
$sql = "SELECT title, content, imageLink, publishedDateTime FROM Article WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $articleId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["error" => "Article not found."]);
}

$stmt->close();
$conn->close();
?>