import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import ProjectList from "../../components/ProjectList/ProjectList";
class FindProjectScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Add Project",
    headerRight: (
      <Button
        title="Add"
        onPress={() => navigation.navigate("ShareProject")}
        color="#a41034"
      />
    )
  });
  itemSelectedHandler = project => {
    this.props.navigation.push("ProjectDetail", project);
    console.log(project);
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ProjectList
          projects={this.props.projects}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    projects: state.projects.projects
  };
};
export default connect(mapStateToProps)(FindProjectScreen);
