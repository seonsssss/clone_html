import { isLoggedIn, checkLoginStatus, logintoggle } from "./login.js";
let isGameAlreadyLiked;
let likeGameList = JSON.parse(localStorage.getItem("likeGameList")) || [];
const gameBoxList = document.querySelector(".gameBoxList");
const gameBox = document.querySelector(".gameBox");

window.onload = function () {  
  checkLoginStatus();
  logintoggle();
  renderGameBoxList();
  gameBox.addEventListener("click", function (event) {
    // love 클래스가 포함된 이미지인지 확인
    if (event.target && event.target.closest(".love img")) {
      const heart = event.target;
      const game = heart.closest(".game");
      const gameLink = game.querySelector("a").href;
      const gameId = game.id.replace("game", "");
      const gameDetails = {
        gameId: gameId,
        title: game.querySelector(".text p").textContent,
        image: game.querySelector(".game-image").src,
        link: gameLink,
        isLiked: true,
      };
      isGameAlreadyLiked = likeGameList.some((game) => game.gameId === gameId);
      if (isLoggedIn === "true") {
        if (heart.classList.contains("heart-empty")) {
          heart.src = "assets/images/movie/하트.png"; // 채워진 하트 이미지
          heart.classList.remove("heart-empty");
          heart.classList.add("heart-full");
          if (!isGameAlreadyLiked) {
            likeGameList.push(gameDetails); // 중복이 아닐 경우에만 추가
            localStorage.setItem(
              "likeGameList",
              JSON.stringify(likeGameList)
            ); // 업데이트된 리스트 저장
            console.log("gameDetails:", gameDetails);
            console.log("likeGameList:", likeGameList);
          } else {
            console.log("This movie is already in the bookmark list.");
          }
        } else {
          heart.src = "assets/images/movie/빈하트.png"; // 빈 하트 이미지
          heart.classList.remove("heart-full");
          heart.classList.add("heart-empty");
          likeGameList = likeGameList.filter((game) => game.gameId !== gameId);
          localStorage.setItem("likeGameList", JSON.stringify(likeGameList)); // Update localStorage
          console.log("Movie removed from likeGameList:", gameId);
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
  restoreGameLikedStatus();
};

function renderGameBoxList() {
  fetch("assets/data/touch.json")
    .then((response) => response.json())
    .then((data) => {
      const games = data.touch;

      games.forEach((game)=> {
        const gameDiv = document.createElement("div");
        gameDiv.classList.add("game");

        gameDiv.id = `${game.id}`;
        const gameLink = document.createElement("a");
        gameLink.href = game.link;

        const gameImg = document.createElement("img");
        gameImg.classList.add("game-image");
        gameImg.src = game.imageSrc;
        gameImg.alt = game.altText;

        gameLink.appendChild(gameImg);
        gameDiv.appendChild(gameLink);

        const textLoveDiv = document.createElement("div");
        textLoveDiv.classList.add("text-love");

        const textDiv = document.createElement("div");
        textDiv.classList.add("text");

        const gameTitle = document.createElement("p");
        gameTitle.textContent = game.title;

        textDiv.appendChild(gameTitle);
        textLoveDiv.appendChild(textDiv);

        const loveDiv = document.createElement("div");
        loveDiv.classList.add("love");

        const heartImage = document.createElement("img");
        heartImage.src = game.heart.emptySrc;
        heartImage.alt = "빈 하트";
        heartImage.classList.add("heart-empty");

        loveDiv.appendChild(heartImage);
        textLoveDiv.appendChild(loveDiv);

        gameDiv.appendChild(textLoveDiv);
        gameBoxList.appendChild(gameDiv);
      });
          // 게임 목록 렌더링이 완료된 후 하트 상태를 복원
          restoreGameLikedStatus();
        })
        .catch((error) => console.error("Error fetching game data:", error));
    }
    
function restoreGameLikedStatus() {
  likeGameList.forEach((likedGame) => {
    const likedGameItem = document.getElementById(
      `game${likedGame.gameId}`
    );
    if (likedGameItem) {
      const heart = likedGameItem.querySelector(".love img");
      if (heart) {
        heart.src = "assets/images/movie/하트.png"; // Change to filled heart
        heart.classList.remove("heart-empty");
        heart.classList.add("heart-full");
      }
    }
  });
}