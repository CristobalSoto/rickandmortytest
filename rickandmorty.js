const fetch = require("node-fetch");


const baseUrl = 'https://rickandmortyapi.com/api'

// Since there is no way to remove pagination from the documentation we are using a trick
// a function to create an array with the numbers of characters, locations and episodes to get them all with 1 request
function rangeArray(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const charactersArray = rangeArray(1, 672);
const locationsArray = rangeArray(1, 109);
const episodesArray = rangeArray(1, 42);

const reducer = (accumulator, currentValue, letter) => {
  if (currentValue.name.toLowerCase().indexOf(letter)) {
    accumulator = accumulator + 1;
  }
  return accumulator
};

async function getData() {
  const responseCharacters = await fetch(`${baseUrl}/character/${charactersArray}`)
  const responseLocations = await fetch(`${baseUrl}/location/${locationsArray}`)
  const responseEpisodes = await fetch(`${baseUrl}/episode/${episodesArray}`)

  const characters = await responseCharacters.json();
  const locations = await responseLocations.json();
  const episodes = await responseEpisodes.json();

  return [characters, locations, episodes]
}



getData()
  .then(([characters, locations, episodes])=> {
    countLetterL = locations.reduce((acc, cV) => reducer(acc, cV,'l'), 0)
    countLetterE = episodes.reduce((acc, cV) => reducer(acc, cV,'e'), 0)
    countLetterC = characters.reduce((acc, cV) => reducer(acc, cV,'c'), 0)
    
    episodes.forEach(episode => {
      console.log("Episodio", episode.id)
      episode.characters.forEach(char => {
        splitterCharacter = char.split("/")
        characterId = splitterCharacter[splitterCharacter.length-1]

        console.log(`Character: ${characters[characterId-1]['name']} Location: ${characters[characterId-1]['origin']['name']}`)

      });
    });
  })