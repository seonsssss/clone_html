const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
let isLoggedIn = "false";

// 페이지 로드 시 로그인 상태 확인
window.onload = function () {
  checkLoginStatus();
};

// 로그인 상태 확인 함수
function checkLoginStatus() {
  isLoggedIn = localStorage.getItem("loggedIn");

  if (isLoggedIn === "true") {
    login.style.display = "none";
    logout.style.display = "block";
  } else {
    login.style.display = "block";
    logout.style.display = "none";
  }
}

login.addEventListener("click", function () {
  localStorage.setItem("loggedIn", "true");
  checkLoginStatus();
});

logout.addEventListener("click", function () {
  localStorage.setItem("loggedIn", "false");
  checkLoginStatus();
});


//   .then((response) => response.text())
//   .then((data) => {
//     updateBookmarkVisibility();
//   });

// function updateBookmarkVisibility() {
//   const bookmarkBefore = document.querySelector(".bookmarkBefore");
//   const bookmarkAfter = document.querySelector(".bookmarkAfter");

//   if (isLoggedIn) {
//     bookmarkBefore.style.display = "none";
//     bookmarkAfter.style.display = "block";
//   } else {
//     bookmarkBefore.style.display = "block";
//     bookmarkAfter.style.display = "none";
//   }
// }
export { isLoggedIn, checkLoginStatus };
