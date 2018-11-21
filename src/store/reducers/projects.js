import { ADD_PROJECT, DELETE_PROJECT } from "../actions/actionTypes";

const initialState = {
  projects: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: state.projects.concat({
          key: Math.random(),
          name: action.projectName,
          image: {
            uri: action.image.uri
          },
          location: action.location
        })
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => {
          return project.key !== action.projectKey;
        })
      };

    default:
      return state;
  }
};
export default reducer;
