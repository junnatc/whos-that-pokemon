// Source: doctafaustus on Github

const getPokeData = async function () {
  const pokemon = await getPokemon(); // [{}, {}, {}]
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
  }

  return answer
};

async function getPokemon() {
  // Step 1: Make a "fetch"
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151"); // returns a "readable stream"
  const pokemon = await res.json(); // turn that readable stream into a javascript object

  return pokemon.results;
}

function shuffle(unshuffled) {
  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
}

function get4Pokemon(randomPokemon) {
  return randomPokemon.splice(0, 4);
}

function getPokemonImage({ url }) {
  const number = getNumber(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
}

function getNumber(url) {
  const numberRegEx = /(\d+)\/$/;
  return (url.match(numberRegEx) || [])[1];
}

async function playGame(){
  const pokeData = await getPokeData();
  displayPokemon(pokeData);
  
}

playGame()

function displayPokemon(displayData){
  console.log(displayData)
  const pokeImgElement = document.querySelector("#guess-pokemon")
  pokeImgElement.src = displayData.correct.image
  // querySelect every option button
  const choices = document.querySelectorAll(".choice")
  choices.forEach((element, i) => {
    element.innerText = displayData.pokemonChoices[i].name
    element.addEventListener("click", () => checkAnswer(displayData.pokemonChoices[i].name, displayData.correct.name, element))
  });
  // iterate through choices and set innerText to correct displayData.pokemonChoices
  // inject the different choices from the displayData
}

function checkAnswer(userChoice, correctAnswer, element) {
  if (userChoice === correctAnswer){
    element.style.color = "green"
  } else {
    element.style.color = "red"
  }
}

function stopRound(checkAnswer) {
  
}