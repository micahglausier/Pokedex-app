//pokemon list variable//
let pokemonList = [
    //add Pokemon Objects, with Keys: name, height, and types//
    {name: 'Bulbasaur', height: '0.7', type: ['grass', 'poison']},
    {name: 'Kangaskhan', height: '2.2', type: ['normal']},
    {name: 'Gastly', height: '1.3', type: ['ghost', 'poison']},
    {name: 'Golem', height: '1.4', type: ['rock', 'ground']},
    {name: 'Caterpie', height: '1', type: ['worm']}
]

for (let i = 0; i <pokemonList.length; i++){
    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height +")");
if (pokemonList[i].height >= 1.5) {
    document.write(' - Wow! that is a big Pokemon!') + "</p>"
    }
}
