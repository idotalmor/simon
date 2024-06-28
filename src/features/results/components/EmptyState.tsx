import { StyleSheet, Text, View } from 'react-native';
import { TEST_IDS } from "../../../constants/testIDs.ts";

const EmptyState = () => {
  return (
    <View testID={TEST_IDS.RESULTS_SCREEN.EMPTY_STATE}
          style={styles.container}>
      <Text style={styles.text}>No results yet</Text>
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
    color: 'black',
  },
});
export default EmptyState;
