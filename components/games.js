
async function createGames(data) {
  const container = document.getElementById('gallery-container'); // Replace with your container ID

  for (let i = 0; i < data.length; i++) {
    // Create a new div element
    const gameCard = document.createElement('div');
    gameCard.classList.add('gallery-item', `gallery-item-${i + 1}`);
    gameCard.dataset.index = i + 1;

    const image = document.createElement('img');
    image.src = data[i].src;

    const name = document.createElement('p');
    name.innerText = data[i].name;
    gameCard.appendChild(image);
    gameCard.appendChild(name);
    container.appendChild(gameCard);
  }
}

async function populateGames(apiurl) {
  try {
    const response = await fetch(apiurl);
    const data = await response.json();
    createGames(data);
  } catch (error) {
    console.error(error);
  }
}

export { populateGames };
