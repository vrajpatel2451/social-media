import React from "react";
import API from "./API";
import FormForRegistration from "./FormForRegistration";
import './Registration.css'

function Login() {
  return (
    <div className="LoginFormMerge">
      <FormForRegistration></FormForRegistration>

      <API></API>
    </div>
  );
}

export default Login;
