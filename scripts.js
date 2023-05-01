let word = {
  word: "apple",
  phonetic: "/ˈæp.əl/",
  phonetics: [
    {
      text: "/ˈæp.əl/",
      audio:
        "https://api.dictionaryapi.dev/media/pronunciations/en/apple-uk.mp3",
      sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9014262",
      license: {
        name: "BY 3.0 US",
        url: "https://creativecommons.org/licenses/by/3.0/us",
      },
    },
    {
      text: "/ˈæp.əl/",
      audio:
        "https://api.dictionaryapi.dev/media/pronunciations/en/apple-us.mp3",
      sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=718877",
      license: {
        name: "BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
    },
  ],
  meanings: [
    {
      partOfSpeech: "noun",
      definitions: [
        {
          definition:
            "A common, round fruit produced by the tree Malus domestica, cultivated in temperate climates.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "Any of various tree-borne fruits or vegetables especially considered as resembling an apple; also (with qualifying words) used to form the names of other specific fruits such as custard apple, rose apple, thorn apple etc.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "The fruit of the Tree of Knowledge, eaten by Adam and Eve according to post-Biblical Christian tradition; the forbidden fruit.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "A tree of the genus Malus, especially one cultivated for its edible fruit; the apple tree.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "The wood of the apple tree.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "(in the plural) Short for apples and pears, slang for stairs.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "The ball in baseball.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "When smiling, the round, fleshy part of the cheeks between the eyes and the corners of the mouth.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "A Native American or red-skinned person who acts and/or thinks like a white (Caucasian) person.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "(ice hockey slang) An assist.",
          synonyms: [],
          antonyms: [],
        },
      ],
      synonyms: [],
      antonyms: [],
    },
    {
      partOfSpeech: "verb",
      definitions: [
        {
          definition: "To become apple-like.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "To form buds.",
          synonyms: [],
          antonyms: [],
        },
      ],
      synonyms: [],
      antonyms: [],
    },
  ],
  license: {
    name: "CC BY-SA 3.0",
    url: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  sourceUrls: ["https://en.wiktionary.org/wiki/apple"],
};

const wordTitle = document.getElementById("word-title");
const wordSubTitle = document.getElementById("word-subtitle");
const soundElement = document.getElementById("sound");
const playButton = document.getElementById("play-btn");
const sourceLink = document.getElementById("source-link");
const searchInput = document.getElementById("search-input");
const fontSelect = document.getElementById("font-select");
const nounDefinitionsElement = document.getElementById("noun-definitions");
const verbDefinitionElement = document.getElementById("verb-definitions");
const synonym = document.getElementById("synonymn");

wordTitle.innerText = word.word;
wordSubTitle.innerText = word.phonetic;
soundElement.src = word.phonetics[0].audio;
sourceLink.innerText = word.sourceUrls[0];

synonym.innerText = nouns(word).synonyms[0]
  ? nouns(word).synonyms[0]
  : "no synonyms";

playButton.onclick = () => {
  soundElement.play();
};

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getWord();
  }
});

const nounDefinitions = nouns(word).definitions.slice(0, 3);

const verbDefinitions = verbs(word).definitions.slice(0, 3);

nounDefinitions.forEach((element) => {
  let definition = document.createElement("li");
  definition.appendChild(document.createTextNode(element.definition));
  nounDefinitionsElement.appendChild(definition);
});

verbDefinitions.forEach((element) => {
  let definition = document.createElement("li");
  definition.appendChild(document.createTextNode(element.definition));
  verbDefinitionElement.appendChild(definition);
});

function nouns(word) {
  return word.meanings.find((meaning) => meaning.partOfSpeech === "noun");
}

function verbs(word) {
  return word.meanings.find((meaning) => meaning.partOfSpeech === "verb");
}

async function getWord() {
  const wordInput = document.getElementById("search-input").value;

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`
  );
  const jsonData = await response.json();

  wordTitle.innerText = jsonData[0].word;
  wordSubTitle.innerText = jsonData[0].phonetic ? jsonData[0].phonetic : "";
  soundElement.src = jsonData[0].phonetics[0].audio;
  sourceLink.innerText = jsonData[0].sourceUrls[0];

  // remove nouns
  while (nounDefinitionsElement.firstChild) {
    nounDefinitionsElement.removeChild(nounDefinitionsElement.lastChild);
  }

  // add new noun meanings
  nouns(jsonData[0])
    .definitions.slice(0, 3)
    .forEach((element) => {
      let definition = document.createElement("li");
      definition.appendChild(document.createTextNode(element.definition));
      nounDefinitionsElement.appendChild(definition);
    });

  // remove verbs
  while (verbDefinitionElement.firstChild) {
    verbDefinitionElement.removeChild(verbDefinitionElement.lastChild);
  }

  // add new verb meanings
  verbs(jsonData[0])
    .definitions.slice(0, 3)
    .forEach((element) => {
      let definition = document.createElement("li");
      definition.appendChild(document.createTextNode(element.definition));
      verbDefinitionElement.appendChild(definition);
    });

  const nounSynonym = nouns(jsonData[0]).synonyms[0];

  synonym.innerText = nounSynonym ? nounSynonym : "no synonyms";
}
