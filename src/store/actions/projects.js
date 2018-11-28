import { REMOVE_PROJECTS, SET_PROJECTS } from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const addProject = (projectName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid Token exists!");
      })
      .then(token => {
        authToken = token;
        return fetch(
          "https://us-central1-projectsapp17.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Projects " + authToken
            }
          }
        );
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

        return fetch(
          "https://projectsapp17.firebaseio.com/projects.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify(projectData)
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
      })
      .catch(err => {
        console.log(err);
        alert("Error occured!!! Try again...");
        dispatch(uiStopLoading());
      });
  };
};

export const getProjects = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          "https://projectsapp17.firebaseio.com/projects.json?auth=" + token
        );
      })
      .catch(() => {
        alert("No valid Token exists!");
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
      })
      .catch(err => {
        console.log(err);
        alert("Couldn't get data from the server.");
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
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid Token exists!");
      })
      .then(token => {
        dispatch(removeProjects(key));
        return fetch(
          "https://projectsapp17.firebaseio.com/projects/" +
            key +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Deleted!");
      })
      .catch(err => {
        console.log(err);
        alert("Couldn't delete the Project from server.");
      });
  };
};

export const removeProjects = key => {
  return {
    type: REMOVE_PROJECTS,
    key: key
  };
};
