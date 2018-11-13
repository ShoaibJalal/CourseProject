import React, { Component } from "react";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

class ProjectInput extends Component {
  state = {
    projectName: ""
  };
  // Will allow to set the name
  projectNameChangedHandler = event => {
    this.setState({
      projectName: event
    });
  };

  render() {
    return (
      <DefaultInput
        placeholder="Project Name"
        value={this.state.projectName}
        onChange={this.projectNameChangedHandler}
      />
    );
  }
}

export default ProjectInput;
