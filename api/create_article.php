<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection settings
$servername = "localhost:8889"; 
$username = "test";  
$password = "test1234";  
$database = "WebDev";  

$conn = new mysqli($servername, $username, $password, $database);

// Check database connection
if ($conn->connect_error) {
    die("<p style='color:red;'>❌ Database connection failed: " . $conn->connect_error . "</p>");
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['articleTitle'];
    $content = $_POST['articleContent'];
    $imageLink = $_POST['imageLink'];

    // Prepare and insert into database
    $stmt = $conn->prepare("INSERT INTO Article (title, content, imageLink) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $imageLink);

    if ($stmt->execute()) {
        // Redirect back to the form with a success flag
        header("Location: ../pages/create_article.php?success=1");
        exit();
    } else {
        echo "<p style='color:red;'>❌ Failed to create article.</p>";
    }

    $stmt->close();
}

$conn->close();
?>