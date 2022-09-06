let API_LIST_PKMN = "https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0"
let btnAtras = document.getElementById('btnAtras');
let btnNext = document.getElementById('btnNext');


async function getListPkmn(url){
    try {
    let consulta = await fetch(url);
    let respuestaJson = await consulta.json()
    console.log(respuestaJson);
    if(respuestaJson.next){
        btnNext.style.display = "block";
        btnNext.dataset.url = respuestaJson.next
    } else{
        btnNext.style.display = "none";
    }
    
    if(respuestaJson.previous === null){
        btnAtras.style.display = "none"
    }else{
        btnAtras.style.display = "block"
        btnAtras.dataset.url = respuestaJson.previous
    }
    getPokemon(respuestaJson.results);
    } catch (error) {
        console.log(error);
    }
    
}
getListPkmn(API_LIST_PKMN);


let boxCartas = document.querySelector('.box-card')

const getPokemon = async(data) =>{
    console.log(data);
    boxCartas.innerHTML = ''
    data.forEach(async (pokemon) => {
    let consulta = await fetch(pokemon.url);
    let respuestaJson = await consulta.json()
    let boxcard = document.createElement('div');
    boxcard.dataset.nombre = respuestaJson.name
    boxcard.classList.add('card',`${respuestaJson.types[0].type.name}`);
    boxcard.innerHTML = `<h5 class="card-num">#${respuestaJson.id}</h5>
    <img src="${respuestaJson.sprites.other.dream_world.front_default}" alt="" class="img-card">
    <div>
        <h4>${respuestaJson.name.toUpperCase()}</h4>
        <div id="type-pokemon">
        <div class="type-card ${respuestaJson.types[0].type.name}">${respuestaJson.types[0].type.name.toUpperCase()}</div>
        </div>
    </div>`;
    boxCartas.appendChild(boxcard)
    });
    
}


let contendorBtn = document.getElementById("buttons");

contendorBtn.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-paginacion')){
        let value = e.target.dataset.url
        console.log(value);
        getListPkmn(value);
    }
})





boxCartas.addEventListener('click', (e) => {
    if(e.target.classList.contains('card','img-card')){
    let value = e.target.dataset.nombre
    searchPokemonByName(value);
    }
})

