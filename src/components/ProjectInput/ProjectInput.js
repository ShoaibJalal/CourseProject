import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

class ProjectInput extends Component {
  state = {
    projectName: ""
  };
  // Will allow to set the name
  projectNameChangedHandler = event => {
    this.setState({
      projectName: event
    });
  };

  // Will let us add project to state
  projectSubmitHandler = () => {
    if (this.state.projectName.trim === "") {
      return;
    }
    this.props.onProjectAdded(this.state.projectName);
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.projectInput}
          placeholder="Enter Project"
          value={this.state.projectName}
          onChangeText={this.projectNameChangedHandler}
        />

        <Button
          title="Add"
          style={styles.projectButton}
          onPress={this.projectSubmitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  projectInput: {
    width: "70%"
  },
  projectButton: {
    width: "30%"
  }
});
export default ProjectInput;
