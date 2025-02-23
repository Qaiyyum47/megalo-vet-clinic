document.addEventListener("DOMContentLoaded", function () {
    let blogContainer = document.querySelector("#articles-container");
    let loading = false;
    let page = 1;
    let hasMore = true;
    let articleIndex = 0; // To track even/odd articles

    async function fetchArticles() {
        if (loading || !hasMore) return;
        loading = true;

        try {
            let response = await fetch(`../api/get_blog_posts.php?page=${page}`);
            let data = await response.json();

            if (data.articles.length > 0) {
                data.articles.forEach(article => {
                    let section = document.createElement("section");

                    // Check if imageLink is null or empty, then set a default image
                    let imageSrc = article.imageLink && article.imageLink.trim() !== "" 
                        ? article.imageLink 
                        : '../assets/img/default.jpg';

                    // Alternate between "peach" and "white"
                    section.classList.add("content", articleIndex % 2 === 0 ? "peach" : "white");
                    section.innerHTML = `
                        <div class="article">
                            <img src="${imageSrc}" alt="Article Image">
                            <div class="article-content">
                                <h1>${article.title}</h1>
                                <p>${article.content}</p>
                            </div>
                        </div>
                    `;
                    blogContainer.appendChild(section);
                    
                    articleIndex++; // Increment the counter
                });

                page++;
            } else {
                hasMore = false; // No more articles to load
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            loading = false;
        }
    }

    // Load first batch
    fetchArticles();

    // Infinite scroll: Fetch more when near bottom
    window.addEventListener("scroll", function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            fetchArticles();
        }
    });
});