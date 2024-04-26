
async function getPokemonData(){
    let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/" ;
    let pokemonID = Math.floor(Math.random() * 1025) + 1;

    let fullApiUrl = pokemonApiUrlBase + pokemonID;

    let response = await fetch(fullApiUrl);
    let responseData = await response.json();
    let result = responseData;
    return result;

}

async function putDataOnPage(){
}


// Button calls this function
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data);
    putDataOnPage();
}


document.querySelector("#create-encounter").addEventListener("click", getAndDisplayPokemonData);