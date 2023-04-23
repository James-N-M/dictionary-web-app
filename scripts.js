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

let storedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
}

document.getElementById("word-title").innerText = word.word;
document.getElementById("word-subtitle").innerText = word.phonetic;
const soundElement = document.getElementById("sound");

soundElement.src = word.phonetics[0].audio;

document.getElementById("play-btn").onclick = () => {
  soundElement.play();
};

function changeFont() {
  var fontFamily = document.getElementById("font-select").value;
  let body = document.getElementsByTagName("body")[0];

  switch (fontFamily) {
    case "serif":
      body.style.fontFamily = "Times New Roman, Times, serif";
      break;
    case "sans-serif":
      body.style.fontFamily = "Arial, Helvetica, sans-serif";
      break;
    case "monospace":
      body.style.fontFamily = "Lucida Console, Courier New, monospace";
  }
}

function toggleTheme() {
  let currentTheme = document.documentElement.getAttribute("data-theme");

  var targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
  }

  document.documentElement.setAttribute("data-theme", targetTheme);

  localStorage.setItem("theme", targetTheme);

  toggleIcon();
}

function toggleIcon() {
  let themeIcon = document.getElementById("theme-icon");
  if (themeIcon.classList.contains("fa-sun")) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else if (themeIcon.classList.contains("fa-moon")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

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

  document.getElementById("word-title").innerText = jsonData[0].word;
  document.getElementById("word-subtitle").innerText = jsonData[0].phonetic ? jsonData[0].phonetic : '';
  document.getElementById("sound").src = jsonData[0].phonetics[0].audio;
  document.getElementById("source-link").innerText = jsonData[0].sourceUrls[0];

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

    document.getElementById('synonymn').innerText = nounSynonym ? nounSynonym : 'no synonyms';
}

const nounDefinitionsElement = document.getElementById("noun-definitions");

const verbDefinitionElement = document.getElementById("verb-definitions");

const nounSynonym = nouns(word).synonyms[0];

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

let searchInput = document.getElementById("search-input");

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getWord();
  }
});

document.getElementById("source-link").innerText = word.sourceUrls[0];

document.getElementById('synonymn').innerText = nounSynonym ? nounSynonym : 'no synonyms';