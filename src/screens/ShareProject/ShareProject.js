import React, { Component } from "react";
import { View, Text } from "react-native";
import ProjectInput from "../../components/ProjectInput/ProjectInput";
import { connect } from "react-redux";
import { addProject } from "../../store/actions/index";
class ShareProjectScreen extends Component {
  static navigationOptions = {
    title: "Share Project"
  };

  projectAddedHandler = projectName => {
    this.props.onAddProject(projectName);
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ProjectInput onProjectAdded={this.projectAddedHandler} />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddProject: projectName => dispatch(addProject(projectName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ShareProjectScreen);
