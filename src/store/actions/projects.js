import {
  ADD_PROJECT,
  DELETE_PROJECT,
  SELECT_PROJECT,
  DESELECT_PROJECT
} from "./actionTypes";

export const addProject = projectName => {
  return {
    type: ADD_PROJECT,
    projectName: projectName
  };
};

export const deleteProject = () => {
  return {
    type: DELETE_PROJECT
  };
};

export const selectProject = key => {
  return {
    type: SELECT_PROJECT,
    projectKey: key
  };
};

export const deselectProject = () => {
  return {
    type: DESELECT_PROJECT
  };
};
