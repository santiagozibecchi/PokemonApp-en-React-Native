import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PokemonScreen from "../screens/PokemonScreen";
import SearchScreen from "../screens/SearchScreen";
import { RootStackParams } from "./TabList";


const TabSeach = createStackNavigator<RootStackParams>();

export const TabSeachScreen = () => {

     return (
          <TabSeach.Navigator
               screenOptions={{
                    headerShown: false,
                    cardStyle: {
                         backgroundColor: 'white',
                    },
               }}
          >
               <TabSeach.Screen name="HomeScreen" component={SearchScreen} />
               <TabSeach.Screen name="PokemonScreen" component={PokemonScreen} />
          </TabSeach.Navigator>
     );
};