import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";


const ResultsScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      <Text> result screen</Text>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ResultsScreen;
