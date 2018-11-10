import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
class AuthScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Screen</Text>
        <Button
          title="Go to Main Tabs"
          onPress={() => this.props.navigation.navigate("Main")}
        />
      </View>
    );
  }
}

export default AuthScreen;
