// https://pokeapi.co/api/v2/pokemon/
window.onload=randomRefresh;
const nameContainer=document.getElementById("pokemon-name")
const spriteContainer=document.getElementById("pokemon-sprite");
const textContainer=document.getElementById("pokemon-description");
const textBox=document.getElementById("search")
const apiurl=('https://pokeapi.co/api/v2/pokemon/');

//POKEMON CASUALE AL REFRESH
function randomRefresh(){
  textBox.value=Math.floor(Math.random()*809);
  getPokemon();
}
//INVIO ANCHE FUORI FOCUS
document.addEventListener("keydown", event=>{
  if (event.key==="Enter") getPokemon();
})

//RICHIESTA API OGGETTO POKEMON, SE USATO IL NUMERO POKEDEX SI EVITA LA CONVERSIONE A MINUSCOLO GRAZIE A isNaN
function getPokemon(){
  let name=textBox.value;
  if (isNaN(name)) name=name.toLowerCase();
  fetch(apiurl+name)
  .then(result => result.json())
  .then(data => updateCard(data));
}

//PRIMA LETTERA MAIUSCOLA ATTRAVERSO METODI STRINGA
function CapitalizeFirstLetter(string){
  return (string[0].toUpperCase()+string.slice(1))
}

//AGGIORNAMENTO DELLA CARD CON I NUOVI DATI OTTENUTI
function updateCard(data){
  const pokemonImgurl = data.sprites.other["official-artwork"].front_default;
  spriteContainer.setAttribute("src",pokemonImgurl);
  nameContainer.innerHTML=CapitalizeFirstLetter(data.name);
}