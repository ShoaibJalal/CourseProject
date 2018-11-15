import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={
          Platform.OS === "android"
            ? `md-options`
            : `ios-options${focused ? "" : "-outline"}`
        }
        size={25}
        color={tintColor}
      />
    ),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings coming soon.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center"
  }
});
