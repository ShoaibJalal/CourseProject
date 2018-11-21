import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";
import { connect } from "react-redux";
import ProjectList from "../../components/ProjectList/ProjectList";
class FindProjectScreen extends Component {
  state = {
    projectsLoaded: false,
    removeAnim: new Animated.Value(1),
    projectsAnim: new Animated.Value(0)
  };
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
    console.log(project);

    this.props.navigation.push("ProjectDetail", project);
  };

  projectsLoadedHandler = () => {
    Animated.timing(this.state.projectsAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
  };

  projectsSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        projectsLoaded: true
      });
      this.projectsLoadedHandler();
    });
  };
  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [9, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.projectsSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Projects</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.projectsLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.projectsAnim
          }}
        >
          <ProjectList
            projects={this.props.projects}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.projectsLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "tomato",
    borderWidth: 4,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "tomato",
    fontWeight: "bold",
    fontSize: 27
  }
});
const mapStateToProps = state => {
  return {
    projects: state.projects.projects
  };
};

export default connect(mapStateToProps)(FindProjectScreen);
