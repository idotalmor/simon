import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { GameState, useSimon } from "../hooks/useSimon.ts";
import EmptyState from "../components/EmptyState.tsx";
import Game from "../components/Game.tsx";

const SimonGameScreen = () => {

  const { state, newGame, play } = useSimon();

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
  }
});

export default SimonGameScreen;
