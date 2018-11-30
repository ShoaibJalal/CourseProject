import {
  SET_PROJECTS,
  REMOVE_PROJECTS,
  PROJECT_ADDED,
  START_ADD_PROJECT
} from "../actions/actionTypes";

const initialState = {
  projects: [],
  projectAdded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.projects
      };

    case REMOVE_PROJECTS:
      return {
        ...state,
        projects: state.projects.filter(project => {
          return project.key !== action.key;
        })
      };
    case START_ADD_PROJECT:
      return {
        ...state,
        projectAdded: false
      };
    case PROJECT_ADDED:
      return {
        ...state,
        projectAdded: true
      };
    default:
      return state;
  }
};
export default reducer;
