import { REMOVE_PROJECTS, SET_PROJECTS } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

export const addProject = (projectName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());

    fetch("https://us-central1-projectsapp17.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
      .catch(err => {
        console.log(err);
        alert("Error occured!!! Try again...");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const projectData = {
          name: projectName,
          location: location,
          image: parsedRes.imageUrl
        };

        return fetch("https://projectsapp17.firebaseio.com/projects.json", {
          method: "POST",
          body: JSON.stringify(projectData)
        });
      })
      .catch(err => {
        console.log(err);
        alert("Error occured!!! Try again...");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
      });
  };
};

export const getProjects = () => {
  return dispatch => {
    fetch("https://projectsapp17.firebaseio.com/projects.json")
      .catch(err => {
        console.log(err);
        alert("Couldn't get data from the server.");
      })
      .then(res => res.json())
      .then(parsedRes => {
        const projects = [];
        for (let key in parsedRes) {
          projects.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }

        dispatch(setProjects(projects));
      });
  };
};
export const setProjects = projects => {
  return {
    type: SET_PROJECTS,
    projects: projects
  };
};

export const deleteProject = key => {
  return dispatch => {
    dispatch(removeProjects(key));
    fetch("https://projectsapp17.firebaseio.com/projects/" + key + ".json", {
      method: "DELETE"
    })
      .catch(err => {
        console.log(err);
        alert("Couldn't delete the Project from server.");
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Deleted!");
      });
  };
};

export const removeProjects = key => {
  return {
    type: REMOVE_PROJECTS,
    key: key
  };
};
