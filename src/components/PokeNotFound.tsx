import { View, Text, Image } from 'react-native';
import React from 'react';

const PokeNotFound = () => {
     return (
          <View
               style={{
                    top: 100,
                    alignItems: 'center',
               }}>
               <Image
                    source={require('../assets/poke-warning.png')}
                    style={{
                         opacity: 0.7,
                         width: 240,
                         height: 210,
                    }}
               />
               <Text style={{ fontSize: 20, marginTop: 10 }}>
                    Pokemon no encontrado
               </Text>
          </View>
     )
}

export default PokeNotFound;