import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const projectDetail = props => {
  modalContent = null;
  if (props.selectedProject) {
    modalContent = (
      <View>
        <Image
          source={props.selectedProject.image}
          style={styles.projectImage}
        />
        <Text style={styles.projectName}>{props.selectedProject.name}</Text>
      </View>
    );
  }
  return (
    <Modal
      onRequestClose={props.onModalClosed}
      visible={props.selectedProject !== null}
      animationType="slide"
    >
      <View style={styles.modalContainer}>{modalContent}</View>
      <View>
        <TouchableOpacity onPress={props.onItemDeleted}>
          <View style={styles.deleteButton}>
            <Ionicons name="md-trash" size={30} color="red" />
          </View>
        </TouchableOpacity>

        <Button title="Close" onPress={props.onModalClosed} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 30
  },
  projectImage: {
    width: "100%",
    height: 200
  },
  projectName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  }
});

export default projectDetail;
