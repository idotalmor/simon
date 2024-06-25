import { Button, StyleSheet, Text, View } from 'react-native';

type EmptyStateProps = {
  onStartNewGame: () => void;
};
const EmptyState = ({ onStartNewGame }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Simon!</Text>
      <Button title="Start New Game" onPress={onStartNewGame} />
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
export default EmptyState;
