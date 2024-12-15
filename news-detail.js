document.addEventListener("DOMContentLoaded", function() {
    // Get data from query parameters
    const urlParams = new URLSearchParams(window.location.search);

    const title = decodeURIComponent(urlParams.get('title'));
    const description = decodeURIComponent(urlParams.get('description'));
    const imageUrl = decodeURIComponent(urlParams.get('imageUrl'));
    const link = decodeURIComponent(urlParams.get('link'));

    // Set the content on the page
    document.getElementById("article-title").textContent = title;
    document.getElementById("article-description").textContent = description;

    if (imageUrl) {
        document.getElementById("article-image").src = imageUrl;
    }

    document.getElementById("article-link").href = link;
});
