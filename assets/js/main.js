window.addEventListener('load', function() {
  const cards = document.querySelectorAll(".card-item");
  const modalCards = document.querySelectorAll(".modal-card");
  const modal = document.querySelector(".modal");
  const closeButtons = document.querySelectorAll(".close");
  // const listBox = document.querySelectorAll(".listBox");

  cards.forEach((card, index) => {
    card.addEventListener("click", function () {
      modal.style.display = "flex"; // 모달 배경 표시
      modalCards.forEach((modalCard) => {
        modalCard.style.display = "none"; // 모든 모달 숨기기
      });
      modalCards[index].style.display = "flex"; // 해당 모달만 보이게 하기
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modal.style.display = "none"; // 모달 배경 숨기기
    });
  });

  // 모달 배경을 클릭하면 닫히도록 설정
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // // listBox.addEventListener("click", function () {
  // //   listBox.style.backgrondcolor = "yellow";
  // //   listBox.style.color = "white";
  // });
});
