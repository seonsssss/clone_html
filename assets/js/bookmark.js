import { checkLoginStatus, logintoggle } from "./login.js";
const bookmarkBefore = document.querySelector(".bookmarkBefore");
const bookmarkAfter = document.querySelector(".bookmarkAfter");
window.onload = function () {
  updateBookmarkVisibility();
  recentlyViewedPlus();
  checkLoginStatus();
  logintoggle();
  console.log("recentlyViewed:" + localStorage.getItem("recentlyViewedMovies"));
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

function recentlyViewedPlus() {
  const recentlyViewedDiv = document.querySelector(".recentlyViewedMoviesDiv");
  const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewedMovies")) || [];

  recentlyViewed.forEach((movie) => {
    console.log("recentlyViewed:", movie);
    const movieHTML = `
      <div class="recent-movie">
        <img src="${movie.image}" alt="${movie.title}">
        <p>${movie.title}</p>
      </div>
    `;
    recentlyViewedDiv.innerHTML += movieHTML; // Append the movie HTML to the div
  });

  
}