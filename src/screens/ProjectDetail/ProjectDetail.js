import React from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
class ProjectDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("projectName")
  });
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
          <TouchableOpacity onPress={this.props.onItemDeleted}>
            <View style={styles.deleteButton}>
              <Ionicons name="md-trash" size={30} color="red" />
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

export default ProjectDetailScreen;
