let pokemonList = [
  { name: 'Ivysaur', height: 1.0, types: ['grass', 'poison'] },
  { name: 'Charmander', height: 0.6, types: ['fire'] },
  { name: 'Squirtle', height: 0.5, types: ['water'] },
  { name: 'Jigglypuff', height: 0.5, types: ['normal', 'fairy'] }
];

// returns pokemon name and height. If height is greater than 1.0 also returns "Wow, that's big!" //
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 1.0) {
     document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
   } else {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!` + '<br>');
   }
}
