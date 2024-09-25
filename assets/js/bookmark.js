import { isLoggedIn } from "./login.js";
document.addEventListener("DOMContentLoaded", function () {
  const bookmarkBefore = document.querySelector(".bookmarkBefore");
  const bookmarkAfter = document.querySelector(".bookmarkAfter");

  updateBookmarkVisibility();

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
  
});
