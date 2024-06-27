import React, { useEffect, useState } from "react";
import { Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, Screens } from "../../../navigation.ts";
import { ResultsUIState, useResults } from "../hooks/useResults.ts";
import EmptyState from "../components/EmptyState.tsx";
import SaveGameModal from "../components/modals/SaveGameModal.tsx";

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ResultScreen>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, Screens.ResultScreen>;

type ResultsScreenProps = {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
};
const ResultsScreen = ({ route }: ResultsScreenProps) => {
  const { points } = route.params;

  const { state } = useResults();

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => {setModalVisible(prevState => !prevState);};

  useEffect(() => {
    if (points !== undefined) {
      setModalVisible(true);
    }
  }, [points]);

  const saveGame = (name: string) => {

  };

  return (
    <SafeAreaView style={styles.container}>
      {state.uiState === ResultsUIState.Empty && <EmptyState />}
      <SaveGameModal isOpen={isModalVisible} points={points} saveGame={saveGame} onClose={toggleModal} />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ResultsScreen;
