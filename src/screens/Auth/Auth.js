import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import TextHeading from "../../components/UI/TextHeading/TextHeading";
import MainText from "../../components/UI/MainText/MainText";
import backgroundImage from "../../assets/background.jpg";
import validate from "../../utility/validation";
import { tryAuth, authAutoSignIn } from "../../store/actions/index";
class AuthScreen extends Component {
  state = {
    authMode: "login",
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

  componentDidMount() {
    this.props.onAutoSignIn();
  }

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onTryAuth(authData, this.state.authMode);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
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
    let confirmPasswordControl = null;
    let submitButton = (
      <Button
        title="Submit"
        onPress={this.authHandler}
        disabled={
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid ||
          (!this.state.controls.confirmPassword.valid &&
            this.state.authMode === "signup")
        }
      />
    );
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <DefaultInput
          placeholder="Confirm Password"
          style={styles.input}
          value={this.state.controls.confirmPassword.value}
          onChangeText={val => {
            this.updateInputState("confirmPassword", val);
          }}
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
          secureTextEntry
        />
      );
    }
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.authBackground}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <MainText>
            <TextHeading>Please Log In</TextHeading>
          </MainText>

          <Button
            title={`Switch to ${
              this.state.authMode === "login" ? "Sign Up" : "Login"
            }`}
            onPress={this.switchAuthModeHandler}
          />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
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
                secureTextEntry
              />
              {confirmPasswordControl}
            </View>
          </TouchableWithoutFeedback>
          {submitButton}
        </KeyboardAvoidingView>
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

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
