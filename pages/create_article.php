<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create New Article</title>
    <link rel="stylesheet" href="../assets/css/global.css">
    <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>
    <header id="main-header"></header>

    <section id="landing-section" class="content red">
        <h1>Admin</h1>
        <h3>Center</h3>
    </section>

    <h2>Create New Article</h2>
    <form action="../api/create_article.php" method="POST">
        <div class="form-group">
            <label>Title:</label>
            <input type="text" name="articleTitle" required><br><br>
        </div>
        
        <div class="form-group">
            <label>Content:</label>
            <textarea name="articleContent" rows="5" required></textarea><br><br>
        </div>

        <div class="form-group">
            <label>Image Link:</label>
            <input type="text" name="imageLink"><br><br>
        </div>

        <div class="btn-group">
            <input type="submit" id="submit" value="Submit" class="btn">
            <input type="reset" id="reset" value="Reset Form" class="btn">
        </div>
    </form>

    <footer id="main-footer"></footer>
    <p id="cpr">&copy; 2025 All rights reserved.</p>

    <script src="../assets/js/main.js"></script>
    <script>
        // Show success pop-up if article was created
        window.onload = function () {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has("success")) {
                alert("✅ Article created successfully!");
                window.location.href = "admin.html"; // Redirect to articles management page
            }
        };
    </script>
</body>
</html>