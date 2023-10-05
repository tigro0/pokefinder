// https://pokeapi.co/api/v2/pokemon/
window.onload=randomRefresh;
const nameContainer=document.getElementById("pokemon-name")
const spriteContainer=document.getElementById("pokemon-sprite");
const textContainer=document.getElementById("pokemon-description");
const apiurl=('https://pokeapi.co/api/v2/pokemon/');

function randomRefresh(){
  document.getElementById("search").value=Math.floor(Math.random()*809)
  getPokemon()
}

function getPokemon(){
  fetch(apiurl+document.getElementById("search").value)
  .then(result => result.json())
  .then(data => updateCard(data))
}

function updateCard(data){
  const pokemonImgurl = data.sprites.other["official-artwork"].front_default;
  spriteContainer.setAttribute("src",pokemonImgurl)
  nameContainer.innerHTML=data.name;
}