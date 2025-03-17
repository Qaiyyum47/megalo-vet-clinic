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

// Get article ID from URL
$articleId = isset($_GET['id']) && ctype_digit($_GET['id']) ? intval($_GET['id']) : 0;

if ($articleId > 0) {
    $stmt = $conn->prepare("DELETE FROM Article WHERE id = ?");
    $stmt->bind_param("i", $articleId);
    if ($stmt->execute()) {
        echo "<script>alert('✅ Article deleted successfully!'); window.location.href = '../pages/admin.html';</script>";
    } else {
        echo "<script>alert('❌ Failed to delete article.'); window.history.back();</script>";
    }
    $stmt->close();
}

$conn->close();
?>