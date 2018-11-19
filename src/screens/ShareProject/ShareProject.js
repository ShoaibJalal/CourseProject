import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import { connect } from "react-redux";
import { addProject } from "../../store/actions/index";
import MainText from "../../components/UI/MainText/MainText";
import TextHeading from "../../components/UI/TextHeading/TextHeading";
import ProjectInput from "../../components/ProjectInput/ProjectInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class ShareProjectScreen extends Component {
  state = {
    controls: {
      projectName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      }
    }
  };
  static navigationOptions = {
    title: "Share Project"
  };

  projectAddedHandler = () => {
    if (this.state.controls.projectName.value.trim() !== "") {
      this.props.onAddProject(this.state.controls.projectName.value);
    }
  };
  projectNameChangedHandler = event => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          projectName: {
            ...prevState.controls.projectName,
            value: event,
            valid: validate(
              event,
              prevState.controls.projectName.validationRules
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MainText>
            <TextHeading>Share a project</TextHeading>
          </MainText>
          <PickImage />

          <PickLocation />
          <ProjectInput
            projectData={this.state.controls.projectName}
            onChangeText={this.projectNameChangedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Share the Project"
              onPress={this.projectAddedHandler}
              disabled={!this.state.controls.projectName.valid}
            />
          </View>
        </KeyboardAvoidingView>
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
