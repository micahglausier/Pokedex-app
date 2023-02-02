let pokemonRepository = (function () {
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
        return fetch(apiUrl).then (function (response) {
            // convert response to json
            return response.json();
        }).then (function (json) {
            // api uses 'results' for array of pokemon. Each result, we are calling item. For each item, we assign keys to parameters (items from api)
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                // add function which pushes pokemon if it is object, and has name
                add(pokemon);
            });
            // if any error occurs, it will be cought right here
        }) .catch(function (e) {
            console.error (e);
        })
    }
    
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }
  
    function showDetails (item) {
        pokemonRepository.loadDetails(item).then (function () {
            let modalContainer = document.querySelector ('#modal-container');
    
                modalContainer.innerHTML = '';
    
                let modal = document.createElement('div');
                modal.classList.add ('modal');
    
                let sprite = document.createElement('img');
                sprite.classList.add ('sprite');
                sprite.src = item.imageUrl;
    
                let closeButtonElement = document.createElement ('button');
                closeButtonElement.classList.add('modal-close');
                closeButtonElement.innerText = 'X';
                closeButtonElement.addEventListener ('click', hideModal)
    
                let titleElement = document.createElement ('h1');
                titleElement.innerText =  (item.name);
    
                let contentElement = document.createElement ('p');
    
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
                contentElement.innerText =('Height: ' + item.height + '\n' +  '\n' + 'Types: ' + pokemonTypes);
    
    
                modal.appendChild (closeButtonElement);
                modal.appendChild (titleElement);
                modal.appendChild (contentElement);
                modalContainer.appendChild (modal);
                modal.appendChild (sprite);
    
    
                modalContainer.classList.add('is-visible');
    
        
            function hideModal (){
                modalContainer.classList.remove ('is-visible');
            }
    
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
                  hideModal();
                }
              });
    
            modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
            });
    
            document.querySelector ('button.button-class').addEventListener('click', () => {
                showDetails ('Modal Title', 'Modal Content');
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
  
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  
  
  

// //pokemon Repository IIFE
// let pokemonRepository = (function () {
//     let pokemonList = [];
//     let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    
//     //old pokemonList Variable
//     // let pokemonList = [
//     //     //add Pokemon Objects, with Keys: name, height, and types//
//     //     { name: "Bulbasaur", height: "0.7", type: ["grass", "poison"] },
//     //     { name: "Kangaskhan", height: "2.2", type: ["normal"] },
//     //     { name: "Gastly", height: "1.3", type: ["ghost", "poison"] },
//     //     { name: "Golem", height: "1.4", type: ["rock", "ground"] },
//     //     { name: "Caterpie", height: "1", type: ["worm"] },
//     //     { name: "Butterfree", height: "3.07", type: ["bug", "flying"] },
//     //     { name: "Nidoking", height: "4.07", type: ["ground", "poison"] },
//     //     { name: "Blastoise", height: "5.03", type: ["water"] },
//     //     { name: "Ninetales", height: "3.07", type: ["fire"] },
//     //     { name: "Pikachu", height: "1.04", type: ["electric"] },
//     // ]
// //return functions
//     return {
//         add: function(pokemon){
//             pokemonList.push(pokemon);
//         },
//         getAll: function () {
//             return pokemonList;
//         },
//     };

// //adds pokemon and validates typeof
//     function add(pokemon) {
//         if (
//         typeof pokemon === "object" &&
//         "name" in pokemon
//         ) {
//         pokemonList.push(pokemon);
//         } else {
//         console.log("pokemon is not correct");
//         }
//     }

//       function addListItem(pokemon){
//         let pokemonList = document.querySelector(".pokemon-list");
//         let listpokemon = document.createElement("li");
//         let button = document.createElement("button");
//         button.innerText = pokemon.name;
//         button.classList.add("button-class")
//         listpokemon.appendChild(button);
//         pokemonList.appendChild(listpokemon);
//         // Create an event listener to every button  
//         button.addEventListener('click', function (event) {
//             showDetails(pokemon);
//         })
//       }   
        
//       pokemonRepository.getAll().forEach(function(pokemon) {
//         let pokemonList = document.querySelector(".pokemon-list");
//         if (!pokemonList) {
//           pokemonList = document.createElement("ul");
//           pokemonList.classList.add("pokemon-list");
//           document.body.appendChild(pokemonList);
//         }
//         {
//             return pokemonList
//         };

//         let listpokemon = document.createElement("li");
//         let button = document.createElement("button");
//         button.innerText = pokemon.name;
//         button.classList.add("button-class");
//         listpokemon.appendChild(button);
//         pokemonList.appendChild(listpokemon);
//         buttonSelect.addEventListener('click', function (event) {
//             showDetails(pokemon);
//         });  
//       });

//       //showDetails function
//       function showDetails(pokemon){
//             console.log(pokemon.name)
//         };
    

// //filters pokemon by name
//         function filterPokemonByName(name) {
//             let result = getAll().filter((pokemon) => pokemon.name == name);
//             return result[0];   // starting index of 0
//         };

//         function loadDetails(item) {
//             let url = item.detailsUrl;
//             return fetch(url).then(function (response) {
//               return response.json();
//             }).then(function (details) {
//               // Now we add the details to the item
//               item.imageUrl = details.sprites.front_default;
//               item.height = details.height;
//               item.types = details.types;
//             }).catch(function (e) {
//               console.error(e);
//             });
//           }
//           function showDetails(pokemon) {
//             loadDetails(pokemon).then(function () {
//               console.log(pokemon);
//             });
//           }

//           return {
//             add: add,
//             getAll: getAll,
//             loadList: loadList,
//             loadDetails: loadDetails,
//             addListItem: addListItem,
//             showDetails: showDetails
//           };
//     })();
         


// // (forEach) function added to replace (for) function
// pokemonRepository.loadList().then(function(){
//     pokemonRepository.getAll().forEach(function(pokemon) {
//         pokemonRepository.addListItem(pokemon);
// });
// });




//old for function replaced with forEach
//printArrayDetails function declaration
// function printArrayDetails(list) {
//     for (let i = 0; i < list.length; i++) {
//         document.write("<p>" + list[i].name + " (height: " + list[i].height + ")");
//         if (list[i].height >= 1.5) {
//             document.write(" - Wow! that is a big Pokemon!") + "</p>";
//         }
//     }
// }

// Calling printArrayDetails function twice
//printArrayDetails(pokemonList);
//printArrayDetails(pokemonList2);


//for (let i = 0; i <pokemonList.length; i++){
//    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height +")");
//if (pokemonList[i].height >= 1.5) {
//    document.write(' - Wow! that is a big Pokemon!') + "</p>"