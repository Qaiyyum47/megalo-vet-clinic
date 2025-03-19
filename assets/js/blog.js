document.addEventListener("DOMContentLoaded", function () {
    let blogContainer = document.querySelector("#articles-container");
    let loading = false;
    let page = 1;
    let hasMore = true;
    let articleIndex = 0; // To track even/odd articles

    // Create a loading indicator
    let loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loading-indicator";
    loadingIndicator.innerHTML = "<p>Loading articles...</p>";
    loadingIndicator.style.textAlign = "center";
    loadingIndicator.style.display = "none";
    blogContainer.appendChild(loadingIndicator);

    async function fetchArticles() {
        if (loading || !hasMore) return;
        loading = true;
        loadingIndicator.style.display = "block"; // Show loading indicator
    
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
    
                    // Format the published date
                    let datePublished = article.formattedDate 
                        ? new Date(article.formattedDate).toLocaleString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })
                        : "Unknown Date"; // Handle missing date
    
                    // Truncate content for preview
                    let previewContent = article.content.length > 150 
                        ? article.content.substring(0, 150) + "..." 
                        : article.content;
    
                    // Alternate between "peach" and "white"
                    section.classList.add("content", articleIndex % 2 === 0 ? "peach" : "white");
                    section.innerHTML = `
                        <div class="article">
                            <img src="${imageSrc}" alt="${article.title}">
                            <div class="article-content">
                                <h1>${article.title}</h1>
                                <p class="article-date">📅 ${datePublished}</p>
                                <p>${previewContent}</p>
                                <a href="blog_post.html?id=${article.id}" class="btn">Read More</a>
                            </div>
                        </div>
                    `;
                    
                    blogContainer.appendChild(section);
                    articleIndex++;
                });
    
                page++;
            } else {
                hasMore = false; // No more articles to load
                loadingIndicator.innerHTML = "<p>No more articles to load.</p>";
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
            loadingIndicator.innerHTML = "<p style='color:red;'>Failed to load articles. Try again.</p>";
        } finally {
            loading = false;
            setTimeout(() => {
                loadingIndicator.style.display = "none";
            }, 1000);
        }
    }

    // Load first batch
    fetchArticles();

    // Efficient Infinite Scroll with IntersectionObserver
    let observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            fetchArticles();
        }
    }, { threshold: 1.0 });

    observer.observe(loadingIndicator);
});