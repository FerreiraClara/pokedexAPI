/**API é como o graçom, faz o transporte entre a parte funcional (backend) e a parte visual (frontend)
 * let é para criar uma variável que pode ter diferentes valores em determinado tempo
 * const vai ser constante, sempre vai ser esse mesmo valor
 */

const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn_prev')
const buttonNext = document.querySelector('.btn_next')

/**referente ao número que vai mudando*/

let searchPokemon = 1

/**asynt await == função assíncrona (quer dizer que essa função está pegando dados a todo momento (novos pokemons)
 * a resposta de uma função assíncrona sempre vai ser await
 * fetch vai fazer uma busca na nossa API externa
 * ${pokemon} == databind, vai variar devido a mudança do pokemon, cada hora vai ser um 
*/

/**logo após é feita uma verificação
 * status === 200 quer dizer que deu certo, não houve nenhum erro durante o percurso
 */

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}` 
    )
    if (APIResponse.status === 200){
        const data = await APIResponse.json()
        return data
    }

}


/**criar função para renderizar esses dados para algum lugar 
 * if (data) == se tem algum pokemon dentro de data
 * pokemonImage.src é questão de documentação, é o que faz a nossa API ser animada
*/

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src =
            data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id
    
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :c'
        pokemonNumber.innerHTML = ''

    }
}

/**event.preventDefault está pegando o valor que foi digitado no input */

form.addEventListener('submit', (event) => {
    event.preventDefault
    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)