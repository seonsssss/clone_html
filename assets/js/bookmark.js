document.addEventListener("DOMContentLoaded", function () {
    const bookmarkBefore = document.querySelector(".bookmarkBefore");
    const bookmarkAfter = document.querySelector(".bookmarkAfter");
    const login = document.querySelector(".login");
    const logout = document.querySelector(".logout");

    // 페이지 로드 시 로그인 상태 확인
window.onload = function() {
    checkLoginStatus();
  };
  
  // 로그인 상태 확인 함수
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("loggedIn");
  
    if (isLoggedIn === "true") {
        // 로그인 상태일 경우
        bookmarkBefore.style.display = "none";
        bookmarkAfter.style.display = "block";
        login.style.display = "none";
        logout.style.display = "block";
    } else {
        // 비로그인 상태일 경우
        bookmarkBefore.style.display = "block";
        bookmarkAfter.style.display = "none";
        login.style.display = "block";
        logout.style.display = "none";
    }
  }
  
  // 로그인 버튼 클릭 시 로그인 처리
  login.addEventListener("click", function() {
    localStorage.setItem("loggedIn", "true");
    checkLoginStatus();
  });
  
  // 로그아웃 버튼 클릭 시 로그아웃 처리
  logout.addEventListener("click", function() {
    localStorage.setItem("loggedIn", "false");
    checkLoginStatus();
  });
  
})