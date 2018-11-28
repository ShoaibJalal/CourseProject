import React from "react";
import { View, Button, StyleSheet, Text, Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { authLogout } from "../../store/actions/index";

class SettingsScreen extends React.Component {
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
        <Text style={styles.text}>Press Logout Button to Signout</Text>

        <Button title="Logout" color="#841584" onPress={this.props.onLogout} />
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
    textAlign: "center",
    fontWeight: "bold"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SettingsScreen);
