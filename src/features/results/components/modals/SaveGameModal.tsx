import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

type SaveGameModalProps = {
  isOpen: boolean;
  saveGame: (name: string) => void;
  points:number |null|undefined;
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
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter your name</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Button title="Submit" onPress={handleSubmit} disabled={username === ""} />
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
