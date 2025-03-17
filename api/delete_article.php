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

// Get article ID
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['articleId']) && ctype_digit($_POST['articleId'])) {
    $articleId = intval($_POST['articleId']);

    // Delete article query
    $stmt = $conn->prepare("DELETE FROM Article WHERE id = ?");
    $stmt->bind_param("i", $articleId);

    if ($stmt->execute()) {
        header("Location: ../pages/admin.html?deleted=1");
        exit();
    } else {
        die("<p style='color:red;'>❌ Failed to delete article: " . $stmt->error . "</p>");
    }

    $stmt->close();
}

$conn->close();
?>