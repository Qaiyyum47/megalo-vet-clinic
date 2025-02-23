<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $articleTitle = isset($_POST['articleTitle']) ? $_POST['articleTitle'] : "";
    $article = isset($_POST['article']) ? $_POST['article'] : "";
    $imageLink = isset($_POST['imageLink']) ? $_POST['imageLink'] : "";

    $servername = "localhost:8889"; 
    $username = "test";  
    $password = "test1234";  
    $database = "WebDev";  

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO Article (title, content, imageLink) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $articleTitle, $article, $imageLink);

    if ($stmt->execute()) {
        echo "<script>alert('🎉 Article submitted successfully!'); window.location.href='admin.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>