import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, Screens } from "../../../navigation.ts";

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ResultScreen>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, Screens.ResultScreen>;

type ResultsScreenProps = {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
};
const ResultsScreen = ({ route }: ResultsScreenProps) => {
  const { points  } = route.params;


  return (
    <SafeAreaView style={styles.container}>
      <Text> result screen ${points}</Text>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ResultsScreen;
