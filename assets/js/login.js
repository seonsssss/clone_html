const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
let isLoggedIn = localStorage.getItem("loggedIn");

document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
  logintoggle();
  checkLoginForm();
  console.log("loggedIn:", localStorage.getItem("loggedIn"));
});

function checkLoginStatus() {
  isLoggedIn = localStorage.getItem("loggedIn");
  
  if(login || logout) {
  if (isLoggedIn === "true") {
    login.style.display = "none";
    logout.style.display = "block";
  } else {
    login.style.display = "block";
    logout.style.display = "none";
  }
}
}
function checkLoginForm() {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const userId = document.getElementById("userId").value;
      const userPassword = document.getElementById("userPassword").value;

      const validUserId = "user";
      const validUserPassword = "password";

      if (userId === validUserId && userPassword === validUserPassword) {
        localStorage.setItem("loggedIn", "true"); 
        checkLoginStatus();
        window.location.href = "home.html";

      } else {
        alert("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
      }
    });
  }
}

function logintoggle() {
  if(login || logout) {
  login.addEventListener("click", function () {
    checkLoginStatus();
  });

  logout.addEventListener("click", function () {
    localStorage.setItem("loggedIn", "false");
    checkLoginStatus();
    window.location.reload();
  });
}
}

export { isLoggedIn, checkLoginStatus, logintoggle };
