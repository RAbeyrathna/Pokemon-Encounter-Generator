
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
    document.querySelector(".pokemonImage").textContent = dataToDisplay.name;
    // document.querySelector(".pokemonName").textContent = dataToDisplay.name;
    // document.querySelector(".pokemonType1").textContent = dataToDisplay.name;
    // document.querySelector(".pokemonType2").textContent = dataToDisplay.name;
}


// Button calls this function
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data);
    putDataOnPage(data);
}


document.querySelector("#create-encounter").addEventListener("click", getAndDisplayPokemonData);