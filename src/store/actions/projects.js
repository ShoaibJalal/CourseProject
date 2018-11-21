import { ADD_PROJECT, DELETE_PROJECT } from "./actionTypes";

export const addProject = (projectName, location, image) => {
  return {
    type: ADD_PROJECT,
    projectName: projectName,
    location: location,
    image: image
  };
};

export const deleteProject = key => {
  return {
    type: DELETE_PROJECT,
    projectKey: key
  };
};
