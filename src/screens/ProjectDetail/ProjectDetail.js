import React from "react";
import {
  View,
  Image,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { deleteProject } from "../../store/actions/index";
import { MapView } from "expo";
import { Rating } from "react-native-elements";

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
    let marker = null;
    if (params.location) {
      marker = <MapView.Marker coordinate={params.location} />;
    }
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

            <Rating
              type="custom"
              readonly
              showRating
              fractions={1}
              imageSize={20}
              startingValue={params.starCount}
              style={styles.rating}
              ratingBackgroundColor="white"
            />
          </View>
        </View>
        <View style={styles.subConatiner}>
          <MapView
            style={styles.map}
            initialRegion={{
              ...params.location,
              latitudeDelta: 0.0322,
              longitudeDelta:
                (Dimensions.get("window").width /
                  Dimensions.get("window").height) *
                0.0322
            }}
          >
            {marker}
          </MapView>
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
    margin: 3,
    flex: 1,
    backgroundColor: "white"
  },
  subConatiner: {
    flex: 1
  },
  rating: {
    margin: 10
  },
  projectImage: {
    width: "100%",
    height: 200
  },
  map: {
    ...StyleSheet.absoluteFillObject
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
