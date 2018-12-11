import React from "react";
import { Provider } from "react-redux";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import NavigationService from "./NavigationService";

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import projectsReducer from "./src/store/reducers/projects";
import ShareProjectScreen from "./src/screens/ShareProject/ShareProject";
import AuthScreen from "./src/screens/Auth/Auth";
import FindProjectScreen from "./src/screens/FindProject/FindProject";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import ProjectDetailScreen from "./src/screens/ProjectDetail/ProjectDetail";
import uiReducer from "./src/store/reducers/ui";
import authReducer from "./src/store/reducers/auth";

//Combining whole app state vai reducers
const rootReducer = combineReducers({
  projects: projectsReducer,
  ui: uiReducer,
  auth: authReducer
});
//setting up devtools
let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
//passing reducer and middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//Stack Navigator
const ProjectStack = createStackNavigator({
  FindProject: FindProjectScreen,
  ShareProject: ShareProjectScreen,
  ProjectDetail: ProjectDetailScreen
});

//Tabs navigator
const MainTabs = createBottomTabNavigator(
  {
    MainStack: ProjectStack,
    Settings: SettingsScreen
  }
  
);

//Switch navigator = starting point of app
const AppNavigator = createSwitchNavigator({
  Login: AuthScreen,
  Main: MainTabs
});

export default class App extends React.Component {
  render() {
    return (

      // Passing redux store to whole app
      <Provider store={store}>
        <AppNavigator

        /* Creating Navigation service to use in other components. */
          ref={navigatorRef => {
            NavigationService.setAppNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
