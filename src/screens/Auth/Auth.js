import React, { Component } from "react";
import { View, Button, StyleSheet, ImageBackground } from "react-native";
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import TextHeading from "../../components/UI/TextHeading/TextHeading";
import MainText from "../../components/UI/MainText/MainText";
import backgroundImage from "../../assets/background.jpg";
class AuthScreen extends Component {
  loginHandler = () => {
    this.props.navigation.navigate("Main");
  };
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.authBackground}>
        <View style={styles.container}>
          <MainText>
            <TextHeading>Login In</TextHeading>
          </MainText>

          <Button title="Switch to Log In" onPress={() => alert("Switched")} />
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Enter E-mail Address"
              style={styles.input}
            />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
          </View>

          <Button title="Submit" onPress={this.loginHandler} />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  authBackground: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  },

  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  }
});

export default AuthScreen;
