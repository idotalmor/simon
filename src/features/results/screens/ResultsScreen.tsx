import React, { useCallback, useEffect, useState } from "react";
import {  SafeAreaView, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, Screens } from "../../../navigation.ts";
import { ResultsUIState, useResults } from "../hooks/useResults.ts";
import EmptyState from "../components/EmptyState.tsx";
import SaveGameModal from "../components/modals/SaveGameModal.tsx";
import GameRecordsList from "../components/GameRecordsList.tsx";
import { TEST_IDS } from "../../../constants/testIDs.ts";

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ResultScreen>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, Screens.ResultScreen>;

type ResultsScreenProps = {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
};
const ResultsScreen = ({ route }: ResultsScreenProps) => {
  const { points } = route.params;

  const { state, saveGame } = useResults();

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setModalVisible((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (points !== undefined) {
      setModalVisible(true);
    }
  }, [points]);

  const handleSaveGame = useCallback((name: string) => {
    if (points !== undefined) {
      saveGame(name, points);
    }
  }, [saveGame, points]);

  return (
    <SafeAreaView testID={TEST_IDS.RESULTS_SCREEN.SCREEN} style={styles.container}>
      {state.uiState === ResultsUIState.Empty && <EmptyState />}
      {state.uiState === ResultsUIState.List && <GameRecordsList games={state.games!}/>}
      <SaveGameModal isOpen={isModalVisible} saveGame={handleSaveGame} onClose={toggleModal} />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ResultsScreen;
