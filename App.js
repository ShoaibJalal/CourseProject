import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Listitem from "./src/components/Listitem/Listitem";

export default class App extends React.Component {
  state = {
    projectName: "",
    projects: []
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
    this.setState(prevState => {
      return {
        projects: prevState.projects.concat(prevState.projectName)
      };
    });
  };
  render() {
    const projectsOutput = this.state.projects.map((project, i) => (
      <Listitem key={i} projectName={project} />
    ));
    return (
      <View style={styles.container}>
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
        <View style={styles.listContainer}>{projectsOutput}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
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
  },

  listContainer: {
    width: "100%"
  }
});
