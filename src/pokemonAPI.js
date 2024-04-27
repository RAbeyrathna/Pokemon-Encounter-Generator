
async function getPokemonData(){
    let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/" ;
    let pokemonID = Math.floor(Math.random() * 1025) + 1;

    let fullApiUrl = pokemonApiUrlBase + pokemonID;

    let response = await fetch(fullApiUrl);
    let responseData = await response.json();
    let result = responseData;

    // let promiseResponse = await fetch(fullApiUrl).then(response => {
    //     return response.json();
    // })

    // result = promiseResponse;

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
        type2Display.textContent = "";
    }

    let imageElement = document.querySelector(".pokemonImage img")

    imageElement.src = dataToDisplay.sprites.front_default;

}


// Button calls this function
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data);
    putDataOnPage(data);
}


document.querySelector("#create-encounter").addEventListener("click", getAndDisplayPokemonData);