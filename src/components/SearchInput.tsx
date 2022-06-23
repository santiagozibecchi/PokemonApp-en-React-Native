import { View, Text, StyleSheet, TextInput, StyleProp, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import useDeboucedValue from '../hooks/useDeboucedValue';

interface Props {
     onDebounde: (value: string) => void;
     style?: StyleProp<ViewStyle>
}

const SearchInput = ({ style, onDebounde }: Props) => {

     const [textValue, setTextValue] = useState('');

     const deboucedValue = useDeboucedValue(textValue);

     useEffect(() => {
          onDebounde(deboucedValue);
     }, [deboucedValue]);


     return (
          <View style={{
               ...styles.container,
               ...style as any,
          }}>
               <View style={styles.textBackgound}>

                    <TextInput
                         placeholder="Buscar pokemon"
                         style={styles.textInput}
                         autoCapitalize="none"
                         autoCorrect={false}
                         value={textValue}
                         onChangeText={setTextValue}
                    />

                    <Icon
                         name="search-outline"
                         color="grey"
                         size={30}
                    />

               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          // backgroundColor: 'red',
     },
     textBackgound: {
          backgroundColor: '#F3F1F3',
          borderRadius: 50,
          height: 40,
          paddingHorizontal: 15,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          // sombra
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
     },
     textInput: {
          flex: 1,
          fontSize: 16,
          top: 1.1,
     },
});

export default SearchInput;
