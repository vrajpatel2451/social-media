import axios from "axios";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

function APIs() {
  
  const responseFacebook = (response) => {
    console.log(response);
    const accessToken = response.accessToken;
    axios.post("https://107.23.113.233:8080/MentalcareCommunity/login/facebooklogin",{accessToken})
    .then((res)=>{
      alert('hi')
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const responseGoogle = (response) => {
    console.log(response);
  }



  return (
    <div className="APIs">
      <div className="border-for-sign-in">
        <button className="buttonAPI" id="submitButtonSign" type="button">
          <span className=" buttonText buttonT">
            <Link to="/login">
            Already have account?
            <span className="buttonText" id="signin">
              Login
            </span>
            </Link>
          </span>
        </button>
      </div>

      <div className="orBetweenLine">or</div>
      <div>
        <button className="buttonAPI" id="submitButtonG" type="button">
          <span className="iconButton">
            <FaGoogle color="rgb(179, 36, 36)" size="2rem"></FaGoogle>
          </span>
          <span className="buttonText buttonT">Continue with Google</span>
        </button>
        <button className="buttonAPI" id="submitButtonFB" type="button">
          <span className="iconButton">
            <FaFacebook color="#0048a7" size="2rem"></FaFacebook>
          </span>
          <span className="buttonText buttonT">Continue with facebook</span>
        </button>
        <FacebookLogin
          appId="221540753039201"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          callback={responseFacebook} />
          <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com1097095522339-rqsssqjhl1e60960phdbjhser2kurj9l.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          />
      </div>
    </div>
  );
}

export default APIs;
