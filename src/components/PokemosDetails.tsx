import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { PokemonFull, Sprites } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
     pokemon: PokemonFull;
}

const PokemosDetails = ({ pokemon }: Props) => {



     return (
          <ScrollView
               showsVerticalScrollIndicator={false}
               style={{
                    ...StyleSheet.absoluteFillObject, // Tomo toda la pantalla
               }}
          >
               {/* Types y peso */}
               <View style={{
                    ...styles.container,
                    marginTop: 290,
               }}>
                    <Text style={styles.title}>Tipos</Text>
                    <View style={{
                         flexDirection: 'row',
                    }}>
                         {
                              pokemon.types.map(({ type }) => (
                                   <Text
                                        style={{ ...styles.regularText, marginRight: 5 /* backgroundColor: 'red' */ }}
                                        key={type.name}
                                   >
                                        {type.name[0].toLocaleUpperCase() + type.name.slice(1)}
                                   </Text>
                              ))
                         }
                    </View>

                    <Text style={styles.title}>Peso</Text>
                    <Text style={styles.regularText}>{pokemon.weight}kg</Text>


               </View>

               {/* Sprites */}
               <View style={{
                    ...styles.container,
               }}>
                    <Text style={styles.title}>Sprites</Text>
               </View>

               {/* Tambien se puede hacer con ScrollView - lista horizontal*/}
               <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
               >
                    <FadeInImage
                         uri={pokemon.sprites.front_default}
                         style={styles.basicSprite}
                    />
                    <FadeInImage
                         uri={pokemon.sprites.back_default}
                         style={styles.basicSprite}
                    />
                    <FadeInImage
                         uri={pokemon.sprites.front_shiny}
                         style={styles.basicSprite}
                    />
                    <FadeInImage
                         uri={pokemon.sprites.back_shiny}
                         style={styles.basicSprite}
                    />
               </ScrollView>

               {/* Habilidades */}
               <View style={{
                    ...styles.container,
               }}>
                    <Text style={styles.title}>Habilidades base</Text>
                    <View style={{
                         flexDirection: 'row',
                    }}>
                         {
                              pokemon.abilities.map(({ ability }) => (
                                   <Text
                                        style={{ ...styles.regularText, marginRight: 5 /* backgroundColor: 'red' */ }}
                                        key={ability.name}
                                   >
                                        {ability.name[0].toLocaleUpperCase() + ability.name.slice(1)}
                                   </Text>
                              ))
                         }
                    </View>
               </View>

               {/* Movimientos */}
               <View style={{
                    ...styles.container,
               }}>
                    <Text style={styles.title}>Movimientos</Text>
                    <View style={{
                         flexDirection: 'row',
                         flexWrap: 'wrap',
                    }}>
                         {
                              pokemon.moves.map(({ move }) => (
                                   <Text
                                        style={{ ...styles.regularText, marginRight: 5 /* backgroundColor: 'red' */ }}
                                        key={move.name}
                                   >
                                        {move.name[0].toLocaleUpperCase() + move.name.slice(1)}
                                   </Text>
                              ))
                         }
                    </View>
               </View>

               {/* Stats */}
               <View style={{
                    ...styles.container,
               }}>
                    <Text style={styles.title}>Propiedades</Text>
                    <View>
                         {
                              pokemon.stats.map((stat, i) => (
                                   <View
                                        style={{
                                             flexDirection: 'row',
                                        }}
                                        key={stat.stat.name + i}
                                   >
                                        <Text
                                             style={{
                                                  ...styles.regularText,
                                                  marginRight: 5,
                                                  width: 100,
                                             }}
                                        >
                                             {stat.stat.name[0].toLocaleUpperCase() + stat.stat.name.slice(1)}
                                        </Text>

                                        <Text
                                             style={{ ...styles.regularText, fontWeight: 'bold' }}
                                        >
                                             {stat.base_stat}
                                        </Text>
                                   </View>
                              ))
                         }
                    </View>

                    {/* Sprite final */}
                    <View style={{
                         marginBottom: 10,
                         alignItems: 'center',
                    }}>
                         <FadeInImage
                              uri={pokemon.sprites.front_shiny}
                              style={styles.basicSprite}
                         />
                    </View>

               </View>

          </ScrollView>
     );
};

const styles = StyleSheet.create({
     container: {
          marginHorizontal: 20,
     },
     title: {
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 10,
     },
     regularText: {
          fontSize: 16,
     },
     basicSprite: {
          width: 100,
          height: 100,
     }
});

export default PokemosDetails;
