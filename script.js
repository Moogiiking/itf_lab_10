document.addEventListener("DOMContentLoaded", function() {
    fetch('https://rss.nytimes.com/services/xml/rss/nyt/World.xml')
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, "application/xml");

            const items = xmlDoc.getElementsByTagName('item');
            const newsList = document.getElementById("news-list");

            Array.from(items).forEach(item => {
                const title = item.getElementsByTagName('title')[0].textContent;
                const description = item.getElementsByTagName('description')[0].textContent;
                const link = item.getElementsByTagName('link')[0].textContent;
                const imageUrl = item.getElementsByTagName('media:content')[0]?.getAttribute('url');

                const li = document.createElement("li");

                // Add image if available
                if (imageUrl) {
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    li.appendChild(img);
                }

                // Add title
                const h3 = document.createElement("h3");
                h3.textContent = title;
                li.appendChild(h3);

                // Add description
                const p = document.createElement("p");
                p.textContent = description;
                li.appendChild(p);

                // Redirect to news detail page when clicked
                li.addEventListener("click", () => {
                    // Use query parameters to pass the article data
                    const encodedTitle = encodeURIComponent(title);
                    const encodedDescription = encodeURIComponent(description);
                    const encodedImageUrl = encodeURIComponent(imageUrl);
                    const encodedLink = encodeURIComponent(link);

                    window.location.href = `news-detail.html?title=${encodedTitle}&description=${encodedDescription}&imageUrl=${encodedImageUrl}&link=${encodedLink}`;
                });

                newsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
        });
});
