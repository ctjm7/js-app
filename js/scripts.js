let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  //adds new pokemon and characteristics to list and checks for object
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log('Pokemon input is not correct!');
      }
    }

  // returns list of pokemon and characteristics
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    // pokemon is assigned to an unordered list
    let pokemonListItem = document.createElement('li');
    // assigns a button for each pokemon
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-pokemon-list');
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    // returns pokemon in console when specific pokemon is clicked on in browser
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // fetches name and url details for pokemon
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  // fetches details and image of each pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // assign image and details to the item
      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // retrieves pokemon information to be output in console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    console.log(pokemon);
    });
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
