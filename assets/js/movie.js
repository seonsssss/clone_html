import { checkLoginStatus, logintoggle } from "./login.js";
// import { movies } from "./movies.js";

const movieList = document.getElementById("movieList");
let likeMovieList = JSON.parse(localStorage.getItem("likeMovieList")) || [];

document.addEventListener("DOMContentLoaded", async function() {
  checkLoginStatus();
  logintoggle();
  await loadMovies(); 
  restoreLikedStatus(); 
  setupHeartClickEvent(); 
});
async function loadMovies() {
  try {
    const response = await fetch("assets/data/movie.json");
    const data = await response.json();
    const movies = data.movies;
    renderMovieList(movies);
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}

function setupHeartClickEvent() {
  movieList.addEventListener("click", function (event) {
    if (event.target && event.target.closest(".love img")) {
      const heart = event.target;
      const movieItem = heart.closest(".movie-item");
      const movieId = movieItem.id.replace("movie", "");
      const isLoggedIn = localStorage.getItem("loggedIn") === "true";
      const movieDetails = {
        movieId: movieId,
        title: movieItem.querySelector(".text p").textContent,
        image: movieItem.querySelector(".movie-img").src,
        isLiked: true,
      };

      if (isLoggedIn) {
        if (heart.classList.contains("heart-empty")) {
          heart.src = "assets/images/movie/하트.png";
          heart.classList.remove("heart-empty");
          heart.classList.add("heart-full");
          likeMovieList.push(movieDetails);
          localStorage.setItem("likeMovieList", JSON.stringify(likeMovieList));
        } else {
          heart.src = "assets/images/movie/빈하트.png";
          heart.classList.remove("heart-full");
          heart.classList.add("heart-empty");
          likeMovieList = likeMovieList.filter((movie) => movie.movieId !== movieId);
          localStorage.setItem("likeMovieList", JSON.stringify(likeMovieList));
        }
      } else {
        const ask = confirm("네이버 로그인 하신 후 이용해 주시기 바랍니다.");
        if (ask) window.location.href = "login.html";
      }
    }
  });
}

function restoreLikedStatus() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  likeMovieList.forEach((likedMovie) => {
    const likedMovieItem = document.getElementById(`movie${likedMovie.movieId}`);
    if (likedMovieItem) {
      const heart = likedMovieItem.querySelector(".love img");
      if (isLoggedIn) {
        heart.src = "assets/images/movie/하트.png";
        heart.classList.remove("heart-empty");
        heart.classList.add("heart-full");
      } else {
        heart.src = "assets/images/movie/빈하트.png";
        heart.classList.add("heart-empty");
        heart.classList.remove("heart-full");
      }
    }
  });
}

function renderMovieList(movies) {
  movieList.innerHTML = ""; 
  movies.forEach((movie) => {
    const movieItem = `
      <div class="movie-item" id="${movie.id}">
        <div class="movie">
          <a href="${movie.link}">
            <img src="${movie.imageSrc}" alt="${movie.altText}" class="movie-img">
          </a>
          <div class="movie-time">${movie.time}</div>
        </div>
        <div class="text-love">
          <div class="text">
            <p>${movie.title}</p>
          </div>
          <div class="love">
            <img src="${movie.heart.emptySrc}" class="heart-empty">
          </div>
        </div>
      </div>
    `;
    movieList.innerHTML += movieItem;
  });
}
