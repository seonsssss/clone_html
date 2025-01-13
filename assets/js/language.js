import { isLoggedIn, checkLoginStatus, logintoggle } from "./login.js";
import { initializeSearch } from "./search.js";
let isLanguageAlreadyLiked;
let likeLanguageList = JSON.parse(localStorage.getItem("likeLanguageList")) || [];
const languageBoxList = document.querySelector(".languageBoxList");
const languageBox = document.querySelector(".languageBox");

window.addEventListener('load', function() {
  checkLoginStatus();
  logintoggle();
  renderLanguageBoxList();
  initializeSearch();

  languageBox.addEventListener("click", function (event) {
    if (event.target && event.target.closest(".love img")) {
      const heart = event.target;
      const language = heart.closest(".language");
      const languageLink = language.querySelector("a").href;
      const languageId = language.id.replace("language", "");

      const languageDetails = {
        languageId: languageId,
        title: language.querySelector(".text p").textContent,
        image: language.querySelector(".language-image").src,
        link: languageLink,
        isLiked: true,
      };

      isLanguageAlreadyLiked = likeLanguageList.some((lang) => lang.languageId === languageId);

      console.log("isLoggedIn:", isLoggedIn);
      if (isLoggedIn === "true") {
        if (heart.classList.contains("heart-empty")) {
          heart.src = "assets/images/movie/하트.png";
          heart.classList.remove("heart-empty");
          heart.classList.add("heart-full");

          if (!isLanguageAlreadyLiked) {
            likeLanguageList.push(languageDetails);
            localStorage.setItem("likeLanguageList", JSON.stringify(likeLanguageList));
            console.log("languageDetails:", languageDetails);
            console.log("likeLanguageList:", likeLanguageList);
          } else {
            console.log("This language is already in the bookmark list.");
          }
        } else {
          heart.src = "assets/images/movie/빈하트.png";
          heart.classList.remove("heart-full");
          heart.classList.add("heart-empty");

          likeLanguageList = likeLanguageList.filter((lang) => lang.languageId !== languageId);
          localStorage.setItem("likeLanguageList", JSON.stringify(likeLanguageList));
          console.log("Language removed from likeLanguageList:", languageId);
        }
      } else {
        const ask = confirm("Please log in to use this feature.");
        if (ask) {
          window.location.href = "login.html";
        }
      }
    }
  });

  restoreLanguageLikedStatus();
});

function renderLanguageBoxList() {
  fetch("assets/data/language.json")
    .then((response) => response.json())
    .then((data) => {
      const languages = data.languages;

      languages.forEach((language) => {
        const languageDiv = document.createElement("div");
        languageDiv.classList.add("language");
        languageDiv.id = `language${language.id}`;

        const languageLink = document.createElement("a");
        languageLink.href = language.link;

        const languageImg = document.createElement("img");
        languageImg.classList.add("language-image");
        languageImg.src = language.imageSrc;
        languageImg.alt = language.altText;

        languageLink.appendChild(languageImg);
        languageDiv.appendChild(languageLink);

        const textLoveDiv = document.createElement("div");
        textLoveDiv.classList.add("text-love");

        const textDiv = document.createElement("div");
        textDiv.classList.add("text");

        const languageTitle = document.createElement("p");
        languageTitle.textContent = language.title;

        textDiv.appendChild(languageTitle);
        textLoveDiv.appendChild(textDiv);

        const loveDiv = document.createElement("div");
        loveDiv.classList.add("love");

        const heartImage = document.createElement("img");
        heartImage.src = language.heart.emptySrc;
        heartImage.alt = "Empty heart";
        heartImage.classList.add("heart-empty");

        loveDiv.appendChild(heartImage);
        textLoveDiv.appendChild(loveDiv);

        languageDiv.appendChild(textLoveDiv);
        languageBoxList.appendChild(languageDiv);
      });
      
      restoreLanguageLikedStatus(); 
    })
    .catch((error) => console.error("Error fetching languages data:", error));
}

function restoreLanguageLikedStatus() {
  likeLanguageList.forEach((likedLanguage) => {
    const likedLanguageItem = document.getElementById(`language${likedLanguage.languageId}`);
    if (likedLanguageItem) {
      const heart = likedLanguageItem.querySelector(".love img");
      if (heart) {
        if (isLoggedIn === "true") {
          heart.src = "assets/images/movie/하트.png";
          heart.classList.remove("heart-empty");
          heart.classList.add("heart-full");
        } else {
          heart.src = "assets/images/movie/빈하트.png";
          heart.classList.remove("heart-full");
          heart.classList.add("heart-empty");
        }
      }
    }
  });
}
