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
import ResultsScreen from "./src/features/results/screens/ResultsScreen.tsx";
import { RootStackParamList, Screens } from "./src/navigation.ts";


const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.SimonGame}>
        <Stack.Screen
          name={Screens.SimonGame}
          component={SimonGameScreen}
          options={{ title: 'Simon Game' }}
        />
        <Stack.Screen
          name={Screens.ResultScreen}
          component={ResultsScreen}
          options={{ title: 'Results' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;
