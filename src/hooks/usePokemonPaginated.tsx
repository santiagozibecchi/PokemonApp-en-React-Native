import { useEffect, useRef } from "react";
import { pokemonApi } from "../api/pokemonApi";


const usePokemonPaginated = () => {

     // en la data viene la informacion de la siguiente pagina
     // "next": "https://pokeapi.co/api/v2/pokemon?offset=40&limit=40",
     // por lo cual, esta siguiente pagina la voy a almacenar en nextPageUrl 
     // y como es un useRef no va a disparar una re-renderizacion del resto de componentes
     const nextPageUrl = useRef(`https://pokeapi.co/api/v2/pokemon?limit=40`);


     const loadPokemons = async () => {

          const resp = await pokemonApi.get(nextPageUrl.current);
          console.log(resp.data);

     };

     // solo se va a ejecutar una sola vez, cuando el hook se llame
     useEffect(() => {
          loadPokemons();
     }, []);

     return {
     };
};

export default usePokemonPaginated;
