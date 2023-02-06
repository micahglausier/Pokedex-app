let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    //load a list of pokemon from api. Promise fetch function.
    function loadList() {
        return fetch(apiUrl).then(function(response) {
            // convert response to json
            return response.json();
        }).then(function(json) {
            // api uses 'results' for array of pokemon. Each result, we are calling item. For each item, we assign keys to parameters (items from api)
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                // add function which pushes pokemon if it is object, and has name
                add(pokemon);
            });
            // if any error occurs, it will be cought right here
        }).catch(function(e) {
            console.error(e);
        })
    }


    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function() {
            let modalContainer = document.querySelector('#modal-container');

            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            let sprite = document.createElement('img');
            sprite.classList.add('sprite');
            sprite.src = item.imageUrl;

            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'X';
            closeButtonElement.addEventListener('click', hideModal)

            let titleElement = document.createElement('h1');
            titleElement.innerText = (item.name);

            let contentElement = document.createElement('p');

            // variable declared as empty string to be used to store the names of the types
            let pokemonTypes = "";

            // for loop used to iterate through the item.types object.
            for (let i = 0; i < item.types.length; i++) {
                //name of the current type is concatenated to the typeNames variable (appending to the end of the string)
                pokemonTypes += item.types[i].type.name;
                //if i is less than length - 1, a comma and space are added to typeNames (to avoid adding comma after las type)
                if (i < item.types.length - 1) {
                    pokemonTypes += ", ";
                }
            }

            // value of typeNames is then assigned to the innertext property of contentElement.
            contentElement.innerText = ('Height: ' + item.height + '\n' + '\n' + 'Types: ' + pokemonTypes);


            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modalContainer.appendChild(modal);
            modal.appendChild(sprite);


            modalContainer.classList.add('is-visible');


            function hideModal() {
                modalContainer.classList.remove('is-visible');
            }

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                    hideModal();
                }
            });

            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            });

            document.querySelector('button.button-class').addEventListener('click', () => {
                showDetails('Modal Title', 'Modal Content');
            });

        });

    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();




pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
