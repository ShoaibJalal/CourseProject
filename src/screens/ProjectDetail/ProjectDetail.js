import React from "react";
import {
  View,
  Image,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { deleteProject } from "../../store/actions/index";

class ProjectDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("projectName")
  });

  projectDeletedHandler = () => {
    this.props.onDeleteProject(this.props.navigation.getParam("projectKey"));
    this.props.navigation.pop();
  };
  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
    return (
      <View style={styles.container}>
        <View>
          <View>
            <Image
              // source={params.project.image}
              source={this.props.navigation.getParam("projectImage")}
              style={styles.projectImage}
            />
            <Text style={styles.projectName}>
              {this.props.navigation.getParam("projectName")}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={this.projectDeletedHandler}>
            <View style={styles.deleteButton}>
              <Ionicons
                name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                size={30}
                color="red"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  projectImage: {
    width: "100%",
    height: 200
  },
  projectName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  }
});
const mapDispatchToProps = dispatch => {
  return {
    onDeleteProject: key => dispatch(deleteProject(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectDetailScreen);
