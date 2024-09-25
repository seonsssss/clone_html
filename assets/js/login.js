const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
let isLoggedIn = localStorage.getItem("loggedIn");

// 페이지 로드 시 로그인 상태 확인
window.onload = function () {
  checkLoginStatus();
  logintoggle();
  console.log("loggedIn:" + localStorage.getItem("loggedIn")); 
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

function logintoggle() {
login.addEventListener("click", function () {
  localStorage.setItem("loggedIn", "true");
  checkLoginStatus();
  window.location.reload();
});

logout.addEventListener("click", function () {
  localStorage.setItem("loggedIn", "false");
  checkLoginStatus();
  window.location.reload();
});
}

export { isLoggedIn, checkLoginStatus, logintoggle};
