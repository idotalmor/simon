import { Button, StyleSheet, Text, View } from "react-native";
import { TEST_IDS } from "../../../constants/testIDs.ts";

type EmptyStateProps = {
  onStartNewGame: () => void;
};
const EmptyState = ({ onStartNewGame }: EmptyStateProps) => {
  return (
    <View
      testID={TEST_IDS.GAME_SCREEN.EMPTY_STATE}
      style={styles.container}>
      <Text style={styles.text}>Welcome to Simon!</Text>
      <Button testID={TEST_IDS.GAME_SCREEN.NEW_GAME_BTN} title="Start New Game" onPress={onStartNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
    marginBottom: 20
  }
});
export default EmptyState;
