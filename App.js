import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import Main from "./Main";
import projectsReducer from "./src/store/reducers/projects";

const rootReducer = combineReducers({
  projects: projectsReducer
});
const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
