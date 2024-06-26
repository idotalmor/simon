import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import GridButton from "./GridButton.tsx";
import { SimonState } from "../models/models.ts";
import useSequencePresenter from "../hooks/useSequencePresenter.ts";

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

type GameProps = {
  state: SimonState,
  play: (arg: number) => boolean
}

const Game = ({ state, play }: GameProps) => {

  const {presented,isPresenting} = useSequencePresenter({sequence: state.sequence });

  const renderItem = ({ item }: { item: UIGridButton }) => {
    return <GridButton
      key={item.key}
      isPresented={presented === item.key}
      onPress={() => {play(item.key);}}
      disabled={isPresenting}
      color={item.color} />;
  };

  return (<View style={styles.container}>
    <FlatList
      style={styles.grid}
      data={buttons}
      renderItem={renderItem}
      keyExtractor={(item) => item.key.toString()}
      numColumns={2}
    />
    <Text>Points: {state.points}</Text>
  </View>);
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  grid: { backgroundColor:'#937b7a', height:'50%', width: "100%" }
});
export default Game;
