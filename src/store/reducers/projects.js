import { ADD_PROJECT, DELETE_PROJECT } from "../actions/actionTypes";
import projectImage from "../../../assets/project.jpg";
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
          image: projectImage
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
