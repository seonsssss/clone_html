import { checkLoginStatus, logintoggle } from "./login.js";
import { movies } from './movies.js';
const bookmarkBefore = document.querySelector(".bookmarkBefore");
const bookmarkAfter = document.querySelector(".bookmarkAfter");
window.onload = function () {
  updateBookmarkVisibility();
  likeMovieDivPlus();
  checkLoginStatus();
  logintoggle();
  // resetLikeMovies();
  console.log("likeMovieList:" + localStorage.getItem("likeMovieList"));
  console.log("loggedIn:" + localStorage.getItem("loggedIn"));
};

function updateBookmarkVisibility() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn === "true") {
    bookmarkBefore.style.display = "none";
    bookmarkAfter.style.display = "block";
  } else {
    bookmarkBefore.style.display = "block";
    bookmarkAfter.style.display = "none";
  }
}

function likeMovieDivPlus() {
  const likeMovieDiv = document.querySelector(".likeMovieDiv");
  const likeMovied = JSON.parse(localStorage.getItem("likeMovieList")) || [];

  likeMovied.forEach((movie) => {
    console.log("likeMovieList:", movie);

    // movies 객체에서 해당 movieId의 상세 정보 가져오기
    const movieDetails = movies[movie.movieId];

    // likeMovied에 없는 movies 객체의 정보들을 활용하여 추가 데이터 표시
    const heartImageSrc = movie.isLiked
      ? "assets/images/movie/하트.png"
      : "assets/images/movie/빈하트.png";
    const movieHTML = `
      <div class="likeMovieList">
        <a href="movie_sub.html?movieId=${movie.movieId}">
          <img src="${movieDetails.image}" alt="${movieDetails.movietxtSub}">
          <div class="text-love">
            <div class="text">
              <p>${movieDetails.movietxtSub}</p>
            </div>
            <div class="love">
              <img src="${heartImageSrc}" alt="하트 상태" class="${
                movie.isLiked ? "heart-full" : "heart-empty"
              }">
            </div>
          </div>
        </a>
      </div>
    `;
    likeMovieDiv.innerHTML += movieHTML;
  });
}