import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

import { connect } from "react-redux";
import { addProject } from "../../store/actions/index";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import MainText from "../../components/UI/MainText/MainText";
import TextHeading from "../../components/UI/TextHeading/TextHeading";
import backgroundPlaceholder from "../../assets/backgroundHD.jpg";
class ShareProjectScreen extends Component {
  static navigationOptions = {
    title: "Share Project"
  };

  projectAddedHandler = projectName => {
    this.props.onAddProject(projectName);
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <TextHeading>Share a project</TextHeading>
          </MainText>
          <View style={styles.placeholder}>
            <Image source={backgroundPlaceholder} style={styles.previewImage} />
          </View>
          <View style={styles.button}>
            <Button title="Pick Image" />
          </View>

          <View style={styles.placeholder}>
            <Text>Map</Text>
          </View>
          <View style={styles.button}>
            <Button title="Use current location" />
          </View>
          <DefaultInput placeholder="Project Name" />
          <View style={styles.button}>
            <Button title="Share the Project" />
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
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
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
