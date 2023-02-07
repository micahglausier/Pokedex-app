let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function addToPokemonList(pokemonFromApi) {
		pokemonList.push(pokemonFromApi);
	}

	function getPokemonListContents() {
		return pokemonList;
	}
	// Loads initial object of name and detailsUrl and adds it to the pokemonList
	function loadDataFromApi() {
		return fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				data.results.forEach((item) => {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					addToPokemonList(pokemon);
				});
			})
			.catch((err) => console.error(err));
	}
	// Loads the auxiliary details as key/value pairs for each Pokemon and stores it in the pokemonList
	function loadDetails(listItem) {
		let url = listItem.detailsUrl;
		return fetch(url)
			.then((response) => response.json())
			.then((data) => {
				listItem.abilities = data.abilities;
				listItem.height = data.height;
				listItem.weight = data.weight;
				listItem.imageUrl = data.sprites.other.dream_world.front_default;
				listItem.imageUrlAnimation = data.sprites.versions['generation-v']['black-white'].animated.front_default;
				listItem.types = [];
				data.types.forEach(function (itemType) {
					listItem.types.push(itemType.type.name);
				});
				listItem.abilities = [];
				data.abilities.forEach(function (itemAbility) {
					listItem.abilities.push(itemAbility.ability.name);
				});
			})
			.catch((err) => console.error(err));
	}
	// Renders loaded content to the page in the form of cards
	function addToDom(pokemon) {
		loadDetails(pokemon).then(() => {
			let pokemonGrid = document.querySelector('.pokemon-grid');
			let card = document.createElement('div');
			card.classList.add('card', 'text-center', 'bg-light', 'm-1', 'flex-grow-0', 'border', 'border-warning');
			card.setAttribute('style', 'max-width: 33%');
			card.setAttribute('style', 'min-width: 200px');

			let cardImg = document.createElement('img');
			cardImg.classList.add('card-img-top', 'card-image', 'w-50', 'h-50', 'mx-auto', 'my-3');
			cardImg.setAttribute('src', pokemon.imageUrlAnimation);
			cardImg.setAttribute('alt', 'gif of Pokemon');

			let cardBody = document.createElement('div');
			cardBody.classList.add('card-body');

			let modalButton = document.createElement('button');
			modalButton.innerText = pokemon.name;
			modalButton.classList.add(
				'btn',
				'btn-primary',
				'btn-lg',
				'text-capitalize',
				'text-warning',
				'bg-secondary',
				'border',
				'border-warning'
			);
			modalButton.setAttribute('type', 'button');
			modalButton.setAttribute('data-toggle', 'modal');
			modalButton.setAttribute('data-target', '#ModalCenter');

			cardBody.appendChild(modalButton);
			card.appendChild(cardImg);
			card.appendChild(cardBody);
			pokemonGrid.appendChild(card);

			modalButton.addEventListener('click', function () {
				showModal(pokemon);
			});
		});
	}

	function showModal(pokemon) {
		let modalBody = document.querySelector('.modal-body');
		modalBody.classList.add('text-center');
		let modalTitle = document.querySelector('.modal-title');
		modalBody.innerHTML = '';
		modalTitle.innerHTML = '';

		let name = document.createElement('h1');
		name.innerText = pokemon.name;
		name.classList.add('text-capitalize');

		let spriteElement = document.createElement('img');
		spriteElement.setAttribute('src', pokemon.imageUrl);
		spriteElement.classList.add('text-center', 'w-50');

		let capitalisedName = pokemon.name[0].toUpperCase().concat(pokemon.name.slice(1));
		let stringifiedTypes = pokemon.types.join(', and ');
		let stringifiedAbilities = pokemon.abilities.join(', and ');
		// The API provided an erroneus value for height, value is missing a "." to denote height in meters (example: 11, instead of 1.1) so I corrected it with the below code after checking the true height on pokemon.com which is displayed there in feet.
		let correctHeight = function () {
			heightFromApi = pokemon.height.toString();

			if (heightFromApi.length < 2) {
				heightFromApi = '0.' + heightFromApi;
			} else {
				heightFromApi = heightFromApi[0] + '.' + heightFromApi[1];
			}
			return heightFromApi;
		};

		let paragraph = document.createElement('p');
		paragraph.innerText = `${capitalisedName} is a Pokemon of type[s]: ${stringifiedTypes} and has a height of ${correctHeight()} meters. Its abilities are: ${stringifiedAbilities}.`;
		paragraph.classList.add('mt-3');

		modalTitle.appendChild(name);
		modalBody.appendChild(spriteElement);
		modalBody.appendChild(paragraph);
	}

	return {
		addToPokemonList: addToPokemonList,
		getPokemonListContents: getPokemonListContents,
		loadDataFromApi: loadDataFromApi,
		loadDetails: loadDetails,
		addToDom: addToDom,
	};
})();

pokemonRepository.loadDataFromApi().then(function () {
	pokemonRepository.getPokemonListContents().forEach((pokemon) => {
		pokemonRepository.addToDom(pokemon);
	});
});

function searchByName() {
	let input, filter, gridContainer, cards, a, txtValue;
	input = document.getElementById('myInput');
	filter = input.value.toUpperCase();
	gridContainer = document.getElementById('pokemon-grid');
	cards = gridContainer.querySelectorAll('.card');
	console.log(cards);
	for (i = 0; i < cards.length; i++) {
		a = cards[i].querySelector('.card-body').querySelector('.btn');

		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			cards[i].style.display = '';
		} else {
			cards[i].style.display = 'none';
		}
	}
}

let inputElement = document.querySelector('#myInput');
inputElement.addEventListener('keyup', searchByName);

let clearSearchButton = document.querySelector('#clear-search');
clearSearchButton.addEventListener('click', function () {
	inputElement.value = '';
	inputElement.dispatchEvent(new KeyboardEvent('keyup'));
});



// let pokemonRepository = (function() {
//     let pokemonList = [];
//     let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//     let pokemonListElement = $('.pokemon-list');

//     function add(pokemon) {
//         if (
//             typeof pokemon === "object" &&
//             "name" in pokemon
//         ) {
//             pokemonList.push(pokemon);
//         } else {
//             console.log("pokemon is not correct");
//         }
//     }

//     function getAll() {
//         return pokemonList;
//     }

//     function addListItem(pokemon) {
//         let pokemonList = document.querySelector(".pokemon-list");
//         let listpokemon = document.createElement("li");
//         let button = document.createElement("button");
//         button.innerText = pokemon.name;
//         button.classList.add("button-class");
//         listpokemon.appendChild(button);
//         pokemonList.appendChild(listpokemon);
//         button.addEventListener("click", function(event) {
//             showDetails(pokemon);
//         });
//     }

//     //load a list of pokemon from api. Promise fetch function.
//     function loadList() {
//         return fetch(apiUrl).then(function(response) {
//             // convert response to json
//             return response.json();
//         }).then(function(json) {
//             // api uses 'results' for array of pokemon. Each result, we are calling item. For each item, we assign keys to parameters (items from api)
//             json.results.forEach(function(item) {
//                 let pokemon = {
//                     name: item.name,
//                     detailsUrl: item.url
//                 };
//                 // add function which pushes pokemon if it is object, and has name
//                 add(pokemon);
//             });
//             // if any error occurs, it will be cought right here
//         }).catch(function(e) {
//             console.error(e);
//         })
//     }


//     function loadDetails(item) {
//         let url = item.detailsUrl;
//         return fetch(url).then(function(response) {
//             return response.json();
//         }).then(function(details) {
//             item.imageUrl = details.sprites.front_default;
//             item.height = details.height;
//             item.types = details.types;
//         }).catch(function(e) {
//             console.error(e);
//         });
//     }

//     function showDetails(item) {
//         pokemonRepository.loadDetails(item).then(function() {
//             let modalContainer = document.querySelector('#modal-container');

//             modalContainer.innerHTML = '';

//             let modal = document.createElement('div');
//             modal.classList.add('modal');

//             let sprite = document.createElement('img');
//             sprite.classList.add('sprite');
//             sprite.src = item.imageUrl;

//             let closeButtonElement = document.createElement('button');
//             closeButtonElement.classList.add('modal-close');
//             closeButtonElement.innerText = 'X';
//             closeButtonElement.addEventListener('click', hideModal)

//             let titleElement = document.createElement('h1');
//             titleElement.innerText = (item.name);

//             let contentElement = document.createElement('p');

//             // variable declared as empty string to be used to store the names of the types
//             let pokemonTypes = "";

//             // for loop used to iterate through the item.types object.
//             for (let i = 0; i < item.types.length; i++) {
//                 //name of the current type is concatenated to the typeNames variable (appending to the end of the string)
//                 pokemonTypes += item.types[i].type.name;
//                 //if i is less than length - 1, a comma and space are added to typeNames (to avoid adding comma after las type)
//                 if (i < item.types.length - 1) {
//                     pokemonTypes += ", ";
//                 }
//             }

//             // value of typeNames is then assigned to the innertext property of contentElement.
//             contentElement.innerText = ('Height: ' + item.height + '\n' + '\n' + 'Types: ' + pokemonTypes);


//             modal.appendChild(closeButtonElement);
//             modal.appendChild(titleElement);
//             modal.appendChild(contentElement);
//             modalContainer.appendChild(modal);
//             modal.appendChild(sprite);


//             modalContainer.classList.add('is-visible');


//             function hideModal() {
//                 modalContainer.classList.remove('is-visible');
//             }

//             window.addEventListener('keydown', (e) => {
//                 if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//                     hideModal();
//                 }
//             });

//             modalContainer.addEventListener('click', (e) => {
//                 let target = e.target;
//                 if (target === modalContainer) {
//                     hideModal();
//                 }
//             });

//             document.querySelector('button.button-class').addEventListener('click', () => {
//                 showDetails('Modal Title', 'Modal Content');
//             });

//         });

//     }


//     return {
//         add: add,
//         getAll: getAll,
//         addListItem: addListItem,
//         loadList: loadList,
//         loadDetails: loadDetails,
//         showDetails: showDetails
//     };
// })();




// pokemonRepository.loadList().then(function() {
//     pokemonRepository.getAll().forEach(function(pokemon) {
//         pokemonRepository.addListItem(pokemon);
//     });
// });
