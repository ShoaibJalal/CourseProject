import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default class App extends React.Component {
  state = {
    projectName: ""
  };

  projectNameChangedHandler = event => {
    this.setState({
      projectName: event
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ width: 300, borderColor: "black" }}
          placeholder="Enter Project"
          value={this.state.projectName}
          onChangeText={this.projectNameChangedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
