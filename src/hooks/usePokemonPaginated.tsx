import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";

import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';


const usePokemonPaginated = () => {

     const [isLoading, setIsLoading] = useState(true);

     // los pokemos estan en la data -> results
     const [simplePokemonList, setsimplePokemonList] = useState<SimplePokemon[]>([]);

     // en la data viene la informacion de la siguiente pagina
     // "next": "https://pokeapi.co/api/v2/pokemon?offset=40&limit=40",
     // por lo cual, esta siguiente pagina la voy a almacenar en nextPageUrl
     // y como es un useRef no va a disparar una re-renderizacion del resto de componentes
     const nextPageUrl = useRef(`https://pokeapi.co/api/v2/pokemon?limit=40`);


     const loadPokemons = async () => {

          setIsLoading(true);

          const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
          console.log(resp.data.next);
          nextPageUrl.current = resp.data.next;

          mapPokemonListToSimplePokemon(resp.data.results);

     };

     // funcion para transformar la informacion de que llega desde la API results -> SimplePokemon
     const mapPokemonListToSimplePokemon = (pokemonList: Result[]) => {

          const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {

               // "https://pokeapi.co/api/v2/pokemon/1/"
               const urlParts = url.split('/');
               const id = urlParts[urlParts.length - 2]; // obtengo la penultima posicion del arreglo => id
               const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

               return { id, name, picture };
          });

          // Se colocan las dos listas para que se mantenga ambas en el estado,
          // ya que de permanecer solamente newPokemonList => siempre devolvera la ultima resp
          setsimplePokemonList([...simplePokemonList, ...newPokemonList]);

          // una vez termina de cargar la data en este punto
          setIsLoading(false);

     };

     // solo se va a ejecutar una sola vez, cuando el hook se llame
     // cuando llegue al fondo del scroll vuelvo a llamar loadPokemons
     // de esta forma crearemos un infinity scroll
     useEffect(() => {
          loadPokemons();
     }, []);

     return {
          isLoading,
          simplePokemonList,
     };
};

export default usePokemonPaginated;
