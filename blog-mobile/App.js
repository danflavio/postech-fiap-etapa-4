import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import PostDetail from './src/pages/PostDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Lista de Posts' }} />
        <Stack.Screen name="PostDetail" component={PostDetail} options={{ title: 'Leitura do Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}