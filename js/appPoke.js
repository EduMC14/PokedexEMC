
let imgPoke = document.getElementById('img-pkmn');
let namePoke = document.getElementById('name-pkmn');
let typePoke = document.getElementById('type-pkmn');
let numPoke = document.getElementById('num-pkmn')
let btnSearch = document.getElementById('btnPoke');
let btnCerrar = document.getElementById('btn-cerrar');
let inputPokemon = document.getElementById('inputPoke')
let peso = document.getElementById('peso-pkmn');
let altura =  document.getElementById('altura-pkmn');
let card = document.querySelector('.card-pkmn');
let fondoPoke = document.querySelector('.pkmn__container');
let boxNotFound = document.querySelector('.box-not-found');
let btnNotFound = document.getElementById('btn-cerrar-not');

btnCerrar.addEventListener('click', () => {
    card.style.display = 'none';
})

btnNotFound.addEventListener('click', () => {
    boxNotFound.style.display = 'none';
})

btnSearch.addEventListener('click', () =>{
    searchPokemonByName(inputPokemon.value)
});
    


const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


    function searchPokemonByName(nombre){
        if(nombre){
            fetch(URL_POKEMON + nombre.toLowerCase()).then(data => data.json()).then(data => {
                console.log(data);
                card.style.display = 'block'
                const {name , sprites, types , stats, height , weight} = data;
                namePoke.textContent = name.toUpperCase();
                imgPoke.setAttribute('src', sprites.other.dream_world.front_default);
                numPoke.innerHTML = `N° ${data.id}`;
                peso.textContent = weight;
                altura.textContent = height;
                SetColorByType(types);
                paintTypeByColor(types);
                paintStats(stats);
            }).catch((error) => {
                boxNotFound.style.display = "block";
            })
        }else{
            
        }
        
};


function SetColorByType(types){
    let colorOne = typeColors[types[0].type.name];
    let colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    fondoPoke.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    fondoPoke.style.backgroundSize = ' 5px 5px';
}


function paintTypeByColor(types){
    typePoke.innerHTML = '';
    types.forEach(element => {
        const boxType = document.createElement('div')
        boxType.style.backgroundColor = typeColors[element.type.name];
        let MayusType = element.type.name.toUpperCase()
        boxType.textContent = MayusType;
        boxType.classList.add('type')
        typePoke.appendChild(boxType);
    });
}

let containerStats = document.getElementById('box-stats')
let hp = document.getElementById('hp-pkmn')

function paintStats(stats){
    hp.textContent = `HP ${stats[0].base_stat}/100`
    containerStats.textContent = '';
    for (let index = 1; index < stats.length; index++) {
        let box = document.createElement('div');
        box.classList.add('box-stats-pokemon')
        let transform = stats[index].stat.name.toUpperCase();
        box.innerHTML += `<p class="text-stat">${transform}</p><span class="text-val">${stats[index].base_stat}</span>`
        containerStats.appendChild(box);
    }
}


