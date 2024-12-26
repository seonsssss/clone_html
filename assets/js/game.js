import { isLoggedIn, checkLoginStatus, logintoggle } from "./login.js";
window.addEventListener('load', function() {
  checkLoginStatus();
  logintoggle();
  const love = document.querySelectorAll(".love");
  love.forEach((wrapper) => {
    const heart = wrapper.querySelector("img");
    heart.onclick = function () {
      localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        if (heart.classList.contains("heart-empty")) {
            heart.src = "assets/images/movie/하트.png"; // 채워진 하트 이미지
            heart.classList.remove("heart-empty");
            heart.classList.add("heart-full");
        } else {
            heart.src = "assets/images/movie/빈하트.png"; // 빈 하트 이미지
            heart.classList.remove("heart-full");
            heart.classList.add("heart-empty");
        }
      } else {
        alert("네이버 로그인 하신 후 이용해 주시기 바랍니다.");
      }
    };
  });

  function getMovieIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("movieId");
  }

  function displayMovieDetails(movieId) {
    const movies = {
      1: {
        movietxtSub: "★과일빙수송★ | 무더운 여름엔 시원한 과일 빙수",
        videoPath: "assets/video/과일빙수송.mp4",
      },
      2: {
        movietxtSub: "신나는 캠프",
        videoPath: "assets/video/신나는 캠프.mp4",
      },
      3: {
        movietxtSub: "아기상어 숫자놀이",
        videoPath: "assets/video/아기상어 숫자놀이.mp4",
      },
      4: {
        movietxtSub: "응가송",
        videoPath: "assets/video/응가송.mp4",
      },
      5: {
        movietxtSub: "정글브라운 15화",
        videoPath: "assets/video/정글브라운 15화.mp4",
      },
      6: {
        movietxtSub: "코리리동요",
        videoPath: "assets/video/코리리동요.mp4",
      },
      7: {
        movietxtSub: "트니프렌즈! 베니의 생활습관",
        videoPath: "assets/video/트니프렌즈! 베니의 생활습관.mp4",
      },
      8: {
        movietxtSub: "페티의 여름",
        videoPath: "assets/video/페티의 여름.mp4",
      },
      9: {
        movietxtSub: "감자도리",
        videoPath: "assets/video/도리도리 감자도리.mp4",
      },
      10: {
        movietxtSub: "나의 작은 주전자",
        videoPath: "assets/video/나의 작은 주전자.mp4",
      },
      11: {
        movietxtSub: "★과일빙수송★ | 무더운 여름엔 시원한 과일 빙수",
        videoPath: "assets/video/프랑키의 다이빙.mp4",
      },
      12: {
        movietxtSub: "뽀득뽀득 세차해요",
        videoPath: "assets/video/뽀득뽀득 세차해요.mp4",
      },
    };

    const movie = movies[movieId];

    if (movie) {
      document.getElementById("movie-video").src = movie.videoPath;
      document.getElementById("movietxtSub").innerHTML = movie.movietxtSub;
    } else {
      document.getElementById("movietxtSub").innerHTML = `
        <p>Movie not found.</p>
      `;
    }
  }

  const movieId = getMovieIdFromURL();
  if (movieId) {
    displayMovieDetails(movieId);
  }
});