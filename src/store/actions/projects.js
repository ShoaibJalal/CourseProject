import {
  REMOVE_PROJECTS,
  SET_PROJECTS,
  PROJECT_ADDED,
  START_ADD_PROJECT
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

//Starting Add process
export const startAddProject = () => {
  return {
    type: START_ADD_PROJECT
  };
};

// Posting data to backend
export const addProject = (projectName, location, image, starCount) => {
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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const projectData = {
          name: projectName,
          location: location,
          starCount: starCount,
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath
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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        dispatch(projectAdded());
      })
      .catch(err => {
        console.log(err);
        alert("Error occured!!! Try again...");
        dispatch(uiStopLoading());
      });
  };
};
//WHen project is successfully added
export const projectAdded = () => {
  return {
    type: PROJECT_ADDED
  };
};

//TO read data from Backend
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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
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

//Storing projects in reducer state
export const setProjects = projects => {
  return {
    type: SET_PROJECTS,
    projects: projects
  };
};

// deleting a project from view and backend
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
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log("Deleted!");
      })
      .catch(err => {
        console.log(err);
        alert("Couldn't delete the Project from server.");
      });
  };
};

// Reomving project from the view
export const removeProjects = key => {
  return {
    type: REMOVE_PROJECTS,
    key: key
  };
};
