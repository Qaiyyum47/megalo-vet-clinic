<?php
header('Content-Type: application/json'); // Ensure JSON response
error_reporting(E_ALL);
ini_set('display_errors', 1); // Show PHP errors for debugging

$servername = "localhost:8889"; 
$username = "test";  
$password = "test1234";  
$database = "WebDev";  

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Fetch articles (Make sure all fields exist in the DB)
$query = "SELECT id, title, content, imageLink, publishedDateTime FROM Article ORDER BY publishedDateTime DESC";
$result = $conn->query($query);

$articles = [];
while ($row = $result->fetch_assoc()) {
    if (!empty($row['publishedDateTime'])) {
        $dateTime = new DateTime($row['publishedDateTime']);
        $articles[] = [
            'id' => $row['id'],
            'title' => $row['title'] ?? 'Untitled', // Ensure title is always set
            'content' => $row['content'] ?? '', // Ensure content is always set
            'imageLink' => $row['imageLink'] ?? '', // Ensure imageLink is always set
            'date' => $dateTime->format('Y-m-d'),
            'time' => $dateTime->format('H:i')
        ];
    }
}

echo json_encode($articles, JSON_PRETTY_PRINT); // Pretty print JSON for easier debugging

$conn->close();
?>