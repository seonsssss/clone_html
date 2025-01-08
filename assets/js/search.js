
// 검색 기능 초기화
async function initializeSearch() {
    const searchInput = document.querySelector(".search-box input");
    const searchResultsContainer = document.querySelector(".search-results");

    if (!searchInput || !searchResultsContainer) {
        console.error("Search elements not found!");
        return;
    }

    const movieData = await fetch("assets/data/movie.json")
        .then(res => res.json())
        .then(data => data.movies)
        .catch(error => {
            console.error("Error loading movie.json:", error);
            return [];
        });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        searchResultsContainer.innerHTML = "";

        if (query) {
            const results = movieData.filter(item =>
                item.title.toLowerCase().includes(query)
            );

            results.forEach(result => {
                const resultDiv = document.createElement("div");
                resultDiv.classList.add("search-result");
                resultDiv.innerHTML = `
                    <h3>${result.title}</h3>
                    <img src="${result.imageSrc}" alt="${result.altText}" />
                    <p>Time: ${result.time}</p>
                    <a href="${result.link}">View Details</a>
                `;
                searchResultsContainer.appendChild(resultDiv);
            });

            if (results.length === 0) {
                searchResultsContainer.innerHTML = `<p>No results found</p>`;
            }
        }
    });
}

export {initializeSearch};