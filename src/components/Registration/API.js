import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function APIs() {
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
      </div>
    </div>
  );
}

export default APIs;
