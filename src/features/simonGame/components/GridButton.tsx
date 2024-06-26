import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

type GridButtonProps = {
  onPress: () => void;
  color: string;
  isPresented: boolean;
};

const GridButton = ({ onPress, color, isPresented }: GridButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color, opacity: isPresented ? 0.3 : 1 }]}
                      onPress={onPress} />
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    aspectRatio: 1
  }
});

export default GridButton;
