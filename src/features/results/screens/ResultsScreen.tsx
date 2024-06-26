import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App.tsx";
import { RouteProp } from "@react-navigation/native";

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResultScreen'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'ResultScreen'>;

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
