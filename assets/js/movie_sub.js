window.addEventListener('load', async () => {
    // Fetch movie data from the JSON file
    const response = await fetch("assets/data/movie.json");
    const data = await response.json();
    const movies = data.movies;
    // Utility function to get movie ID from URL
    function getMovieIdFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("movieId");
    }
  
    // Function to display movie details
    function displayMovieDetails(movieId) {
      // Find the movie by ID
      const movie = movies[movieId-1];
      console.log("movie:" + movie);
      console.log("movieId:" + movie.id);
      if (movie) {
        // Update video source and text
        document.getElementById("movie-video").src = movie.videoPath;
        document.getElementById("movietxtSub").innerHTML = movie.title;
      } else {
        // Display fallback message if movie not found
        document.getElementById("movietxtSub").innerHTML = `
          <p>Movie not found.</p>
        `;
      }
    }
  
    // Get the movie ID from the URL and display the details
    const movieId = getMovieIdFromURL();
    if (movieId) {
      displayMovieDetails(movieId);
      console.log("movieId:" + movieId);
    }
  });
  