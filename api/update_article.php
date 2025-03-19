<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost:8889"; 
$username = "test";  
$password = "test1234";  
$database = "WebDev";  

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("<p style='color:red;'>❌ Database connection failed: " . $conn->connect_error . "</p>");
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["articleId"]) && ctype_digit($_POST["articleId"])) {
    $articleId = intval($_POST["articleId"]);
    $articleTitle = $_POST["articleTitle"];
    $articleContent = $_POST["articleContent"];
    $imageLink = $_POST["imageLink"];

    // Update article in database
    $stmt = $conn->prepare("UPDATE Article SET title = ?, content = ?, imageLink = ? WHERE id = ?");
    $stmt->bind_param("sssi", $articleTitle, $articleContent, $imageLink, $articleId);

    if ($stmt->execute()) {
        header("Location: ../pages/edit_article.php?id=$articleId&updated=true");
        exit();
    } else {
        echo "<p style='color:red;'>❌ Failed to update article.</p>";
    }

    $stmt->close();
}

$conn->close();
?>