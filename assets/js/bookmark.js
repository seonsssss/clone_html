import { movies } from "./movies.js";

const bookmarkBefore = document.querySelector(".bookmarkBefore");
const bookmarkAfter = document.querySelector(".bookmarkAfter");
const likeMovieDiv = document.querySelector(".likeMovieDiv");
const likeMovied = JSON.parse(localStorage.getItem("likeMovieList")) || [];
const likeGameDiv = document.querySelector(".likeGameDiv");
const likeGamed = JSON.parse(localStorage.getItem("likeGameList")) || [];
const likeLanguage = JSON.parse(localStorage.getItem("likeLanguageList")) || [];

window.addEventListener('load', function() {
  updateBookmarkVisibility();
  populateLikeDiv()
  console.log("loggedIn:" + localStorage.getItem("loggedIn"));
});

function updateBookmarkVisibility() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn === "true") {
    bookmarkBefore.style.display = "none";
    bookmarkAfter.style.display = "block";
  } else {
    bookmarkBefore.style.display = "block";
    bookmarkAfter.style.display = "none";
  }
}

function populateLikeDiv() {
  const combinedList = [
    ...likeMovied.map((movie) => ({ ...movie, type: 'movie' })),
    ...likeGamed.map((game) => ({ ...game, type: 'game' })),
    ...likeLanguage.map((language) => ({ ...language, type: 'language' }))
  ];

  combinedList.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("likeItemList");
    itemDiv.id = `${item.type}${item.id || item.movieId || item.gameId}`;

    const itemLink = document.createElement("a");
    let imageSrc, linkHref, durationText = "";

    if (item.type === "movie") {
      imageSrc = movies[item.movieId].image;
      linkHref = `movie_sub.html?movieId=${item.movieId}`;
      durationText = item.time ? `${item.time}` : ""; 
    } else if (item.type === "game") {
      imageSrc = item.image;
      linkHref = item.link;
    } else if (item.type === "language") {
      imageSrc = item.image;
      linkHref = item.link;
    }

    itemLink.href = linkHref;

    const itemImg = document.createElement("img");
    itemImg.src = imageSrc;
    itemImg.alt = item.title;

    itemLink.appendChild(itemImg);
    itemDiv.appendChild(itemLink);

    if (item.type === "movie" && durationText) {
      const itemDuration = document.createElement("div");
      itemDuration.classList.add("movie-time");
      itemDuration.textContent = durationText;
      itemDiv.appendChild(itemDuration);
    }

    const textLoveDiv = document.createElement("div");
    textLoveDiv.classList.add("text-love");

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");

    const itemTitle = document.createElement("p");
    itemTitle.textContent = item.title;

    textDiv.appendChild(itemTitle);
    textLoveDiv.appendChild(textDiv);

    const loveDiv = document.createElement("div");
    loveDiv.classList.add("love");

    const heartImage = document.createElement("img");
    const heartImageSrc = item.isLiked
      ? "assets/images/movie/하트.png"
      : "assets/images/movie/빈하트.png";
    heartImage.src = heartImageSrc;
    heartImage.alt = "하트 상태";
    heartImage.classList.add(item.isLiked ? "heart-full" : "heart-empty");

    loveDiv.appendChild(heartImage);
    textLoveDiv.appendChild(loveDiv);

    itemDiv.appendChild(textLoveDiv);

    if (item.type === "movie") {
      likeMovieDiv.appendChild(itemDiv);
    } else {
      likeGameDiv.appendChild(itemDiv);
    }
   

    heartImage.addEventListener("click", function () {
      item.isLiked = !item.isLiked;
      heartImage.src = item.isLiked
        ? "assets/images/movie/하트.png"
        : "assets/images/movie/빈하트.png";
      heartImage.classList.toggle("heart-full");
      heartImage.classList.toggle("heart-empty");
    
      if (!item.isLiked) {
        let updatedList;
        console.log("item:"+itemDiv.id);
        if (item.type === "movie") {
          updatedList = likeMovied.filter(i => i.movieId !== item.movieId);
          localStorage.setItem("likeMovieList", JSON.stringify(updatedList));
          likeMovied.length = 0;
          likeMovied.push(...updatedList);
        } else if (item.type === "game") {
          updatedList = likeGamed.filter(i => i.gameId !== item.gameId);
          localStorage.setItem("likeGameList", JSON.stringify(updatedList));
          likeGamed.length = 0;
          likeGamed.push(...updatedList);
        } else if (item.type === "language") {
          updatedList = likeLanguage.filter(i => i.languageId !== item.languageId); 
          localStorage.setItem("likeLanguageList", JSON.stringify(updatedList));
          likeLanguage.length = 0;
          likeLanguage.push(...updatedList);
        }
        itemDiv.remove(); 
      }
    });
  });
};
