const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    const pokemonList = document.querySelector('.list-group');
    // pokemon is assigned to an unordered list
    const pokemonListItem = document.createElement('li');
    pokemonListItem.classList.add('list-group-item', 'col-6', 'mx-auto', 'border-0');

    // assigns a button for each pokemon
    const pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('btn', 'btn-default', 'btn-block', 'font-weight-bold');
    pokemonButton.setAttribute("data-toggle", "modal");
    pokemonButton.setAttribute("data-target", "#pokemon-modal");

    pokemonListItem.appendChild(pokemonButton);
    pokemonList.appendChild(pokemonListItem);
    // returns pokemon in console when specific pokemon is clicked on in browser
    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // fetches name and url details for pokemon
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function ({results}) {
      results.forEach(function ({name, url}) {
        let pokemon = {
          name: name,
          detailsUrl: url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  // fetches details and image of each pokemon
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // assign image and details to the item
      item.imgUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types.map((type) => type.type.name).join(', ');
      item.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
    }).catch(function (e) {
      console.error(e);
    });
  }

  // retrieves pokemon information to be output in console and modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    console.log(pokemon);
    showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    const modalBody = $('.modal-body');
    const modalTitle = $('.modal-title');

    // clear existing content of modal
    modalTitle.empty();
    modalBody.empty();

    // set elements to be displayed in modal
    const nameElement = $('<h1>' + pokemon.name + '</h1>');
    const imgElement = $('<img class="modal-img" style="width:40%">');
    imgElement.attr('src', pokemon.imgUrl);
    const heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
    const typesElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
    const abilitiesElement = $('<p>' + 'Ablilities : ' + pokemon.abilities + '</p>')

    modalTitle.append(nameElement);
    modalBody.append(imgElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  function clear() {
    document.querySelector('.list-group').innerHTML = '';
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    clear
  };
})();

function searchList() {
  const searchInput = document.querySelector('#input-pokemon').value;
  console.log(searchInput);
  render(searchInput);
  searchInput = '';
}

document.querySelector('#input-pokemon').addEventListener('keydown', function(event) {
  if(event.key === 'Enter') {
    console.log(event);
    event.preventDefault();
    searchList();
  }
});

function render(searchName) {
  pokemonRepository.clear();
  if(searchName) {
    pokemonRepository.getAll().forEach(function(pokemon) {
    if(pokemon.name.includes(searchName)) {
      pokemonRepository.addListItem(pokemon);
    }
  });
  return
  }
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
}

pokemonRepository.loadList().then(function() {
  // now the data is loaded!
  render();
});
