//pokemon list variable//
let pokemonList = [
    //add Pokemon Objects, with Keys: name, height, and types//
    {name: 'Bulbasaur', height: '0.7', type: ['grass', 'poison']},
    {name: 'Kangaskhan', height: '2.2', type: ['normal']},
    {name: 'Gastly', height: '1.3', type: ['ghost', 'poison']},
    {name: 'Golem', height: '1.4', type: ['rock', 'ground']},
    {name: 'Caterpie', height: '1', type: ['worm']}
]

let pokemonList2 = [
    // different set of Pokémon objects
    {name: 'Butterfree', height: '3.07', type: ['bug', 'flying']},
    {name: 'Nidoking', height: '4.07', type: ['ground', 'poison']},
    {name: 'Blastoise', height: '5.03', type: ['water']},
    {name: 'Ninetales', height: '3.07', type: ['fire']},
    {name: 'Pikachu', height: '1.04', type: ['electric']}
  ];

//printArrayDetails function declaration
function printArrayDetails(list){
    for (let i = 0; i < list.length; i++) {
        document.write("<p>" + list[i].name + " (height: " + list[i].height +")");
        if (list[i].height >= 1.5) {
            document.write(' - Wow! that is a big Pokemon!') + "</p>"  
        }
    }
}


// Calling printArrayDetails function twice
printArrayDetails(pokemonList);
printArrayDetails(pokemonList2);

//for (let i = 0; i <pokemonList.length; i++){
//    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height +")");
//if (pokemonList[i].height >= 1.5) {
//    document.write(' - Wow! that is a big Pokemon!') + "</p>"
//    }
//}

