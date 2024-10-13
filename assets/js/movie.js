import { isLoggedIn, checkLoginStatus, logintoggle } from "./login.js";
import { movies } from "./movies.js";
const movieList = document.getElementById("movieList");
let isMovieAlreadyLiked;
let likeMovieList = JSON.parse(localStorage.getItem("likeMovieList")) || [];

window.onload = function () {
  checkLoginStatus();
  logintoggle();
  renderMovieList();
  movieList.addEventListener("click", function (event) {
    // love 클래스가 포함된 이미지인지 확인
    if (event.target && event.target.closest(".love img")) {
      const heart = event.target;
      const movieItem = heart.closest(".movie-item");
      const movieId = movieItem.id.replace("movie", "");
      const movieDetails = {
        movieId: movieId,
        title: movieItem.querySelector(".text p").textContent,
        image: movieItem.querySelector(".movie-img").src,
        isLiked: true,
      };
      isMovieAlreadyLiked = likeMovieList.some(
        (movie) => movie.movieId === movieId
      );
      console.log("isMovieAlreadyLiked:" + isMovieAlreadyLiked);
      if (isLoggedIn === "true") {
        if (heart.classList.contains("heart-empty")) {
          heart.src = "assets/images/movie/하트.png"; // 채워진 하트 이미지
          heart.classList.remove("heart-empty");
          heart.classList.add("heart-full");
          if (!isMovieAlreadyLiked) {
            likeMovieList.push(movieDetails); // 중복이 아닐 경우에만 추가
            localStorage.setItem(
              "likeMovieList",
              JSON.stringify(likeMovieList)
            ); // 업데이트된 리스트 저장
            console.log("movieDetails:", movieDetails);
            console.log("likeMovieList:", likeMovieList);
          } else {
            console.log("This movie is already in the bookmark list.");
          }
        } else {
          heart.src = "assets/images/movie/빈하트.png"; // 빈 하트 이미지
          heart.classList.remove("heart-full");
          heart.classList.add("heart-empty");
          likeMovieList = likeMovieList.filter((movie) => movie.movieId !== movieId);
          localStorage.setItem("likeMovieList", JSON.stringify(likeMovieList)); // Update localStorage
          console.log("Movie removed from likeMovieList:", movieId);
        }
      } else {
        const ask = confirm("네이버 로그인 하신 후 이용해 주시기 바랍니다.");
        if (ask) {
          window.location.href = "login.html";
        } else {
          return;
        }
      }
    }
  });
  restoreLikedStatus();
};

function restoreLikedStatus() {
  likeMovieList.forEach((likedMovie) => {
    const likedMovieItem = document.getElementById(
      `movie${likedMovie.movieId}`
    );
    if (likedMovieItem) {
      const heart = likedMovieItem.querySelector(".love img");
      if (heart) {
        heart.src = "assets/images/movie/하트.png"; // Change to filled heart
        heart.classList.remove("heart-empty");
        heart.classList.add("heart-full");
      }
    }
  });
}

function getMovieIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("movieId");
}

// export const movies = {
//   1: {
//     movietxtSub: "★과일빙수송★ | 무더운 여름엔 시원한 과일 빙수",
//     videoPath: "assets/video/과일빙수송.mp4",
//     image: "assets/images/movie/과일빙수송.png",
//     time: "12:00",
//   },
//   2: {
//     movietxtSub: "신나는 캠프",
//     videoPath: "assets/video/신나는 캠프.mp4",
//     image: "assets/images/movie/신나는 캠프 ♪.png",
//     time: "12:00",
//   },
//   3: {
//     movietxtSub: "아기상어 숫자놀이",
//     videoPath: "assets/video/아기상어 숫자놀이.mp4",
//     image: "assets/images/movie/아기상어 숫자 놀이.jpg",
//     time: "12:00",
//   },
//   4: {
//     movietxtSub: "응가송",
//     videoPath: "assets/video/응가송.mp4",
//     image: "assets/images/movie/응가송.jpg",
//     time: "12:00",
//   },
//   5: {
//     movietxtSub: "정글브라운 15화",
//     videoPath: "assets/video/정글브라운 15화.mp4",
//     image: "assets/images/movie/정글브라운 15화.jpg",
//     time: "12:00",
//   },
//   6: {
//     movietxtSub: "코리리동요",
//     videoPath: "assets/video/코리리동요.mp4",
//     image: "assets/images/movie/코리리동요.png",
//     time: "12:00",
//   },
//   7: {
//     movietxtSub: "트니프렌즈! 베니의 생활습관",
//     videoPath: "assets/video/트니프렌즈! 베니의 생활습관.mp4",
//     image: "assets/images/movie/트니프렌즈! 베니의 생활습관.png",
//     time: "12:00",
//   },
//   8: {
//     movietxtSub: "페티의 여름",
//     videoPath: "assets/video/페티의 여름.mp4",
//     image: "assets/images/movie/페티의 여름.jpeg",
//     time: "12:00",
//   },
//   9: {
//     movietxtSub: "감자도리",
//     videoPath: "assets/video/도리도리 감자도리.mp4",
//     image: "assets/images/movie/도리도리송(감자도리송).jpg",
//     time: "12:00",
//   },
//   10: {
//     movietxtSub: "나의 작은 주전자",
//     videoPath: "assets/video/나의 작은 주전자.mp4",
//     image: "assets/images/movie/나는 작은 주전자.png",
//     time: "12:00",
//   },
//   11: {
//     movietxtSub: "★과일빙수송★ | 무더운 여름엔 시원한 과일 빙수",
//     videoPath: "assets/video/프랑키의 다이빙.mp4",
//     image: "assets/images/movie/[스푸키즈 쿠키] 7화  프랑키의 다이빙.jpg",
//     time: "12:00",
//   },
//   12: {
//     movietxtSub: "뽀득뽀득 세차해요",
//     videoPath: "assets/video/뽀득뽀득 세차해요.mp4",
//     image: "assets/images/movie/아기상어 자동차와 뽀득뽀득 세차해요.jpg",
//     time: "12:00",
//   },
// };

function displayMovieDetails(movieId) {
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

function renderMovieList() {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // 기존 내용 초기화

  Object.keys(movies).forEach((movieId) => {
    const movie = movies[movieId];

    const movieItem = `
          <div class="movie-item" id="movie${movieId}">
            <div class="movie">
              <a href="movie_sub.html?movieId=${movieId}">
                <img src="${movie.image}" alt="${movie.movietxtSub}" class="movie-img">
              </a>
              <div class="movie-time">${movie.time}</div>
            </div>
            <div class="text-love">
              <div class="text">
                <p>${movie.movietxtSub}</p>
              </div>
              <div class="love">
                <img src="assets/images/movie/빈하트.png" class="heart-empty">
              </div>
            </div>
          </div>
        `;
    movieList.innerHTML += movieItem;
  });
}

if (document.getElementById("movieList")) {
  renderMovieList();
}

const movieId = getMovieIdFromURL();
if (movieId) {
  displayMovieDetails(movieId);
}
