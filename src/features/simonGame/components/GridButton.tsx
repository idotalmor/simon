import React, { useCallback, useEffect, useMemo } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import useSound from "../hooks/useSound.ts";

type GridButtonModel = {
  key: number,
  color: string,
  sound: string
}

type GridButtonProps = {
  onPress: (play: number) => void;
  model: GridButtonModel;
  isPresented: boolean;
  disabled?: boolean;
};

const GridButton = ({ model, onPress, isPresented, disabled }: GridButtonProps) => {
  const { playSound } = useSound(model.sound);

  const handlePress = useCallback(() => {
    playSound();
    onPress(model.key);
  }, [model.key, onPress, playSound]);

  useEffect(() => {
    if (isPresented) {
      playSound();
    }
  }, [isPresented, playSound]);

  const buttonStyle = useMemo<ViewStyle>(() => ({
    backgroundColor: model.color,
    opacity: isPresented ? 0.3 : 1
  }), [model.color, isPresented]);

  return (
    <TouchableOpacity testID={`button-${model.key}`}
                      style={[styles.button, buttonStyle]}
                      onPress={handlePress}
                      disabled={disabled} />
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
export type { GridButtonModel };
