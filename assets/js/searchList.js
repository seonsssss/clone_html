document.addEventListener("DOMContentLoaded", async() => {
    const searchResultsContainer = document.querySelector(".search");
    const query = localStorage.getItem("searchQuery");
    const results = JSON.parse(localStorage.getItem("searchResults"));

    if (query && results) {
        const resultsMessage = results.length ? `${query} 검색 결과 ${results.length}건` : `${query} 검색 결과 0건`;
        searchResultsContainer.innerHTML = `<p>${resultsMessage}</p>`;

        results.forEach(result => {
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("search-result");
            resultDiv.innerHTML = `
                <div class="search-result">
                    <a href="${result.link}" class="result-link">
                        <div class="result-thumbnail">
                            <img src="${result.imageSrc}" alt="${result.altText}" />
                        </div>
                        <div class="result-info">
                            <h3 class="result-title">${result.title}</h3>
                        </div>
                    </a>
                </div>
            `;
            searchResultsContainer.appendChild(resultDiv);
        });
    }
});
