import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";
import { addProject } from "../../store/actions/index";
import MainText from "../../components/UI/MainText/MainText";
import TextHeading from "../../components/UI/TextHeading/TextHeading";
import ProjectInput from "../../components/ProjectInput/ProjectInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";
import { Rating } from "react-native-elements";
import { startAddProject } from "../../store/actions/index";

class ShareProjectScreen extends Component {
  static navigationOptions = {
    title: "Share Project"
  };

  componentWillMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.projectAdded) {
      this.props.navigation.navigate("FindProject");
      this.props.onStartAddProject();
    }
  }

  reset = () => {
    this.setState({
      controls: {
        projectName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      },
      starCount: 3
    });
  };

  projectAddedHandler = () => {
    this.props.onAddProject(
      this.state.controls.projectName.value,
      this.state.controls.location.value,
      this.state.controls.image.value,
      this.state.starCount
    );
    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
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
  ImagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  };

  ratingCompleted = startingValue => {
    console.log("Rating is: " + startingValue);
    this.setState({ starCount: startingValue });
  };
  ratingStarted = startingValue => {
    this.setState({ starCount: startingValue });
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  };

  render() {
    let submitButton = (
      <Button
        title="Share the Project"
        onPress={this.projectAddedHandler}
        disabled={
          !this.state.controls.projectName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      />
    );
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MainText>
            <TextHeading>Share a project</TextHeading>
          </MainText>
          <ProjectInput
            projectData={this.state.controls.projectName}
            onChangeText={this.projectNameChangedHandler}
          />
          <Rating
            showRating
            type="star"
            fractions={1}
            startingValue={this.state.starCount}
            imageSize={40}
            onFinishRating={this.ratingCompleted}
            onStartRating={this.ratingStarted}
            style={{ paddingVertical: 10 }}
          />

          <PickImage
            onImagePicked={this.ImagePickedHandler}
            ref={ref => (this.imagePicker = ref)}
          />

          <PickLocation
            onLocationPick={this.locationPickedHandler}
            ref={ref => (this.locationPicker = ref)}
          />

          <View style={styles.button}>{submitButton}</View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },

  button: {
    margin: 8
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    projectAdded: state.projects.projectAdded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddProject: (projectName, location, image, starCount) =>
      dispatch(addProject(projectName, location, image, starCount)),
    onStartAddProject: () => dispatch(startAddProject())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareProjectScreen);
