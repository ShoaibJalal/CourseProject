import React from "react";
import { Provider } from "react-redux";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { createStore, combineReducers, compose } from "redux";
import { Ionicons } from "@expo/vector-icons";
import projectsReducer from "./src/store/reducers/projects";
import ShareProjectScreen from "./src/screens/ShareProject/ShareProject";
import AuthScreen from "./src/screens/Auth/Auth";
import FindProjectScreen from "./src/screens/FindProject/FindProject";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import ProjectDetailScreen from "./src/screens/ProjectDetail/ProjectDetail";

const rootReducer = combineReducers({
  projects: projectsReducer
});
let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(rootReducer, composeEnhancers());

const ProjectStack = createStackNavigator({
  FindProject: FindProjectScreen,
  ShareProject: ShareProjectScreen,
  ProjectDetail: ProjectDetailScreen
});

const MainTabs = createBottomTabNavigator(
  {
    MainStack: ProjectStack,
    Settings: SettingsScreen
  }
  /* {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "FindProject") {
          iconName = `ios-search${focused ? "" : "-outline"}`;
        } else if (routeName === "ShareProject") {
          iconName = `ios-share${focused ? "" : "-outline"}`;
        }

        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }), 
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    } 
  } */
);

const AppNavigator = createSwitchNavigator({
  Login: AuthScreen,
  Main: MainTabs
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
