import { FlatList, StyleSheet, Text, View } from "react-native";
import { GameRecord } from "../../../store/slices/gameSlice.ts";
import { TEST_IDS } from "../../../constants/testIDs.ts";

type GameRecordsListProps = {
  games: GameRecord[]
}

const GameRecordsList = ({ games }: GameRecordsListProps) => {
  const renderItem = ({ item }: { item: GameRecord }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name} : {item.points}</Text>
      </View>
    );
  };

  return (
    <View
      testID={TEST_IDS.RESULTS_SCREEN.LIST_STATE}
      style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1
  },
  itemContainer: {
    padding: 16,
    marginVertical: 1,
    backgroundColor: "#f9f9f9"
  },
  itemText: {
    fontSize: 18
  }
});
export default GameRecordsList;
