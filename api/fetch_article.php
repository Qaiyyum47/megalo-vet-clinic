<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database configuration
require_once 'config.php'; 

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