let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
    }).then(function ({results}) {
      results.forEach(function ({name, url}) {
        let pokemon = {
          name: name,
          detailsUrl: url
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

  // retrieves pokemon information to be output in console and modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    console.log(pokemon);
    showModal();

    });
  }

  function showModal() {

      // clear existing modal content
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let heightElement = document.createElement('p');
      heightElement.innerHTML = 'Height: ' + pokemon.height;

      let imgElement = document.createElement('img');
      imgElement.src = pokemon.imgUrl;
      imgElement.classList.add('pokemon-image');

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(heightElement);
      modal.appendChild(imgElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
}

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
      }
  });

  modalContainer.addEventListener('click', (e) => {
    // since this is also triggered when clicking INSIDE the modal
    // we only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showModal,
    hideModal
  };
})();

pokemonRepository.loadList().then(function() {
  // now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
