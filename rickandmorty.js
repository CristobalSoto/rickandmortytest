const fetch = require("node-fetch");

console.time("apptimer")
const baseUrl = 'https://rickandmortyapi.com/api'

// Since there is no way to remove pagination from the documentation we are using a trick
// a function to create an array with the numbers of characters, locations and episodes to get them all with 1 request each
// Disclaimer: this is not an escalable solution nor appropiate for real projects
function rangeArray(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const charactersArray = rangeArray(1, 672);
const locationsArray = rangeArray(1, 109);
const episodesArray = rangeArray(1, 42);

function getCharacterId(character) {
  splitterCharacter = character.split("/")
  return splitterCharacter[splitterCharacter.length-1]
}

function reducer(accumulator, currentValue, letter) {
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
    countLetterL = countLetter(locations, 'l');
    countLetterE = countLetter(episodes, 'e');
    countLetterC = countLetter(characters, 'c');

    console.log(`Letra l para locations: ${countLetterL}`);
    console.log(`Letra e para episodes: ${countLetterE}`)
    console.log(`Letra c para characters: ${countLetterC}`)

    episodes.forEach(episode => {
      console.log(`Episodio ${episode.id}`);
      episode.characters.forEach(character => {
        characterId = getCharacterId(character)
        console.log(`Character: ${characters[characterId-1]['name']} Location: ${characters[characterId-1]['origin']['name']}`);

      });
    });
    console.timeEnd("apptimer")
  })