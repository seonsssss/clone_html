import { checkLoginStatus, logintoggle } from "./login.js";
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
  const likeMovied =
    JSON.parse(localStorage.getItem("likeMovieList")) || [];

    likeMovied.forEach((movie) => {
    console.log("likeMovieList:", movie);
    const heartImageSrc = movie.isLiked
      ? "assets/images/movie/하트.png"
      : "assets/images/movie/빈하트.png";
    const movieHTML = `
      <div class="likeMovieList">
      <a href="movie_sub.html?movieId=${movie.movieId}">
        <img src="${movie.image}" alt="${movie.title}">
        <div class = "text-love">
            <div class = "text">
              <p>${movie.title}</p>
            </div>
        <div class="love">
          <img src="${heartImageSrc}" alt="하트 상태" class="${
      movie.isLiked ? "heart-full" : "heart-empty"
    }">
              </div>
      </div>
    `;
    likeMovieDiv.innerHTML += movieHTML;
  });
}


function resetLikeMovies() {
  localStorage.removeItem("likeMovieList"); // 로컬 스토리지에서 likeMovies 삭제
  likeMovieDivPlus(); // 화면에 반영
}