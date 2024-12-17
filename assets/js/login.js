const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
let isLoggedIn = localStorage.getItem("loggedIn");

window.onload = function () {  
  console.log("Window loaded");
  checkLoginStatus();
  logintoggle();
  checkLoginForm();
  changeInput();
  console.log("loggedIn:", localStorage.getItem("loggedIn"));
};


window.addEventListener('storage', function(e) {
  if (e.key === 'loggedIn') {
    checkLoginStatus();
  }
});

async function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  try {
    const response = await fetch('header.html');
    const headerHTML = await response.text();
    headerPlaceholder.innerHTML = headerHTML;
  } catch (error) {
    console.error('헤더 로드 오류:', error);
  }
}

function checkLoginStatus() {
  isLoggedIn = localStorage.getItem("loggedIn");

  if (login) {
    if (isLoggedIn) {
      login.style.display = "none";
    } else {
      login.style.display = "block";
    }
  }

  // logout이 존재하는지 확인하고 스타일을 설정
  if (logout) {
    if (isLoggedIn) {
      logout.style.display = "block";
    } else {
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
  if (login && logout) {
    login.addEventListener("click", function () {
      checkLoginStatus();
    });

    logout.addEventListener("click", function () {
      localStorage.setItem("loggedIn", "false");
      checkLoginStatus();
      logout.style.display = "none";
      login.style.display = "block";
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
export { isLoggedIn, checkLoginStatus, logintoggle, loadHeader };
