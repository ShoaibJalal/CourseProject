import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  addProject,
  deleteProject,
  selectProject,
  deselectProject
} from "./src/store/actions/index";
import ProjectInput from "./src/components/ProjectInput/ProjectInput";
import ProjectList from "./src/components/ProjectList/ProjectList";
import projectImage from "./assets/project.jpg";
import ProjectDetail from "./src/components/ProjectDetail/ProjectDetail";

class Main extends React.Component {
  projectDeletedHandler = () => {
    this.props.onDeleteProject();
  };
  modalClosedHandler = () => {
    this.props.onDeselectProject();
  };
  // Will let us add project to state
  projectAddedHandler = projectName => {
    this.props.onAddProject(projectName);
  };
  //To select a project
  projectSelectedHandler = key => {
    this.props.onSelectProject(key);
  };
  render() {
    return (
      <View style={styles.container}>
        <ProjectDetail
          selectedProject={this.props.selectedProject}
          onItemDeleted={this.projectDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <ProjectInput onProjectAdded={this.projectAddedHandler} />
        <ProjectList
          projects={this.props.projects}
          onItemSelected={this.projectSelectedHandler}
        />
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
  }
});

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddProject: name => dispatch(addProject(name)),
    onDeleteProject: () => dispatch(deleteProject()),
    onSelectProject: key => dispatch(selectProject(key)),
    onDeselectProject: () => dispatch(deselectProject())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
