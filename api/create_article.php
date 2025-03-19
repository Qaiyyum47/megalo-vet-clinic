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
    die("❌ Database connection failed: " . $conn->connect_error);
}

// Check if form data is received
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = isset($_POST['articleTitle']) ? trim($_POST['articleTitle']) : '';
    $content = isset($_POST['articleContent']) ? trim($_POST['articleContent']) : '';
    $imageLink = isset($_POST['imageLink']) ? trim($_POST['imageLink']) : '';

    // Validate required fields
    if (empty($title) || empty($content)) {
        die("❌ Title and content are required.");
    }

    // Insert new article into the database
    $stmt = $conn->prepare("INSERT INTO Article (title, content, imageLink) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $imageLink);

    if ($stmt->execute()) {
        // Redirect to admin panel with success flag
        header("Location: ../pages/admin.html?success=1");
        exit();
    } else {
        echo "❌ Error creating article: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>