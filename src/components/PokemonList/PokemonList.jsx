import {useEffect, useState} from 'react';
import  axios from 'axios';
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'
function PokemonList()
{
    const [pokemonList,setPokemonList] =useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const POKEDEX_url ='https://pokeapi.co/api/v2/pokemon';
    async function downloadPokemons()
    {
        const response = await axios.get(POKEDEX_url); // this downloads list of 20 Pokemons
        const  pokemonResults = response.data.results;// we get the array of pokemons from result
        // console.log(response.data.results);
        // iterating over the array of pokemons, and using their url, 
        // to create an array of promises , that will download those 20
        //pokemons
        const pokemonResultpromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
        // console.log(pokemonResultpromise);
        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultpromise); // array of 20 pokemon d3tailed data
        // console.log(pokemonData);
        // now iterate over the data of each pokemon to and extrcact id,
        //name , image, types
        const pokeListResult=pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return {
                id : pokemon.id,
                name: pokemon.name,
                image : pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        })
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false)
    }
    
    useEffect(()=>{
        downloadPokemons();
    },[]);
    
return(
    <div className='pokemon-list-wrapper'>
   <div className='pokemon-wrapper'>
        { (isLoading) ? 
          'Loading...' :
          pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)
        }
   </div>
   <div className='controls'>
    <button>Prev</button>
    <button>Next</button>
   </div>
   
    </div>
)
}
export default PokemonList;