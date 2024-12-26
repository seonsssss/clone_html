const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
let isLoggedIn = localStorage.getItem("loggedIn");

document.addEventListener("DOMContentLoaded", () => {
  async function loadHeader() {
      const headerPlaceholder = document.getElementById('header-placeholder');
      try {
          const response = await fetch('header.html');
          const headerHTML = await response.text();
          headerPlaceholder.innerHTML = headerHTML;
          checkLoginStatus();
          logintoggle();
      } catch (error) {
          console.error('헤더 로드 오류:', error);
      }
  }

  loadHeader();
  checkLoginForm();
  changeInput();
});

function checkLoginStatus() {
  const login = document.querySelector(".login");
  const logout = document.querySelector(".logout");

  if (!login || !logout) {
    console.error("로그인/로그아웃 버튼을 찾을 수 없습니다.");
    return;
  }

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (isLoggedIn === null) {
    console.warn("loggedIn 상태가 설정되지 않았습니다.");
  }

  toggleLoginLogout(isLoggedIn, login, logout);
}

function toggleLoginLogout(isLoggedIn, login, logout) {
  if (isLoggedIn) {
    login.style.display = "none";
    logout.style.display = "block";
  } else {
    login.style.display = "block";
    logout.style.display = "none";
  }
}


function checkLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const currentPage = window.location.href;
      const userId = document.getElementById("userId").value;
      const userPassword = document.getElementById("userPassword").value;

      const validUserId = "user";
      const validUserPassword = "password";

      if (userId === validUserId && userPassword === validUserPassword) {
        localStorage.setItem("loggedIn", "true");
        checkLoginStatus(); 
        window.location.href = currentPage;
        console.log("currentPage:"+ currentPage);
        logout.style.display = "none";
        login.style.display = "block";
      } else {
        alert("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
        console.log("currentPage:"+ currentPage);
      }
    });
  }
}


function logintoggle() {
  const login = document.querySelector(".login");
  const logout = document.querySelector(".logout");

  if (login && logout) {
    login.addEventListener("click", function () {
      localStorage.setItem("loggedIn", "true");
      checkLoginStatus();
    });

    logout.addEventListener("click", function () {
      localStorage.setItem("loggedIn", "false");
      checkLoginStatus();
    });
  }
}


function changeInput() {
document.querySelectorAll(".input-group input").forEach((input) => {
  input.addEventListener("focus", () => {
    const label = input.nextElementSibling;
    label.style.top = "10px";
    label.style.fontSize = "12px";
    label.style.color = "#007BFF";
  });

  input.addEventListener("blur", () => {
    const label = input.nextElementSibling;
    if (!input.value) {
      label.style.top = "30%";
      label.style.fontSize = "16px";
      label.style.color = "#999";
    }
  });
});
}
export { isLoggedIn, checkLoginStatus, logintoggle};
