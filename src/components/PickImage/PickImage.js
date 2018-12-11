import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import { ImagePicker } from "expo";

class PickImage extends Component {
  state = {
    pickedImage: null
  };

  reset = () => {
    this.setState({
      pickedImage: null
    });
  };
  //picking image from gallery
  pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    console.log(result);
    if (result.cancelled) {
      console.log("User cancelled!");
    } else if (!result.cancelled) {
      this.setState({
        pickedImage: { uri: result.uri }
      });
      this.props.onImagePicked({ uri: result.uri, base64: result.base64 });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick an Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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

export default PickImage;
