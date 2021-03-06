import { AsyncStorage } from "react-native";
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import NavigationService from "../../.././NavigationService";

//firebase API_key
const API_KEY = "AIzaSyA03x2rz4VnCbvbWlBEzy4MrOBfxPmiuto";

// Trying authentication and passing token to store it.
export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      API_KEY;
    if (authMode === "signup") {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        API_KEY;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication failed!, Please try again....");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if (!parsedRes.idToken) {
          alert("Authentication Failed..! Try again...");
        } else {
          console.log(parsedRes);
          dispatch(
            authStoreToken(
              parsedRes.idToken,
              parsedRes.expiresIn,
              parsedRes.refreshToken
            )
          );
          //Using navigation service to navigate to main screen.
          NavigationService.navigate("Main");
        }
      });
  };
};

//Checking if token is fresh and storing it in AsyncStorage
export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expiryDate));

    AsyncStorage.setItem("projects:auth:token", token);
    AsyncStorage.setItem("projects:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("projects:auth:refreshToken", refreshToken);
  };
};

//storing token in state
export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate
  };
};

//Getting token from auth state
export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        let fetchedToken;
        AsyncStorage.getItem("projects:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("projects:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem("projects:auth:refreshToken")
          .then(refreshToken => {
            return fetch(
              "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=refresh_token&refres_token=" + refreshToken
              }
            );
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.id_token) {
              console.log("Refreshed token exists.");
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expires_in,
                  parsedRes.refresh_token
                )
              );
              return parsedRes.id_token;
            } else {
              dispatch(authClearStorage());
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

// Making sure to navigate if token exists
export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        NavigationService.navigate("Main");
      })
      .catch(err => console.log("Failed to fetch token!"));
  };
};

//Cleaning up the AsyncStorage
export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("projects:auth:token");
    AsyncStorage.removeItem("projects:auth:expiryDate");
    return AsyncStorage.removeItem("projects:auth:refreshToken");
  };
};

// Dispatchin action when logging out and Cleaning up the token
export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage()).then(() => {
      NavigationService.navigate("Login");
    });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
