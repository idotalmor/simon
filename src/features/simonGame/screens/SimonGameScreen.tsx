import React, { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { GameState, useSimon } from "../hooks/useSimon.ts";
import EmptyState from "../components/EmptyState.tsx";
import Game from "../components/Game.tsx";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App.tsx";

type SimonGameScreenNavigationProp = StackNavigationProp<RootStackParamList, "SimonGame">;
type SimonGameScreenRouteProp = RouteProp<RootStackParamList, "SimonGame">;

type SimonGameScreenProps = {
  navigation: SimonGameScreenNavigationProp;
  route: SimonGameScreenRouteProp;
};

const SimonGameScreen = ({ navigation }: SimonGameScreenProps) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("ResultScreen", {})}
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
      navigation.navigate("ResultScreen", { points: state.points });
    }
  }, [state.gameState, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {(state.gameState === GameState.Standby || state.gameState === GameState.End) &&
        <EmptyState onStartNewGame={newGame} />}
      {state.gameState === GameState.Playing && <Game state={state} play={play} />}
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
