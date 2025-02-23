<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $articleTitle = $_POST['articleTitle'] ?? "";
    $article = $_POST['article'] ?? "";
    $imageLink = $_POST['imageLink'] ?? ""; // Image URL (optional)
    $imagePath = "";

    // Database credentials
    $servername = "localhost:8889"; 
    $username = "test";  
    $password = "test1234";  
    $database = "WebDev";  

    // Handle file upload if provided
    if (!empty($_FILES['imageFile']['name'])) {
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true); // Ensure the folder exists
        }
        $imagePath = $targetDir . basename($_FILES["imageFile"]["name"]);
        move_uploaded_file($_FILES["imageFile"]["tmp_name"], $imagePath);
    }

    // If image URL is provided, use it instead of the uploaded file
    if (!empty($imageLink)) {
        $imagePath = $imageLink;
    }

    // Database connection
    $conn = new mysqli($servername, $username, $password, $database);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute the SQL statement
    $stmt = $conn->prepare("INSERT INTO Article (title, content, imageLink) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $articleTitle, $article, $imagePath);

    if ($stmt->execute()) {
        echo "<script>alert('🎉 Article submitted successfully!'); window.location.href='admin.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close connections
    $stmt->close();
    $conn->close();
}
?>