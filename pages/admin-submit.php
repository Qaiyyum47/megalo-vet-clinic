<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = []; // Array to store errors
    $articleTitle = htmlspecialchars(strip_tags(trim($_POST['articleTitle'])), ENT_QUOTES, 'UTF-8');
    $article = nl2br(htmlspecialchars(strip_tags(trim($_POST['article'])), ENT_QUOTES, 'UTF-8'));
    $imageLink = trim($_POST['imageLink'] ?? ""); 
    $imagePath = "";

    // Validate file upload
    if (!empty($_FILES['imageFile']['name'])) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $maxFileSize = 5 * 1024 * 1024; // 5MB
        $fileType = mime_content_type($_FILES['imageFile']['tmp_name']);
        $fileSize = $_FILES['imageFile']['size'];

        if (!in_array($fileType, $allowedTypes)) {
            $errors[] = "❌ Invalid file type. Only JPG, PNG, GIF, and WEBP are allowed.";
        }

        if ($fileSize > $maxFileSize) {
            $errors[] = "❌ File size exceeds the 5MB limit.";
        }

        if (empty($errors)) {
            $targetDir = "uploads/";
            if (!is_dir($targetDir)) {
                mkdir($targetDir, 0777, true);
            }
            
            $imagePath = $targetDir . basename($_FILES["imageFile"]["name"]);
            
            if (!move_uploaded_file($_FILES["imageFile"]["tmp_name"], $imagePath)) {
                $errors[] = "❌ Error uploading the file.";
            }
        }
    }

    // Validate image URL
    if (!empty($imageLink)) {
        if (!filter_var($imageLink, FILTER_VALIDATE_URL)) {
            $errors[] = "❌ Invalid URL format.";
        } else {
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            $urlPath = parse_url($imageLink, PHP_URL_PATH);
            $extension = strtolower(pathinfo($urlPath, PATHINFO_EXTENSION));

            if (!in_array($extension, $allowedExtensions)) {
                $errors[] = "❌ Invalid image link. Only direct image URLs (JPG, PNG, GIF, WEBP) are allowed.";
            }
        }

        if (empty($errors)) {
            $imagePath = $imageLink; // Use valid image link
        }
    }

    // If errors exist, show alerts and stop execution before saving to DB
    if (!empty($errors)) {
        echo "<script>alert('" . implode("\\n", $errors) . "');</script>";
    } else {
        // Database connection
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $conn = new mysqli("localhost:8889", "test", "test1234", "WebDev");
        $conn->set_charset("utf8mb4");

        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO Article (title, content, imageLink) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $articleTitle, $article, $imagePath);

        if ($stmt->execute()) {
            echo "<script>alert('🎉 Article submitted successfully!'); window.location.href='admin.html';</script>";
        } else {
            echo "<script>alert('❌ Error: " . $stmt->error . "');</script>";
        }

        // Close connections
        $stmt->close();
        $conn->close();
    }
}
?>