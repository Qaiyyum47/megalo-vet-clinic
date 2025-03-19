document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    if (!articleId) {
        document.getElementById("article-content").innerHTML = "<p style='color:red;'>❌ Article not found.</p>";
        return;
    }

    try {
        let response = await fetch(`../api/get_blog_post.php?id=${articleId}`);
        let article = await response.json();

        if (article.error) {
            document.getElementById("article-content").innerHTML = "<p style='color:red;'>❌ " + article.error + "</p>";
        } else {
            document.getElementById("article-title").textContent = article.title;
            document.getElementById("article-date").textContent = "📅 " + new Date(article.publishedDateTime).toLocaleString();
            document.getElementById("article-image").src = article.imageLink || "../assets/img/default.jpg";
            document.getElementById("article-body").innerHTML = article.content.replace(/\n/g, "<br>");
        }
    } catch (error) {
        console.error("Error loading article:", error);
        document.getElementById("article-content").innerHTML = "<p style='color:red;'>Failed to load article.</p>";
    }
});