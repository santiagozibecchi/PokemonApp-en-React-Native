import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';

//  Como van a lucir las pantallas de la app -> Home, PokemonScreen
export type RootStackParams = {
     HomeScreen: undefined,
     PokemonScreen: { SimplePokemon: SimplePokemon, color: string }
}

const Stack = createStackNavigator<RootStackParams>();

export const TabList = () => {

     return (
          <Stack.Navigator
               screenOptions={{
                    headerShown: false,
                    cardStyle: {
                         backgroundColor: 'white',
                    },
               }}
          >
               <Stack.Screen name="HomeScreen" component={HomeScreen} />
               <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
          </Stack.Navigator>
     );
};
