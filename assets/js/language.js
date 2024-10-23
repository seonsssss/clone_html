import { isLoggedIn, checkLoginStatus, logintoggle } from "./login.js";
let isLanguageAlreadyLiked;
let likeLanguageList = JSON.parse(localStorage.getItem("likeLanguageList")) || [];
const languageBoxList = document.querySelector(".languageBoxList");
const languageBox = document.querySelector(".languageBox");

window.onload = function () {  
  checkLoginStatus();
  logintoggle();
  renderLanguageBoxList();

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

      // Check if the language is already liked
      isLanguageAlreadyLiked = likeLanguageList.some((lang) => lang.languageId === languageId);

      if (isLoggedIn === "true") {
        if (heart.classList.contains("heart-empty")) {
          // Toggle to filled heart
          heart.src = "assets/images/movie/하트.png";
          heart.classList.remove("heart-empty");
          heart.classList.add("heart-full");

          if (!isLanguageAlreadyLiked) {
            likeLanguageList.push(languageDetails); // Add to liked list if not already liked
            localStorage.setItem("likeLanguageList", JSON.stringify(likeLanguageList)); // Save updated list
            console.log("languageDetails:", languageDetails);
            console.log("likeLanguageList:", likeLanguageList);
          } else {
            console.log("This language is already in the bookmark list.");
          }
        } else {
          // Toggle to empty heart
          heart.src = "assets/images/movie/빈하트.png";
          heart.classList.remove("heart-full");
          heart.classList.add("heart-empty");

          // Remove the language from the liked list
          likeLanguageList = likeLanguageList.filter((lang) => lang.languageId !== languageId);
          localStorage.setItem("likeLanguageList", JSON.stringify(likeLanguageList)); // Update localStorage
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
};

function renderLanguageBoxList() {
  fetch("assets/data/language.json")
    .then((response) => response.json())
    .then((data) => {
      const languages = data.languages;

      languages.forEach((language) => {
        const languageDiv = document.createElement("div");
        languageDiv.classList.add("language");
        languageDiv.id = `language${language.id}`; // Correct id prefix

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
      
      restoreLanguageLikedStatus(); // After rendering, restore the liked status
    })
    .catch((error) => console.error("Error fetching languages data:", error));
}

function restoreLanguageLikedStatus() {
  likeLanguageList.forEach((likedLanguage) => {
    const likedLanguageItem = document.getElementById(`language${likedLanguage.languageId}`);
    if (likedLanguageItem) {
      const heart = likedLanguageItem.querySelector(".love img");
      if (heart) {
        // Restore the filled heart for liked languages
        heart.src = "assets/images/movie/하트.png";
        heart.classList.remove("heart-empty");
        heart.classList.add("heart-full");
      }
    }
  });
}
