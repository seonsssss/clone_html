window.addEventListener('load', async () => {
    const response = await fetch("assets/data/movie.json");
    const data = await response.json();
    const movies = data.movies;
    function getMovieIdFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("movieId");
    }

    function displayMovieDetails(movieId) {
      const movie = movies[movieId-1];
      console.log("movie:" + movie);
      console.log("movieId:" + movie.id);
      if (movie) {
        document.getElementById("movie-video").src = movie.videoPath;
        document.getElementById("movietxtSub").innerHTML = movie.title;
      } else {
        document.getElementById("movietxtSub").innerHTML = `
          <p>Movie not found.</p>
        `;
      }
    }
  
    const movieId = getMovieIdFromURL();
    if (movieId) {
      displayMovieDetails(movieId);
      console.log("movieId:" + movieId);
    }
  });
  