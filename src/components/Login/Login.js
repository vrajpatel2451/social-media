import React,{useEffect} from "react";
// import API from "./API";
import FormForLogin from "./FormForLogin";
import './Login.css'
import img from '../../frontend-designs/Illustration-4.svg'
import { Redirect } from "react-router-dom";

function Login( props ) {

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(props.history)
    if (props.history.properties === undefined || props.history.properties === null ) {
      if (token) {
        console.log("token1",token);
        props.history.replace('/');
      }
      else{
        
        console.log("token2",token);
      }
    }
    else{
      const state = props.history.properties.state;
      if (state) {
        if (token) {
          console.log("token1",token);
          props.history.replace(state.getpath);
        }
        else{
          
          console.log("token2",token);
        }
      }
    }
  }, [])

  return (
    <div className="LoginFormMerge">        
      <FormForLogin></FormForLogin>
        <div className="image">
            <img src={img}></img>
        </div>
      {/* <API></API> */}
    </div>
  );
}

export default Login;
