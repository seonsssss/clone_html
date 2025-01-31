document.addEventListener("DOMContentLoaded", async() => {
    const searchResults = document.querySelector(".searchResults");
    const searchResultsContainer = document.querySelector(".searchList");
    const query = localStorage.getItem("searchQuery");
    const results = JSON.parse(localStorage.getItem("searchResults"));

    if (query && results) {
        const resultsMessage = results.length ? `<mark>${query}</mark> 검색 결과 ${results.length}건` : `${query} 검색 결과 0건`;
        searchResults.innerHTML = `<div class = "resultMsg">${resultsMessage}</div>`;

        results.forEach(result => {
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("search-result");
            resultDiv.innerHTML = `
                <div class="search-resultVideo">
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
