import { View, Text, Platform, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import PokemonCard from '../components/PokemonCard';
import { styles } from '../theme/appTheme';
import Loading from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import PokeNotFound from '../components/PokeNotFound';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {

     const { top } = useSafeAreaInsets();
     const { isFetching, simplePokemonList } = usePokemonSearch();

     // Arreglo de pokemon para el buscador
     const [pokeFilter, setPokeFilter] = useState<SimplePokemon[]>([]);

     // para la busqueda del termino
     const [term, setTerm] = useState('');

     useEffect(() => {

          if (term.length === 0) {
               setPokeFilter([]);
          }
          // Si no es un numero busco por STRING
          // isNaN -> Si no es un numero
          if (isNaN(Number(term))) {
               setPokeFilter(
                    simplePokemonList.filter(
                         (poke) => poke.name.toLocaleLowerCase()
                              .includes(term.toLocaleLowerCase())
                    )
               );
          } else {
               const pokemonById = simplePokemonList.find((poke) => poke.id === term);
               setPokeFilter((pokemonById) ? [pokemonById] : []);
          }
          // [simplePokemonList.find((poke) => poke.id === term)!]


     }, [term]);


     if (isFetching) {
          return <Loading />;
     }

     return (
          <View style={{
               flex: 1,
               // marginTop: (Platform.OS === 'ios') ? top : top + 10,
               marginHorizontal: 10,
          }}>

               <SearchInput
                    onDebounde={(value) => setTerm(value)}
                    style={{
                         position: 'absolute',
                         zIndex: 9999,
                         width: screenWidth - 20,
                         top: (Platform.OS === 'ios') ? top : top + 15,
                    }}
               />

               {
                    (term && pokeFilter.length === 0)
                         ? <PokeNotFound />
                         : <FlatList
                              data={pokeFilter}
                              keyExtractor={(pokemon) => pokemon.id}
                              showsVerticalScrollIndicator={false}
                              numColumns={2}

                              // Header
                              ListHeaderComponent={(
                                   <Text style={{
                                        ...styles.title,
                                        ...styles.globalMargin,
                                        top: top + 5,
                                        paddingBottom: 10,
                                        marginTop: top + 55,
                                   }}>
                                        {term}
                                   </Text>
                              )}

                              renderItem={({ item }) => (<PokemonCard pokemon={item} />)}

                         />
               }


          </View>
     );
};

export default SearchScreen;
