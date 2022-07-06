let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Ivysaur', height: 1.0, types: ['grass', 'poison'] },
    { name: 'Charmander', height: 0.6, types: ['fire'] },
    { name: 'Squirtle', height: 0.5, types: ['water'] },
    { name: 'Jigglypuff', height: 0.5, types: ['normal', 'fairy'] }
  ];
// adds new pokemon to list
  function add (pokemon){
    pokemonList.push(pokemon);
  }
  // returns list of pokemon and characteristics
  function getAll () {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll
  };
})();
// returns pokemon name and height. If height is greater than 1.0 also returns "Wow, that's big!" //
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height < 1.0) {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')' + '<br>');
  } else {
   document.write(`${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!` + '<br>');
  }
});
