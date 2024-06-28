import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TEST_IDS } from "../../../../constants/testIDs.ts";

type SaveGameModalProps = {
  isOpen: boolean;
  saveGame: (name: string) => void;
  onClose: () => void;
}
const SaveGameModal = ({ isOpen, onClose, saveGame }: SaveGameModalProps) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    saveGame(username);
    onClose();
  }, [saveGame, onClose, username]);

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}>
      <View
        testID={TEST_IDS.RESULTS_SCREEN.POPUP}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter your name</Text>
          <TextInput
            testID={TEST_IDS.RESULTS_SCREEN.POPUP_INPUT}
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Button
            testID={TEST_IDS.RESULTS_SCREEN.POPUP_SUBMIT}
            title="Submit"
            onPress={handleSubmit}
            disabled={username === ""} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 20
  }
});

export default SaveGameModal;
