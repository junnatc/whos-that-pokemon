// Source: doctafaustus on Github

const getPokeData = async function () {
  const pokemon = await getPokemon(); // [{}, {}, {}]
  const randomPokemon = shuffle(pokemon);

  const pokemonChoices = get5Pokemon(randomPokemon);
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

function get5Pokemon(randomPokemon) {
  return randomPokemon.splice(0, 5);
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
  const pokeData = await getPokeData()
  displayPokemon(pokeData)
  
}

playGame()

function displayPokemon(displayData){
  const pokeImgElement = document.querySelector("#guess-pokemon")
  pokeImgElement.src = displayData.correct.image
}