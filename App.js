import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose } from "redux";
import Main from "./Main";
import projectsReducer from "./src/store/reducers/projects";

const rootReducer = combineReducers({
  projects: projectsReducer
});
let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(rootReducer, composeEnhancers());

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
