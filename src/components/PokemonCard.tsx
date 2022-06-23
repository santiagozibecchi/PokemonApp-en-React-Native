import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { getImageColors } from '../helpers/getColors';
import ImageColors from 'react-native-image-colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/navigator';

const windownWidth = Dimensions.get('window').width;

interface Props {
     pokemon: SimplePokemon;
}

const PokemonCard = ({ pokemon }: Props) => {

     const [bgColor, setBgColor] = useState('grey');
     const isMounted = useRef(true);

     const { navigate } = useNavigation<StackNavigationProp<RootStackParams>>();

     // useEffect porque voy a disparar un efecto secundario en la pantalla,
     // en este caso -> cambiar el color

     // const getCardColors = async () => {

     //      const [cardColor] = await getImageColors(pokemon.picture);
     //      setBgColor(cardColor || 'grey');

     // };



     useEffect(() => {

          // OTRA FORMA
          ImageColors.getColors(pokemon.picture, { fallback: 'grey' }).
               then(colors => {
                    if (!isMounted.current) return

                    (colors.platform === 'android')
                         ? setBgColor(colors.dominant || 'grey')
                         : setBgColor(colors.platform || 'grey');
               });
          // getCardColors();

          return () => {
               isMounted.current = false;
          };

     }, []);


     return (
          <TouchableOpacity
               activeOpacity={0.85}
               onPress={() => navigate('PokemonScreen', {
                    SimplePokemon: pokemon,
                    color: bgColor,
               })}
          >
               <View style={{
                    ...styles.cardContainer,
                    width: windownWidth * 0.42,
                    backgroundColor: bgColor,
               }}>
                    {/* Nombre del pokemon y ID  */}
                    <View>
                         <Text style={styles.name}>
                              {pokemon.name[0].toLocaleUpperCase() + pokemon.name.slice(1)}
                              {'\n#' + pokemon.id}
                         </Text>
                    </View>

                    <View style={styles.pokebolaContainer}>
                         <Image
                              source={require('../assets/pokebola-blanca.png')}
                              style={styles.pokebola}
                         />
                    </View>

                    <FadeInImage
                         uri={pokemon.picture}
                         style={styles.pokemonImg}
                    />

               </View>
          </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
     cardContainer: {
          marginHorizontal: 10,
          height: 120,
          marginBottom: 20,
          borderRadius: 13,
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          // elimina todo lo que este fuera de la tarjeta
          // overflow: 'hidden',
     },
     name: {
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
          top: 16,
          left: 10,
     },
     pokebola: {
          width: 100,
          height: 100,
          position: 'absolute',
          bottom: -15,
          right: -20,
     },
     pokemonImg: {
          width: 110,
          height: 110,
          position: 'absolute',
          right: -6,
          bottom: -6,
     },
     pokebolaContainer: {
          // backgroundColor: 'blue',
          width: 100,
          height: 100,
          position: 'absolute',
          bottom: 0,
          right: 0,
          opacity: 0.5,
          overflow: 'hidden',
     },
});

export default PokemonCard;

