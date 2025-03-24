<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database configuration
require_once 'config.php'; 

// Check connection
if ($conn->connect_error) {
    die("<p style='color:red;'>❌ Database connection failed: " . $conn->connect_error . "</p>");
}

// Use GET method for deletion
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id']) && ctype_digit($_GET['id'])) {
    $articleId = intval($_GET['id']);

    // Prepare delete query
    $stmt = $conn->prepare("DELETE FROM Article WHERE id = ?");
    $stmt->bind_param("i", $articleId);

    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        header("Location: ../pages/admin.html?deleted=1");
        exit();
    } else {
        die("<p style='color:red;'>❌ Failed to delete article: " . $stmt->error . " | " . $conn->error . "</p>");
    }
} else {
    die("<p style='color:red;'>❌ Invalid request.</p>");
}

$conn->close();
?>