import React from "react";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const projectInput = props => (
  <DefaultInput
    placeholder="Project Name"
    value={props.projectData.value}
    valid={props.projectData.valid}
    touched={props.projectData.touched}
    onChangeText={props.onChangeText}
  />
);

export default projectInput;
