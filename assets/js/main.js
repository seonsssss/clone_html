// // for (let i = 0; i < 7; i++) {
// //     $("card"[i+1]).addEventListner("click", function () {
// //         console.log("card");
// //         if ($("modal"[i+1]).css("display") == "none") {
// //             $("modal"[i+1]).show();
// //         } else {
// //             $("modal"[i+1]).hide();
// //         }
// //     })
// // }

// const characters = [
//     {
//       id: "modal-card1",
//       name: "뽀치",
//       role: "발명가",
//       type: "고슴도치",
//       likes: ["긍정의 기운 주기", "탐구활동", "발명하기"],
//       image: "assets/images/character/뽀치.png",
//       bgImage: "assets/images/modal/뽀치bgImg.png",
//     },
//     {
//       id: "modal-card2",
//       name: "미니",
//       role: "탐정",
//       type: "토끼",
//       likes: ["질문하기", "탐정놀이"],
//       image: "assets/images/character/미니.png",
//       bgImage: "assets/images/modal/미니bgImg.png",
//     },
//     {
//       id: "modal-card3",
//       name: "쥬니",
//       role: "해결사",
//       type: "북극곰",
//       likes: ["숲속마을 보호하기", "꽃 향기 맡기"],
//       image: "assets/images/character/쥬니.png",
//       bgImage: "assets/images/modal/쥬니bgImg.png",
//     },
//     {
//       id: "modal-card4",
//       name: "삐요",
//       role: "오지라퍼",
//       type: "새",
//       likes: ["코딩", "검색", "어려운 문제 풀기"],
//       image: "assets/images/character/삐요.png",
//       bgImage: "assets/images/modal/삐요bgImg.png",
//     },
//     {
//       id: "modal-card5",
//       name: "퐁퐁이",
//       role: "연예인",
//       type: "돌고래",
//       likes: ["일광욕", "춤추기"],
//       image: "assets/images/character/퐁퐁이.png",
//       bgImage: "assets/images/modal/퐁퐁이bgImg.png",
//     },
//     {
//       id: "modal-card6",
//       name: "꼬미",
//       role: "초록 환경지킴이",
//       type: "곤충",
//       likes: ["아침이슬이 맺힌 잎사귀 먹기", "숲길 산책"],
//       image: "assets/images/character/꼬미.png",
//       bgImage: "assets/images/modal/꼬미bgImg.png",
//     },
//     {
//       id: "modal-card7",
//       name: "포키",
//       role: "조력자",
//       type: "여우",
//       likes: ["친구들과 어울리기", "사진 찍기", "보드 타기"],
//       image: "assets/images/character/포키.png",
//       bgImage: "assets/images/modal/포키bgImg.png",
//     },
//   ];
//   function showModal(cardId) {
//     const modal = document.querySelector(".modal");
//     const bigCard = document.querySelector(`#bigCard${cardId}`);
  
//     modal.style.display = "block";
//     bigCard.style.display = "block";
  
//     const character = characters.find((char) => char.id === cardId);
//     bigCard.querySelector("h2").textContent = character.name;
//     bigCard.querySelector("p:nth-child(2)").textContent = character.role;
//     bigCard.querySelector("p:nth-child(3)").textContent = character.type;
//     bigCard.querySelector("ul").innerHTML = character.likes
//       .map((like) => `<li>${like}</li>`)
//       .join("");
//     bigCard.querySelector("img").src = character.image;
//     bigCard.querySelector(".modal-bg-img").src = character.bgImage;
//   }
  
//   const closeBtn = document.querySelector("#close");
//   closeBtn.addEventListener("click", () => {
//     const modal = document.querySelector(".modal");
//     modal.style.display = "none";
//   });
  
//   const cards = document.querySelectorAll(".card-item");
//   cards.forEach((card) => {
//     card.addEventListener("click", () => {
//       const cardId = card.id;
//       showModal(cardId);
//     });
//   });

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card-item');
    const modalCards = document.querySelectorAll('.modal-card');
    const modal = document.querySelector('.modal');
    const closeButtons = document.querySelectorAll('.close');

    cards.forEach((card, index) => {
        card.addEventListener('click', function () {
            modal.style.display = 'flex'; // 모달 배경 표시
            modalCards.forEach(modalCard => {
                modalCard.style.display = 'none'; // 모든 모달 숨기기
            });
            modalCards[index].style.display = 'flex'; // 해당 모달만 보이게 하기
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            modal.style.display = 'none'; // 모달 배경 숨기기
        });
    });


    // 모달 배경을 클릭하면 닫히도록 설정
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
