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

// Get article ID from URL and validate it
$articleId = isset($_GET['id']) && ctype_digit($_GET['id']) ? intval($_GET['id']) : 0;

if ($articleId <= 0) {
    die("<p style='color:red;'>❌ Invalid article ID.</p>");
}

$articleTitle = "";
$articleContent = "";
$imageLink = "";

// Fetch article details
$stmt = $conn->prepare("SELECT title, content, imageLink FROM Article WHERE id = ?");
$stmt->bind_param("i", $articleId);
$stmt->execute();
$stmt->bind_result($articleTitle, $articleContent, $imageLink);

if (!$stmt->fetch()) {
    die("<p style='color:red;'>❌ Article not found.</p>");
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Article</title>
    <link rel="stylesheet" href="../assets/css/global.css">
    <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>
    <header id="main-header"></header>

    <section id="landing-section" class="content red">
        <h1>Admin</h1>
        <h3>Center</h3>
    </section>

    <h2>Edit Article</h2>
    <form action="../api/update_article.php" method="POST">
        <input type="hidden" name="articleId" value="<?php echo htmlspecialchars($articleId); ?>">

        <div class="form-group">
            <label>Title:</label>
            <input type="text" name="articleTitle" value="<?php echo htmlspecialchars($articleTitle); ?>" required>
        </div>
        
        <div class="form-group">
            <label>Content:</label>
            <textarea name="articleContent" rows="5" required><?php echo htmlspecialchars($articleContent); ?></textarea>
        </div>

        <div class="form-group">
            <label>Image Link:</label>
            <input type="text" name="imageLink" value="<?php echo htmlspecialchars($imageLink); ?>">
        </div>

        <div class="btn-group">
            <input type="submit" id="submit" value="Update" class="btn">
            <button type="button" id="delete" class="btn red" onclick="confirmDelete(<?php echo $articleId; ?>)">Delete</button>
        </div>
    </form>

    <footer id="main-footer"></footer>
    <p id="cpr">&copy; 2025 All rights reserved.</p>

    <script src="../assets/js/main.js"></script>
    <script>
        function confirmDelete(articleId) {
            if (confirm("Are you sure you want to delete this article? This action cannot be undone!")) {
                window.location.href = "../api/delete_article.php?id=" + articleId;
            }
        }

        // Show success message if updated
        window.onload = function () {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has("updated")) {
                alert("✅ Article updated successfully!");
                window.location.href = "admin.html"; // Redirect to admin panel
            }
        };
    </script>
</body>
</html>