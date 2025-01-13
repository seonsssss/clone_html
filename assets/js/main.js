window.addEventListener('load', function() {
  const cards = document.querySelectorAll(".card-item");
  const modalCards = document.querySelectorAll(".modal-card");
  const modal = document.querySelector(".modal");
  const closeButtons = document.querySelectorAll(".close");
  cards.forEach((card, index) => {
    card.addEventListener("click", function () {
      modal.style.display = "flex"; 
      modalCards.forEach((modalCard) => {
        modalCard.style.display = "none"; 
      });
      modalCards[index].style.display = "flex"; 
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modal.style.display = "none"; 
    });
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});
