const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const newsContainer = document.getElementById('news-container');

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchNews(query);
    } else {
        alert("Please enter a search term");
    }
});

// Function to fetch news based on the query
async function fetchNews(query) {
    const url = `http://localhost:3000/news?q=${encodeURIComponent(query)}`; // Proxy server URL
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Log the API response for debugging
        console.log("API Response:", data);

        if (data.status === "ok" && data.articles) {
            displayNews(data.articles);
        } else if (data.status === "error") {
            console.error("API Error:", data.message);
            newsContainer.innerHTML = `<p>Error: ${data.message}</p>`;
        } else {
            console.error("No articles found", data);
            newsContainer.innerHTML = '<p>No news articles found.</p>';
        }
    } catch (error) {
        console.error("Error fetching news", error);
        newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
    }
}

// Function to display news articles
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear previous results
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'blog-card';

        const image = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/600x400';
        const title = article.title ? article.title : 'No title available';
        const description = article.description ? article.description : 'No description available';

        newsCard.innerHTML = `
            <a href="${article.url}" target="_blank">
                <img src="${image}" alt="News Image">
                <div class="blog-content">
                    <h3 class="blog-title">${title}</h3>
                    <p class="blog-description">${description}</p>
                </div>
            </a>
        `;

        newsContainer.appendChild(newsCard);
    });
}
