import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import GridButton from "./GridButton.tsx";

type UIGridButton = {
  key: number,
  color: string,
}

const buttons: UIGridButton[] = [
  {
    key: 0,
    color: "#006fee"
  },
  {
    key: 1,
    color: "#ee0000"
  },
  {
    key: 2,
    color: "#eece00"
  },
  {
    key: 3,
    color: "#3cee00"
  }
];

const Game = () => {

  const renderItem = ({ item }: { item: UIGridButton }) => {
    return <GridButton key={item.key} onPress={() => {
      play(item.key);
    }} color={item.color} />;
  };

  return (<View style={styles.container}>
    <FlatList
      style={{ height: "100%", width: "100%" }}
      data={buttons}
      renderItem={renderItem}
      keyExtractor={(item) => item.key.toString()}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  </View>);
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  grid: {
    flexGrow: 1,
    justifyContent: "center"
  }
});
export default Game;
