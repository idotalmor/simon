import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import GridButton, { GridButtonModel } from "./GridButton.tsx";
import useSequencePresenter from "../hooks/useSequencePresenter.ts";
import { SimonState } from "../hooks/useSimon.ts";
import { TEST_IDS } from "../../../constants/testIDs.ts";


const buttons: GridButtonModel[] = [
  {
    key: 0,
    color: "#006fee",
    sound: "blue.mp3"
  },
  {
    key: 1,
    color: "#ee0000",
    sound: "red.mp3"
  },
  {
    key: 2,
    color: "#eece00",
    sound: "yellow.mp3"
  },
  {
    key: 3,
    color: "#3cee00",
    sound: "green.mp3"
  }
];

type GameProps = {
  state: SimonState,
  play: (arg: number) => boolean
}

const Game = ({ state, play }: GameProps) => {

  const { presented, isPresenting } = useSequencePresenter({ sequence: state.sequence });

  const renderItem = ({ item }: { item: GridButtonModel }) => {
    return (
      <GridButton
        key={item.key}
        isPresented={presented === item.key}
        model={item}
        onPress={play}
        disabled={isPresenting} />
    );
  };

  return (
    <View
      testID={TEST_IDS.GAME_SCREEN.GAME_STATE}
      style={styles.container}>
      <FlatList
        style={styles.grid}
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
        numColumns={2}
      />
      <Text style={styles.text}>Points: {state.points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  grid: {
    backgroundColor: "#919191",
    flex: 1,
    width: "100%"
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
export default Game;
