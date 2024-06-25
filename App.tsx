/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SimonGameScreen from './src/features/simonGame/screens/SimonGameScreen.tsx';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SimonGame">
        <Stack.Screen
          name="SimonGame"
          component={SimonGameScreen}
          options={{ title: 'Simon Game' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;
