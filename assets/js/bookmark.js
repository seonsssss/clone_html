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

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("likeMovieList");
    movieDiv.id = `movie${movie.movieId}`;
  
    const movieLink = document.createElement("a");
    movieLink.href = `movie_sub.html?movieId=${movie.movieId}`;
  
    const movieImg = document.createElement("img");
    movieImg.src = movieDetails.image;
    movieImg.alt = movieDetails.movietxtSub;
  
    movieLink.appendChild(movieImg);
    movieDiv.appendChild(movieLink);
  
    const textLoveDiv = document.createElement("div");
    textLoveDiv.classList.add("text-love");
  
    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
  
    const movieText = document.createElement("p");
    movieText.textContent = movieDetails.movietxtSub;
  
    textDiv.appendChild(movieText);
    textLoveDiv.appendChild(textDiv);
  
    const loveDiv = document.createElement("div");
    loveDiv.classList.add("love");
  
    const heartImage = document.createElement("img");
    heartImage.src = heartImageSrc;
    heartImage.alt = "하트 상태";
    heartImage.classList.add(movie.isLiked ? "heart-full" : "heart-empty");
  
    loveDiv.appendChild(heartImage);
    textLoveDiv.appendChild(loveDiv);
  
    movieDiv.appendChild(textLoveDiv);
    likeMovieDiv.appendChild(movieDiv);
    
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
      }
    });
  });
}

function resetLikeMovies() {
  localStorage.removeItem("likeMovieList"); // 로컬 스토리지에서 likeMovies 삭제
  likeMovieDivPlus(); // 화면에 반영
}
