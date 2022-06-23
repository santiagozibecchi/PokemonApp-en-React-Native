import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/navigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import usePokemon from '../hooks/usePokemon';
import PokemosDetails from '../components/PokemosDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

const PokemonScreen = ({ navigation, route }: Props) => {

     const { SimplePokemon, color } = route.params;
     const { id, name, picture } = SimplePokemon;
     const { top } = useSafeAreaInsets();

     const { isLoading, pokemon } = usePokemon(id);

     return (
          <View style={{ flex: 1 }}>

               {/* Header Container */}
               <View style={{
                    ...styles.headerContainer,
                    backgroundColor: color,
               }}>

                    {/* Back Button - Arrow*/}
                    <TouchableOpacity
                         onPress={() => navigation.pop()}
                         activeOpacity={0.8}
                         style={{
                              ...styles.backButton,
                              top: top + 10,
                         }}
                    >
                         <Icon
                              name="arrow-back-outline"
                              size={40}
                              color="white"
                         />
                    </TouchableOpacity>

                    {/* Nombre del pokemon */}
                    <Text style={{
                         ...styles.pokemonName,
                         top: top + 50,
                    }}>
                         {name[0].toUpperCase() + name.slice(1) + '\n'} #{id}
                    </Text>

                    {/* Pokebola Blanca */}
                    <Image
                         source={require('../assets/pokebola-blanca.png')}
                         style={styles.pokeWhite}
                    />

                    <FadeInImage
                         uri={picture}
                         style={styles.pokemonImage}
                    />

               </View>

               {/* Detalles y loading */}
               {
                    isLoading ? (
                         <View style={styles.activityIndicator}>
                              <ActivityIndicator
                                   color={color}
                                   size={50}
                              />
                         </View>)
                         : <PokemosDetails pokemon={pokemon} />
               }

          </View>
     );
};


const styles = StyleSheet.create({
     headerContainer: {
          zIndex: 999,
          height: 300,
          alignItems: 'center',
          borderBottomRightRadius: 1000,
          borderBottomLeftRadius: 1000,
     },
     backButton: {
          position: 'absolute',
          left: 10,
     },
     pokemonName: {
          fontSize: 25,
          fontWeight: 'bold',
          color: "white",
          alignSelf: 'flex-start',
          left: 20,
     },
     pokeWhite: {
          width: 220,
          height: 220,
          top: 20,
          opacity: 0.7,
     },
     pokemonImage: {
          width: 220,
          height: 220,
          position: 'absolute',
          bottom: -10,
     },
     activityIndicator: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
     },
});

export default PokemonScreen;
