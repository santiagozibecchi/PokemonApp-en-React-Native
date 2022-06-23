import { useEffect, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";

import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';


const usePokemonSearch = () => {

     const [isFetching, setIsFetching] = useState(true);
     const [simplePokemonList, setsimplePokemonList] = useState<SimplePokemon[]>([]);

     const loadPokemons = async () => {
          setIsFetching(true);
          const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
          mapPokemonListToSimplePokemon(resp.data.results);
     };

     const mapPokemonListToSimplePokemon = (pokemonList: Result[]) => {

          const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {

               const urlParts = url.split('/');
               const id = urlParts[urlParts.length - 2];
               const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

               return { id, name, picture };
          });

          setsimplePokemonList(newPokemonList);
          setIsFetching(false);
     };

     useEffect(() => {
          loadPokemons();
     }, []);

     return {
          isFetching,
          simplePokemonList,
     };
};

export default usePokemonSearch;
