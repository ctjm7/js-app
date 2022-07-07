let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Ivysaur', height: 1.0, types: ['grass', 'poison'] },
    { name: 'Charmander', height: 0.6, types: ['fire'] },
    { name: 'Squirtle', height: 0.5, types: ['water'] },
    { name: 'Jigglypuff', height: 0.5, types: ['normal', 'fairy'] }
  ];

  //adds new pokemon and characteristics to list and checks for object
  function add (pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log('Pokemon input is not correct!');
      }
    }

    // returns list of pokemon and characteristics
  function getAll () {
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    // pokemon is assigned to an unordered list
    let listPokemon = document.createElement('li');
    // assigns a button for each pokemon
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-pokemon-list');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    // returns pokemon in console when specific pokemon is clicked on in browser
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  // retrieves pokemon information to be output in console
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    add,
    getAll,
    addListItem
  };
})();

// returns pokemon names in a list as a button
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
