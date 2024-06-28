import React, { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { GameState, useSimon } from "../hooks/useSimon.ts";
import EmptyState from "../components/EmptyState.tsx";
import Game from "../components/Game.tsx";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Screens } from "../../../navigation.ts";
import GameEndState from "../components/GameEndState.tsx";
import { TEST_IDS } from "../../../constants/testIDs.ts";

type SimonGameScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.SimonGame>;
type SimonGameScreenRouteProp = RouteProp<RootStackParamList, Screens.SimonGame>;

type SimonGameScreenProps = {
  navigation: SimonGameScreenNavigationProp;
  route: SimonGameScreenRouteProp;
};

const SimonGameScreen = ({ navigation }: SimonGameScreenProps) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          testID={TEST_IDS.GAME_SCREEN.RESULT_BTN}
          onPress={() => navigation.navigate(Screens.ResultScreen, {})}
          style={styles.appBarButton}
        >
          <Text style={styles.appBarButtonText}>Results</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const { state, newGame, play } = useSimon();

  useEffect(() => {
    if (state.gameState === GameState.End) {
      navigation.navigate(Screens.ResultScreen, { points: state.points });
    }
  }, [state.gameState, navigation, state.points]);

  return (
    <SafeAreaView testID={TEST_IDS.GAME_SCREEN.SCREEN} style={styles.container}>
      {state.gameState === GameState.Standby && <EmptyState onStartNewGame={newGame} />}
      {state.gameState === GameState.Playing && <Game state={state} play={play} />}
      {state.gameState === GameState.End && <GameEndState onStartNewGame={newGame}/>}
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appBarButton: {
    marginRight: 10,
    backgroundColor: "#0062f6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10
  },
  appBarButtonText: {
    color: "#ffffff",
    fontWeight: "bold"
  }
});

export default SimonGameScreen;
