// https://pokeapi.co/api/v2/pokemon/
//BARRA DI RICERCA
const searchBox=document.getElementById("search")
const apiurl=('https://pokeapi.co/api/v2/pokemon/');
const pokemons=[];

//auto completamento
fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1292")
  .then(allPokemons => allPokemons.json())
  .then(data => makePokemonList(data));

//lista pokemon alfabetica
function makePokemonList(data){
  for (var i=0; i<data.results.length; i++){
    pokemons.push((data.results[i].name))
  }
  pokemons.sort();
  randomRefresh()
}

//POKEMON CASUALE AL REFRESH PAGINA
function randomRefresh(){
  searchBox.value=pokemons[Math.floor(Math.random()*pokemons.length)];
  getPokemon();
}

//AUTOCOMPLETAMENTO
const autoCompleteSearch=document.getElementById("autocomplete-search")
const autoComplete=document.getElementById("autocomplete-content");

//si mostra e aggiorna l'autocomplete se:
//1) cambio nell'input che non lo rende vuoto
searchBox.addEventListener("input", event=>{
  if (searchBox.value!=""){
    autoComplete.style.display="block"
    updateAutoComplete()
  }
  else{autoComplete.style.display="none";}
})
//2)focus quando non è vuoto
searchBox.addEventListener("focus", event=>{
  if (searchBox.value!=""){ 
    autoComplete.style.display="block";
    updateAutoComplete();
  }
})
// PROBLEMA; ELIMINA PRIMA DI DETECTARE IL CLICK
// autoComplete.addEventListener("mouseout", event=>{
//     autoComplete.style.display="none";
//     updateAutoComplete();
// })

//autocompletamento
function updateAutoComplete(){
  console.log(pokemons[4])
  autoComplete.innerHTML="";
  input=searchBox.value.toLowerCase();
  let text;
  let aCounter=0;
  const resultPokemons=[];
  for (let i=0; i<pokemons.length;i++){
    if (pokemons[i].startsWith(input)){
      resultPokemons[aCounter]=pokemons[i];
      text=pokemons[i];
      autoComplete.innerHTML+=
      `<a onclick="updateSearchBox(this.innerHTML)">${text}</a>`;
      aCounter++;
    }
    if(aCounter==7){
      break;
    }
  }
  if (aCounter<7){
    for (let i=0; i<pokemons.length;i++){
      if (pokemons[i].includes(input) && !resultPokemons.includes(pokemons[i])){
        resultPokemons[aCounter]=pokemons[i];
        text=pokemons[i];
        autoComplete.innerHTML+=
        `<a onclick="updateSearchBox(this.innerHTML)">${text}</a>`;
        aCounter++;
      }
      if(aCounter==7){
        break;
      }
    }
  }
  if (aCounter==0) autoComplete.style.display="none";
}

function updateSearchBox(name){
  console.log("UPDATE SEARCHBOX ACTIVATED")
  searchBox.value=name;
  autoComplete.style.display="none";
  getPokemon();
}

//ELEMENTI CARD
//NOME SPRITE TIPI
const numberNameContainer=document.getElementById("number-name-container");
const numberContainer=document.getElementById("pokemon-number");
const nameContainer=document.getElementById("pokemon-name");
const spriteContainer=document.getElementById("pokemon-sprite");
const typesContainer=document.getElementById("pokemon-types");
//STATS
const statsContainer=document.getElementById("stats");
const hp=document.getElementById("stat-hp");
const attack=document.getElementById("stat-att");
const defense=document.getElementById("stat-def");
const sAttack=document.getElementById("stat-sp-att");
const sDefense=document.getElementById("stat-sp-def");
const speed=document.getElementById("stat-speed");
const total=document.getElementById("stats-total");


//INVIO CON ENTER (ANCHE FUORI FOCUS)
document.addEventListener("keydown", event=>{
  if (event.key==="Enter") getPokemon();
  autoComplete.style.display="none";
})

//RICHIESTA API OGGETTO POKEMON, SE USATO IL NUMERO POKEDEX SI EVITA LA CONVERSIONE A MINUSCOLO GRAZIE A isNaN
function getPokemon(){
  let name=searchBox.value;
  if (isNaN(name)) name=name.toLowerCase();
  fetch(apiurl+name)
  .then(result => result.json())
  .then(data => updateData(data));
}

//PRIMA LETTERA MAIUSCOLA ATTRAVERSO METODI STRINGA
function CapitalizeFirstLetter(string){
  return (string[0].toUpperCase()+string.slice(1))
}

//AGGIORNAMENTO DEI DATI CON I NUOVI DATI OTTENUTI
function updateData(data){
  const pokemonImgurl = data.sprites.front_default;
  spriteContainer.setAttribute("src",pokemonImgurl);
  numberContainer.innerHTML=(data.id.toString().padStart(4,"0"));
  nameContainer.innerHTML=CapitalizeFirstLetter(data.name);
  typesContainer.innerHTML="";
  let type="";
  for (let arr of data.types){
    type=arr.type.name;
    typesContainer.innerHTML+=`<div id="${type}" class="type-icon">${matchTypeName(type).toUpperCase()}</div>`
  }
  numberNameContainer.style.backgroundColor=`${matchTypeColor(data.types[0].type.name)}`
  statsContainer.style.backgroundColor=`${matchTypeColor(data.types[data.types.length-1].type.name)}`
  hp.innerHTML=data.stats[0].base_stat;
  attack.innerHTML=data.stats[1].base_stat;
  defense.innerHTML=data.stats[2].base_stat;
  sAttack.innerHTML=data.stats[3].base_stat;
  sDefense.innerHTML=data.stats[4].base_stat;
  speed.innerHTML=data.stats[5].base_stat;
  total.innerHTML="Total: "+(data.stats[0].base_stat+data.stats[1].base_stat+data.stats[2].base_stat+data.stats[3].base_stat+data.stats[4].base_stat+data.stats[5].base_stat);

}
function matchTypeName(name){
  switch(name){
    case "fighting":
      return "fight";
    case "electric":
      return "electr";
    case "psychic":
      return "psychc";
  }
  return name;
}
function matchTypeColor(type){
  switch(type){
    case "normal":
      return "#bcdbcd";
    break;
    case "fire":
      return "#fe9100";
    break;
    case "water":
      return "#1d88e4";
    break;
    case "grass":
      return "#65bb69";
    break;
    case "flying":
      return "#b2dfdb";
    break;
    case "fighting":
      return "#9e381a";
    break;
    case "poison":
      return "#8e24aa";
    break;
    case "electric":
      return "#feea3b";
    break;
    case "ground":
      return "#e5cd71";
    break;
    case "rock":
      return "#b85000";
    break;
    case "psychic":
      return "#c1175a";
    break;
    case "ice":
      return "#64fed9";
    break;
    case "bug":
      return "#b2fe59";
    break;
    case "ghost":
      return "#4527a0";
    break;
    case "steel":
      return "#9e9e9e";
    break;
    case "dragon":
      return "#5d35b0";
    break;
    case "dark":
      return "#424141";
    break;
    case "fairy":
      return "#fe7faa";
    break;
  }
  return 0;
}