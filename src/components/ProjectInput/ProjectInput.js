import React from "react";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const projectInput = props => (
  <DefaultInput
    placeholder="Project Name"
    value={props.projectName}
    onChangeText={props.onChangeText}
  />
);

export default projectInput;
