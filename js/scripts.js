//pokemon list variable//
let pokemonList = [
    //add Pokemon Objects, with Keys: name, height, and types//
    {name: 'Bulbasaur', height: '0.7', type: ['grass', 'poison']},
    {name: 'Kangaskhan', height: '2.2', type: ['normal']},
    {name: 'Gastly', height: '1.3', type: ['ghost', 'poison']} 
]

for (let i = 0; i <pokemonList.length; i++){
    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height +")");
    if (pokemonList[i].height >= 1) {
        console.log('Wow! that is a big Pokemon!') + "</p>"
    }
}
