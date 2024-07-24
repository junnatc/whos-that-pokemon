// API pulled from doctafaustus on Github

let lives;
let rounds;
let pokemon;
let gameActive;
const pokeImgElement = document.querySelector("#guess-pokemon");
const liveCount = document.querySelector(`#life-count h1`);
const textDisplayName = document.querySelector("#text-display p");

// Game initialization
const init = async function () {
  lives = 3;
  rounds = 0;
  gameActive = true;
  liveCount.innerText = `Life Count: ${lives}`;

  // Get all pokemon
  pokemon = await getPokemon();
  playRound(); // Start the first round
};

async function getPokemon() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const pokemonData = await res.json();
    return pokemonData.results;
  } catch (error) {
    console.error("Failed to fetch Pokémon data:", error);
    return [];
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function get4Pokemon(randomPokemon) {
  return randomPokemon.slice(0, 4);
}

function getPokemonImage(pokemon) {
  const number = getPokemonNumber(pokemon.url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
}

function getPokemonNumber(url) {
  const matches = url.match(/\/(\d+)\//);
  return matches ? matches[1] : null;
}

async function playRound() {
  const pokeData = getPokeData();
  displayPokemon(pokeData);
}

function getPokeData() {
  const randomPokemon = shuffle(pokemon);
  const pokemonChoices = get4Pokemon(randomPokemon);
  const [firstPokemon] = pokemonChoices;
  const image = getPokemonImage(firstPokemon);

  const answer = {
    pokemonChoices: shuffle(pokemonChoices),
    correct: {
      image,
      name: firstPokemon.name,
    },
  };

  return answer;
}

function displayPokemon(displayData) {
  pokeImgElement.src = displayData.correct.image;
  pokeImgElement.alt = displayData.correct.name;

  const choices = document.querySelectorAll(".choice");
  choices.forEach((element, i) => {
    element.innerText = displayData.pokemonChoices[i].name;
    element.addEventListener("click", handleChoice);
  });
}

function handleChoice(event) {
  const userChoice = event.target.innerText;
  const correctAnswer = pokeImgElement.alt;

  checkAnswer(userChoice, correctAnswer, event.target);
}

function checkAnswer(userChoice, correctAnswer, element) {
  if (!gameActive) return;

  if (userChoice === correctAnswer) {
    element.style.color = "green";
    typeText(`It's ${correctAnswer}!`, 30, () => {
      revealPokemon();
      stopGame();
      setTimeout(nextRound, 1000); // Delay next round start
    });
  } else {
    element.style.color = "red";
    lifeDeduct();
    typeText(`You're wrong, it's ${correctAnswer}!`, 30, () => {
      if (lives === 0) {
        zerolives(); // Call zerolives function when lives hit zero
      } else {
        revealPokemon();
        stopGame();
        setTimeout(nextRound, 1000); // Delay next round start
      }
    });
  }
}

function lifeDeduct() {
  if (!gameActive) return;
  lives--;
  liveCount.innerText = `Life Count: ${lives}`;

  if (lives === 0 && rounds < 5) {
    stopGame();
  }
}

function zerolives() {
  revealPokemon();
  setTimeout(() => {
    window.location.href = "../pages/losePage.html";
  }, 2000); // Delay before redirecting to the lose page
}

function revealPokemon() {
  if (!gameActive) return;

  pokeImgElement.style.transition = "none";
  pokeImgElement.style.filter = "brightness(0)";
  setTimeout(() => {
    pokeImgElement.style.transition = "filter 0.5s ease-out";
    pokeImgElement.style.filter = "brightness(1)";
  }, 100); // Small delay to ensure smooth transition
}

function stopGame() {
  gameActive = false;
}

function nextRound() {
  rounds++;

  if (rounds >= 5) {
    stopGame();
    revealPokemon(); // Ensure last Pokémon is revealed
    setTimeout(() => {
      window.location.href = "../pages/winPage.html"; // Redirect to win page after last round
    }, 2000); // Delay before redirecting to the win page
  } else {
    pokeImgElement.style.transition = "none";
    pokeImgElement.style.filter = "brightness(0)";
    typeText("", 30, () => {
      const choices = document.querySelectorAll(".choice");
      choices.forEach((element) => {
        element.style.color = "";
        element.removeEventListener("click", handleChoice);
      });
      gameActive = true;
      playRound();
    });
  }
}

function typeText(text, delay = 30, callback) {
  textDisplayName.innerText = ""; // Clear existing text

  let index = 0;

  const typing = setInterval(() => {
    if (index >= text.length) {
      clearInterval(typing);
      if (callback) callback();
    } else {
      if (text[index] === " ") {
        textDisplayName.innerHTML += "&nbsp;"; // Add non-breaking space for better visual spacing
      } else {
        textDisplayName.innerText += text[index];
      }
      index++;
    }
  }, delay);
}

init();
