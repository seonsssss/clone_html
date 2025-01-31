async function initializeSearch() {
    const searchInput = document.querySelector(".search-box input");
    const searchResultsContainer = document.querySelector(".search-results");
    const searchBtn = document.querySelector(".searchClick");
    let query;
    let searchValue;

    if (!searchInput || !searchResultsContainer) {
        console.error("Search elements not found!");
        return;
    }

    const movieData = await fetch("/assets/data/movie.json")
        .then(res => res.json())
        .then(data => data.movies || [])
        .catch(error => {
            console.error("Error loading movie.json:", error);
            return [];
        });

    const languageData = await fetch("/assets/data/language.json")
        .then(res => res.json())
        .then(data => data.languages || [])
        .catch(error => {
            console.error("Error loading language.json:", error);
            return [];
        });

    const touchData = await fetch("/assets/data/touch.json")
        .then(res => res.json())
        .then(data => data.touch || [])
        .catch(error => {
            console.error("Error loading touch.json:", error);
            return [];
        });

    const allData = [
        ...movieData.map(item => ({
            title: item.title,
            imageSrc: item.imageSrc,
            altText: item.altText,
            link: item.link,
            category: 'movie'
        })),
        ...languageData.map(item => ({
            title: item.title,
            imageSrc: item.imageSrc || 'default-image.jpg',
            altText: item.altText || item.title,
            link: item.link || '#',
            category: 'language'
        })),
        ...touchData.map(item => ({
            title: item.title,
            imageSrc: item.imageSrc || 'default-image.jpg',
            altText: item.altText || item.title,
            link: item.link || '#',
            category: 'touch'
        }))
    ];

    searchInput.addEventListener("input", () => {
        searchResultsContainer.style.display = 'flex';
        query = searchInput.value.trim().toLowerCase();
        searchResultsContainer.innerHTML = "";
        if (query) {
            searchValue = true;
            const results = allData.filter(item =>
                item.title && item.title.toLowerCase().includes(query)
            );
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

            if (results.length === 0) {
                searchValue = false;
                searchResultsContainer.innerHTML = `<p>${query} 검색 결과 0건</p>`;
            }

            // Save the query and results to localStorage
            localStorage.setItem("searchQuery", query);
            localStorage.setItem("searchResults", JSON.stringify(results));
        } else {
            searchResultsContainer.style.display = "none";
        }
    });

    searchBtn.addEventListener("click", () => {
        window.location.href = 'search.html';
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            window.location.href = 'search.html';
        }
    });
}

export { initializeSearch };
