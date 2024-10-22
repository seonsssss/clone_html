import { checkLoginStatus, logintoggle } from "./login.js";
import { movies } from "./movies.js";

const bookmarkBefore = document.querySelector(".bookmarkBefore");
const bookmarkAfter = document.querySelector(".bookmarkAfter");
const likeMovieDiv = document.querySelector(".likeMovieDiv");
const likeMovied = JSON.parse(localStorage.getItem("likeMovieList")) || [];
const likeGameDiv = document.querySelector(".likeGameDiv");
const likeGamed = JSON.parse(localStorage.getItem("likeGameList")) || [];
window.onload = function () {
  updateBookmarkVisibility();
  likeMovieDivPlus();
  likeGameDivPlus() 
  checkLoginStatus();
  logintoggle();
  // resetLikeGames();
  // resetLikeMovies();
  console.log("likeMovied:" + localStorage.getItem("likeMovied"));
  console.log("loggedIn:" + localStorage.getItem("loggedIn"));
  console.log("likeGamed:" + localStorage.getItem("likeGamed"));
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

function likeGameDivPlus() {
  likeGamed.forEach((game) => {
    console.log("likeGameList:", game);
    const heartImageSrc = game.isLiked
      ? "assets/images/movie/하트.png"
      : "assets/images/movie/빈하트.png";

    // 각 게임을 감쌀 div 생성
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("likeGameList");
    gameDiv.id = `game${game.gameId}`;

    // 게임 링크 생성
    const gameLink = document.createElement("a");
    gameLink.href = game.link;  // 여기서 game.link가 잘 정의되어 있는지 확인

    // 게임 이미지 생성
    const gameImg = document.createElement("img");
    gameImg.src = game.image;  // game.image를 바로 사용
    gameImg.alt = game.title;

    // 게임 이미지를 링크에 추가
    gameLink.appendChild(gameImg);

    // 게임 링크를 gameDiv에 추가
    gameDiv.appendChild(gameLink);

    // 텍스트 및 하트 요소를 담을 div 생성
    const textGameLoveDiv = document.createElement("div");
    textGameLoveDiv.classList.add("text-love");

    const textGameDiv = document.createElement("div");
    textGameDiv.classList.add("text");

    const gameTitle = document.createElement("p");
    gameTitle.textContent = game.title;  // game.title을 바로 사용

    // 텍스트 요소 조립
    textGameDiv.appendChild(gameTitle);
    textGameLoveDiv.appendChild(textGameDiv);

    // 하트 이미지 및 클릭 이벤트 추가
    const loveGameDiv = document.createElement("div");
    loveGameDiv.classList.add("love");

    const heartGameImage = document.createElement("img");
    heartGameImage.src = heartImageSrc;
    heartGameImage.alt = "하트 상태";
    heartGameImage.classList.add(game.isLiked ? "heart-full" : "heart-empty");

    loveGameDiv.appendChild(heartGameImage);
    textGameLoveDiv.appendChild(loveGameDiv);

    // 최종적으로 게임 div에 텍스트 및 하트 div 추가
    gameDiv.appendChild(textGameLoveDiv);
    likeGameDiv.appendChild(gameDiv);

    // 하트 클릭 시 찜 목록에서 제거하는 기능
    heartGameImage.addEventListener("click", function () {
      if (game.isLiked) {
        heartGameImage.src = "assets/images/movie/빈하트.png"; // 빈 하트 이미지로 변경
        heartGameImage.classList.remove("heart-full");
        heartGameImage.classList.add("heart-empty");

        // 찜 목록에서 해당 게임 제거
        const updatedLikeGameList = likeGamed.filter(
          (g) => g.gameId !== game.gameId
        );
        localStorage.setItem("likeGameList", JSON.stringify(updatedLikeGameList)); // 로컬 스토리지 업데이트

        // UI에서 해당 게임 div 제거
        gameDiv.remove();
      }
    });
  });
}

function resetLikeMovies() {
  localStorage.removeItem("likeMovieList"); // 로컬 스토리지에서 likeMovies 삭제
  likeMovieDivPlus(); // 화면에 반영
  likeGameDivPlus();
}

function resetLikeGames() {
  localStorage.removeItem("likeGameList"); // 로컬 스토리지에서 likeMovies 삭제
}