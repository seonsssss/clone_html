import { checkLoginStatus, logintoggle } from "./login.js";
import { movies } from "./movies.js";
const bookmarkBefore = document.querySelector(".bookmarkBefore");
const bookmarkAfter = document.querySelector(".bookmarkAfter");
const likeMovieDiv = document.querySelector(".likeMovieDiv");
const likeMovied = JSON.parse(localStorage.getItem("likeMovieList")) || [];
window.onload = function () {
  updateBookmarkVisibility();
  likeMovieDivPlus();
  checkLoginStatus();
  logintoggle();
  // resetLikeMovies();
  console.log("likeMovied:" + localStorage.getItem("likeMovied"));
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
  likeMovied.forEach((movie) => {
    console.log("likeMovieList:", movie);
    const movieDetails = movies[movie.movieId];
    const heartImageSrc = movie.isLiked
      ? "assets/images/movie/하트.png"
      : "assets/images/movie/빈하트.png";
    const movieHTML = `
      <div class="likeMovieList" id="movie${movie.movieId}">
        <a href="movie_sub.html?movieId=${movie.movieId}">
          <img src="${movieDetails.image}" alt="${movieDetails.movietxtSub}">
                  </a>
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
      </div>
    `;

    likeMovieDiv.innerHTML += movieHTML;

    const heartImage = likeMovieDiv.querySelector(
      `#movie${movie.movieId} .love img`
    );
    heartImage.addEventListener("click", function () {
      if (movie.isLiked) {
        heartImage.src = "assets/images/movie/빈하트.png"; // 빈 하트 이미지
        heartImage.classList.remove("heart-full");
        heartImage.classList.add("heart-empty");
        const updatedLikeMovieList = likeMovied.filter(
          (m) => m.movieId !== movie.movieId
        );
        localStorage.setItem(
          "likeMovieList",
          JSON.stringify(updatedLikeMovieList)
        ); 
        window.location.reload();
      } else {
        // If the heart is empty, do nothing or handle accordingly
        // You can add code here if needed
      }
    });
  });
}

function resetLikeMovies() {
  localStorage.removeItem("likeMovieList"); // 로컬 스토리지에서 likeMovies 삭제
  likeMovieDivPlus(); // 화면에 반영
}
