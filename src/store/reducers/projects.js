import { SET_PROJECTS, REMOVE_PROJECTS } from "../actions/actionTypes";

const initialState = {
  projects: []
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

    default:
      return state;
  }
};
export default reducer;
