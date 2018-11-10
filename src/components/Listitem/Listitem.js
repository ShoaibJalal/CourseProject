import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const listItem = props => (
  <TouchableOpacity onPress={() => props.onItemPressed(props)}>
    <View style={styles.listItem}>
      <Image source={props.projectImage} style={styles.projectImage} />
      <Text>{props.projectName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    margin: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  projectImage: {
    margin: 10,
    height: 30,
    width: 30
  }
});
export default listItem;
