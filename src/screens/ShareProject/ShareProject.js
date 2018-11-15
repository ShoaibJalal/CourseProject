import React, { Component } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";

import { connect } from "react-redux";
import { addProject } from "../../store/actions/index";
import MainText from "../../components/UI/MainText/MainText";
import TextHeading from "../../components/UI/TextHeading/TextHeading";
import ProjectInput from "../../components/ProjectInput/ProjectInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";

class ShareProjectScreen extends Component {
  state = {
    projectName: ""
  };
  static navigationOptions = {
    title: "Share Project"
  };

  projectAddedHandler = () => {
    if (this.state.projectName.trim() !== "") {
      this.props.onAddProject(this.state.projectName);
    }
  };
  projectNameChangedHandler = event => {
    this.setState({
      projectName: event
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <TextHeading>Share a project</TextHeading>
          </MainText>
          <PickImage />

          <PickLocation />
          <ProjectInput
            projectName={this.state.projectName}
            onChangeText={this.projectNameChangedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Share the Project"
              onPress={this.projectAddedHandler}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  button: {
    margin: 8
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddProject: projectName => dispatch(addProject(projectName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ShareProjectScreen);
