import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

type GridButtonProps = {
  onPress: () => void;
  color: string;
};

const GridButton = ({ onPress, color }: GridButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} />
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    height:300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    aspectRatio: 1, // Ensures the button is square
  },
});

export default GridButton;
