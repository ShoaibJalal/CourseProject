import { ADD_PROJECT, DELETE_PROJECT } from "./actionTypes";

export const addProject = projectName => {
  return {
    type: ADD_PROJECT,
    projectName: projectName
  };
};

export const deleteProject = key => {
  return {
    type: DELETE_PROJECT,
    projectKey: key
  };
};
