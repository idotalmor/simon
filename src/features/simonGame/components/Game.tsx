import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import GridButton from "./GridButton.tsx";
import { SimonState } from "../models/models.ts";

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

  const [presentedButton, setPresentedButton] = useState<number | null>(null);

  useEffect(() => {
    if (state.sequence.length > 0) {
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < state.sequence.length) {
          setPresentedButton(state.sequence[currentIndex]);

          setTimeout(() => {
            setPresentedButton(null);
            currentIndex++;
            if (currentIndex >= state.sequence.length) {
              clearInterval(interval);
            }
          }, 500); // 1 second display
        }
      }, 800); // 1 second press duration + 0.2 seconds delay between presses

      return () => clearInterval(interval);
    }
  }, [state.sequence]);

  const renderItem = ({ item }: { item: UIGridButton }) => {
    return <GridButton
      key={item.key}
      isPresented={presentedButton === item.key}
      onPress={() => {play(item.key);}}
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
