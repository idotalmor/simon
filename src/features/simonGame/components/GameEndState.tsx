import { Button, StyleSheet, Text, View } from 'react-native';
import { TEST_IDS } from "../../../constants/testIDs.ts";

type GameEndStateProps = {
  onStartNewGame: () => void;
};
const GameEndState = ({ onStartNewGame }: GameEndStateProps) => {
  return (
    <View
      testID={TEST_IDS.GAME_SCREEN.END_STATE}
      style={styles.container}>
      <Text style={styles.text}>Game Over!</Text>
      <Button title="Play again" onPress={onStartNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
export default GameEndState;
