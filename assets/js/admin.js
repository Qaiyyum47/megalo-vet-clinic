document.addEventListener("DOMContentLoaded", function () {
    fetchArticles();
});

function fetchArticles() {
    fetch("../api/fetch_article.php") // Adjusted path
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            let tableBody = document.getElementById("articleTableBody");
            tableBody.innerHTML = ""; // Clear existing content

            data.forEach(article => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${article.title}</td>
                    <td>${article.date}</td>
                    <td>${article.time}</td>
                    <td>
                        <button class="edit-btn" onclick="editArticle(${article.id})">Edit</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching articles:", error));
}

function editArticle(articleId) {
    window.location.href = ` edit_article.php?id=${articleId}`; // Redirects to the HTML page
}