import React from "react";
import { useSimon } from "../hooks/useSimon";
import { FlatList, StyleSheet, View } from "react-native";
import GridButton from "./GridButton";

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

const SimonGame = () => {
  const { state, play } = useSimon();

  const renderItem = ({ item }: { item: UIGridButton }) => {
    return <GridButton key={item.key} onPress={() => { play(item.key); }} color={item.color} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{height:"100%",width:"100%"}}
        key={"safsdf"}
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default SimonGame;
