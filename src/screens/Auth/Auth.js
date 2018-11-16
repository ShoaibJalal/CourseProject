import React, { Component } from "react";
import { View, Button, StyleSheet, ImageBackground } from "react-native";
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import TextHeading from "../../components/UI/TextHeading/TextHeading";
import MainText from "../../components/UI/MainText/MainText";
import backgroundImage from "../../assets/background.jpg";
import validate from "../../utility/validation";
class AuthScreen extends Component {
  state = {
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  loginHandler = () => {
    this.props.navigation.navigate("Main");
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
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
              value={this.state.controls.email.value}
              onChangeText={val => {
                this.updateInputState("email", val);
              }}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
            />
            <DefaultInput
              placeholder="Password"
              style={styles.input}
              value={this.state.controls.password.value}
              onChangeText={val => {
                this.updateInputState("password", val);
              }}
              valid={this.state.controls.password.valid}
              touched={this.state.controls.password.touched}
            />
            <DefaultInput
              placeholder="Confirm Password"
              style={styles.input}
              value={this.state.controls.confirmPassword.value}
              onChangeText={val => {
                this.updateInputState("confirmPassword", val);
              }}
              valid={this.state.controls.confirmPassword.valid}
              touched={this.state.controls.confirmPassword.touched}
            />
          </View>

          <Button
            title="Submit"
            onPress={this.loginHandler}
            disabled={
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid ||
              !this.state.controls.confirmPassword.valid
            }
          />
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
