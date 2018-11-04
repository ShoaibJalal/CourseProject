import {
  ADD_PROJECT,
  DELETE_PROJECT,
  DESELECT_PROJECT,
  SELECT_PROJECT
} from "../actions/actionTypes";
import projectImage from "../../../assets/project.jpg";
const initialState = {
  projects: [],
  selectedProject: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: state.projects.concat({
          key: Math.random(),
          name: action.projectName,
          image: projectImage
        })
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => {
          return project.key !== state.selectedProject.key;
        }),
        selectedProject: null
      };
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProject: state.projects.find(project => {
          return project.key === action.projectKey;
        })
      };
    case DESELECT_PROJECT:
      return {
        ...state,
        selectedProject: null
      };
    default:
      return state;
  }
};
export default reducer;
