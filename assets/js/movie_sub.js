import { updateMovieTimes } from "./movie.js";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("assets/data/movie.json");
  const data = await response.json();
  const movies = data.movies;

  await updateMovieTimes(movies);

  function getMovieIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("movieId");
  }

  function displayMovieDetails(movieId) {
    const movie = movies[movieId - 1];
    if (movie) {
      document.getElementById("movie-video").src = movie.videoPath;
      document.getElementById("movietxtSub").innerHTML = movie.title;
    } else {
      document.getElementById("movietxtSub").innerHTML = `
        <p>Movie not found.</p>
      `;
    }
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function displayMoviesRandomly() {
    const shuffledMovies = shuffleArray([...movies]).slice(0, 6);
    const movieListContainer = document.getElementById("movieListRandom");
    movieListContainer.innerHTML = "";

    shuffledMovies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie-itemSub");
      movieElement.id = `movie${movie.id}`;

      movieElement.innerHTML = `
          <div class="movie" id="movieSub">
          <a href="${movie.link}">
                  <img src="${movie.imageSrc}" alt="${movie.title}">
                        <div class="text">            
                            <p>${movie.title}</p>
                            </div>
              </a>
                  <div class="movie-timeSub">${movie.time}</div>
                    <div class="Icon" id="IconSub">
                    <div class="loveIcon" id="loveIconSub">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <div class="number" id="numberSub">1,000</div>
                    <div class="playIcon" id="playIconSub">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                    </div>
                    <div class="number" id="numberSub">1,000</div>
                </div>
          </div>
      `;
      movieListContainer.appendChild(movieElement);
    });
  }

  const movieId = getMovieIdFromURL();
  if (movieId) {
    displayMovieDetails(movieId);
  }

  displayMoviesRandomly();
});
