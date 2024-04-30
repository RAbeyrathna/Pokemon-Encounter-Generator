
const spriteURLs = {
    "2D": {
        normal: "sprites.front_default",
        shiny: "sprites.front_shiny"
    },
    "3D": {
        normal: "sprites.other.showdown.front_default",
        shiny: "sprites.other.showdown.front_shiny"
    }
}

let currentSpriteType = "2D";
let spriteToggleButton = document.querySelector("#sprite-button");

function toggleSpriteType(){
	if (currentSpriteType == "2D"){
		currentSpriteType = "3D";
        spriteToggleButton.textContent = "Switch to 2D Sprites"
	} else {
		currentSpriteType = "2D";
        spriteToggleButton.textContent = "Switch to 3D Sprites"
	}
}

spriteToggleButton.addEventListener("click", toggleSpriteType);

async function getPokemonData(){
    let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/" ;
    let pokemonID = Math.floor(Math.random() * 1025) + 1;

    let fullApiUrl = pokemonApiUrlBase + pokemonID;

    let response = await fetch(fullApiUrl);
    let responseData = await response.json();
    let result = responseData;

    return result;

}

async function putDataOnPage(dataToDisplay){
    document.querySelector(".pokemonName").textContent = dataToDisplay.name;

    let type1Display = document.querySelector(".pokemonType1");
    let type2Display = document.querySelector(".pokemonType2");

    type1Display.textContent = "Type 1: " + dataToDisplay.types[0].type.name;

    if (dataToDisplay.types[1]){
        // If second element exists, set second type display
        type2Display.textContent = "Type 2: " + dataToDisplay.types[1].type.name;
    }
    else{
        type2Display.textContent = "Type 2: ";
    }

    let imageElement = document.querySelector(".pokemonImage img")

    let oddsUpperLimit = 4;
    let shinyResult = Math.floor(Math.random() * oddsUpperLimit) + 1;

    if (shinyResult == 1){
        imageElement.src = dataToDisplay.sprites.front_shiny;
        console.log("SHINY!")
    }
    else {
        imageElement.src = dataToDisplay.sprites.front_default;
    }


    let cryURL = dataToDisplay.cries.latest;
    let pokemonAudioElement = document.querySelector(".pokemonCry audio")

    pokemonAudioElement.src = cryURL;

    let pokemonAudioPlayButton = document.querySelector(".pokemonCry");

    pokemonAudioPlayButton.addEventListener("click", () => {
        pokemonAudioElement.volume = 0.1;
        pokemonAudioElement.play();
    })
}


// Button calls this function
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data);
    putDataOnPage(data);
}


async function generateTeamData(){

    let promiseAllResult = await Promise.all([
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData()
    ]);

    return promiseAllResult;
}

async function showTeamData(teamToDisplay){
    let teamDisplaySection = document.querySelector("#team-display");
    teamDisplaySection.innerHTML = "";

    teamToDisplay.forEach(pokemon => {
        let newPokemonCard = document.createElement("div");

        // Add Pokemon Name
        let pokemonNameTitle = document.createElement("h3");
        pokemonNameTitle.textContent = pokemon.name;

        newPokemonCard.appendChild(pokemonNameTitle);

        // Add Pokemon image and shiny chance
        let imageContainer = document.createElement("div")
        let imageElement = document.createElement("img")

        imageContainer.appendChild(imageElement)

        let oddsUpperLimit = 4;
        let shinyResult = Math.floor(Math.random() * oddsUpperLimit) + 1;

        if (shinyResult == 1){
            imageElement.src = pokemon.sprites.front_shiny;
            console.log("SHINY!")
        }
        else {
            imageElement.src = pokemon.sprites.front_default;
        }

        newPokemonCard.appendChild(imageContainer);

        // Add Pokemon Type(s)
        let type1Display = document.createElement("div");
        let type2Display = document.createElement("div");

        type1Display.textContent = "Type 1: " + pokemon.types[0].type.name;

        if (pokemon.types[1]){
        // If second element exists, set second type display
            type2Display.textContent = "Type 2: " + pokemon.types[1].type.name;
        }
        else{
            type2Display.textContent = "Type 2: ";
        }

        newPokemonCard.appendChild(type1Display);
        newPokemonCard.appendChild(type2Display);

        // Add Pokemon Cry button
        let cryURL = pokemon.cries.latest;
        let pokemonAudioElement = document.createElement("audio");
        pokemonAudioElement.src = cryURL;

        let pokemonAudioPlayButton = document.createElement("button");

        pokemonAudioPlayButton.textContent = "Play Sound";
        pokemonAudioPlayButton.addEventListener("click", () => {
            pokemonAudioElement.volume = 0.1;
            pokemonAudioElement.play();
        });

        pokemonAudioPlayButton.appendChild(pokemonAudioElement);
        newPokemonCard.appendChild(pokemonAudioPlayButton);

        

        // Apply content to page


        teamDisplaySection.appendChild(newPokemonCard);
    });
}

async function getAndShowTeamData(){
    let teamData = await generateTeamData();
    showTeamData(teamData);
    console.log(teamData)
}   

function toggleSprite() {
    
}

document.getElementById("create-team").addEventListener("click", getAndShowTeamData);

document.querySelector("#create-encounter").addEventListener("click", getAndDisplayPokemonData);