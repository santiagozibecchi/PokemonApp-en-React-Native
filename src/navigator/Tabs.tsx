import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabSeachScreen } from './TabSeach';
import { TabList } from './TabList';

const Tab = createBottomTabNavigator();

// el tab pasa a ser mi pantalla principal, la que el usuario ve cuando entra a la app
// esta muestra tanto el tab de abajo como el HomeScreen -> Navigator
export const Tabs = () => {
     return (
          <Tab.Navigator
               detachInactiveScreens={false}
               sceneContainerStyle={{
                    backgroundColor: 'white',
               }}
               screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#5856D6',
                    tabBarLabelStyle: {
                         marginBottom: (Platform.OS === 'ios') ? 0 : 6,
                    },
                    tabBarStyle: {
                         position: 'absolute', // para que los hijos se puedan expandir
                         // backgroundColor: 'transparent',
                         // backgroundColor: 'rgba(255,255,255,0.92)', -> Otra forma
                         backgroundColor: 'white',
                         opacity: 0.92,
                         borderWidth: 0,
                         elevation: 0,
                         height: (Platform.OS === 'ios') ? 80 : 55,
                    },
               }}
          >
               <Tab.Screen
                    name="Home"
                    component={TabList}
                    options={{
                         tabBarLabel: "Listado",
                         tabBarIcon: ({ color }) => (
                              <Icon
                                   name="list-outline"
                                   color={color}
                                   size={25} />
                         ),
                    }}
               />
               <Tab.Screen
                    name="Settings"
                    component={TabSeachScreen}
                    options={{
                         tabBarLabel: "Buscar",
                         tabBarIcon: ({ color }) => (
                              <Icon
                                   name="search-outline"
                                   color={color}
                                   size={25} />
                         ),
                    }}
               />
          </Tab.Navigator>
     );
}