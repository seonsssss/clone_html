function renderGameBoxList() {
    const gameBoxList = document.querySelector('.gameBoxList');
  
    fetch('assets/data/touch.json')
      .then(response => response.json())
      .then(data => {
        const games = data.touch;
  
        games.forEach((game, index) => {
          const gameDiv = document.createElement('div');
          gameDiv.classList.add('game');
  
          const gameLink = document.createElement('a');
          gameLink.href = game.link;
      
          const gameImg = document.createElement('img');
          gameImg.src = game.imageSrc;
          gameImg.alt = game.altText;
      
          gameLink.appendChild(gameImg);
          gameDiv.appendChild(gameLink);
      
          const textLoveDiv = document.createElement('div');
          textLoveDiv.classList.add('text-love');
      
          const textDiv = document.createElement('div');
          textDiv.classList.add('text');
      
          const gameTitle = document.createElement('p');
          gameTitle.textContent = game.title;
      
          textDiv.appendChild(gameTitle);
          textLoveDiv.appendChild(textDiv);
      
          const loveDiv = document.createElement('div');
          loveDiv.classList.add('love');
      
          const heartImage = document.createElement('img');
          heartImage.src = game.heart.emptySrc;  // Initially set to empty heart
          heartImage.alt = "빈 하트";
          heartImage.classList.add('heart-empty');
      
          loveDiv.appendChild(heartImage);
          textLoveDiv.appendChild(loveDiv);
      
          gameDiv.appendChild(textLoveDiv);
          gameBoxList.appendChild(gameDiv);
          // Add the gameDiv to either gameBoxListUp or gameBoxListDown based on the index or any condition
        
        });
      })
      .catch(error => console.error('Error fetching game data:', error));
  }
  
  // Call the function to render the game list after DOM is loaded
  document.addEventListener('DOMContentLoaded', renderGameBoxList);
  