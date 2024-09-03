document.addEventListener("DOMContentLoaded", function () {
  // Handle the love (heart) toggle feature
  const love = document.querySelectorAll(".love");

  love.forEach((wrapper) => {
    const emptyHeart = wrapper.querySelector(".heart-empty");
    const fullHeart = wrapper.querySelector(".heart-full");

    emptyHeart.onclick = function () {
      emptyHeart.style.visibility = "hidden";
      fullHeart.style.visibility = "visible";
    };

    fullHeart.onclick = function () {
      fullHeart.style.visibility = "hidden";
      emptyHeart.style.visibility = "visible";
    };
  });

  // Handle movie item click and redirection
  document.querySelectorAll('.movie').forEach(item => {
    item.addEventListener('click', function () {
      const movieId = this.getAttribute('data-movie-id');
      window.location.href = `movie_sub.html?movieId=${movieId}`;
    });
  });

  // Function to get movie ID from the URL
  function getMovieIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("movieId");
  }

  // Function to display movie details
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

  // On page load, display movie details if a movie ID is present in the URL
  const movieId = getMovieIdFromURL();
  if (movieId) {
    displayMovieDetails(movieId);
  }
});