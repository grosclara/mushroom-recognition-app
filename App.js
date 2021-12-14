import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Components/HomeScreen';
import FavoritesList from './Components/FavoritesList';

import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={({ navigation }) => ({
            // title: "Champilove",
            // headerRight: () => (<Ionicons
            //     name="list-outline" 
            //     size={32} 
            //     color="black" 
            //     onPress={() => navigation.navigate('Favorites')}
					  // />
            // ),
            headerShown: false
        } 
        )} />
        <Stack.Screen name="Favorites" component={FavoritesList} options={{title: 'My Favorites'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
