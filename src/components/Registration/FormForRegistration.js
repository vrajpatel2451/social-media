import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'

const initialValues = {
    userName:"",
    userEmail: "",
    userPassword: "",
    confirmPassword: ""
};


const final ={
  userName:"",
  userEmail: "",
  userPassword: "",

}

const validateComments = (values) => {
    let error;
    if (!values) {
        error = "Required";
    }
    return error;
};




function FormForRegistration({register}) {
    const [formValues, setFormValues] = useState(initialValues);
    // const [finalFormValues, setFinalFormValues] = useState(final);
    const history = useHistory();
    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setFormValues(
            
    //         e.target.name = e.target.value,
    //     )
    // };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].attributes.value.nodeValue);
        // setFinalFormValues({
        //   ...finalFormValues,
        //   userName:e.target[0].attributes.value.nodeValue,
        //   // userEmail:e.target[1].attributes.value.nodeValue,
        //   // userPassword:e.target[2].attributes.value.nodeValue
        // });
        final.userName = formValues.userName;
        final.userEmail = formValues.userEmail;
        final.userPassword = formValues.userPassword;
        console.log(final);
        axios.post("http://107.23.113.233:8080/MentalcareCommunity/registration/user",final)
        .then((response)=>{
          console.log(response);
          history.push('/otp-verification');
        })
        .catch((error)=>{
          
          console.log(error);
        })
        // const { userName, userEmail, userPassword } = formValues;
        
        // const newUser = {
        //   userName,
        //   userEmail,
        //   userPassword
        // };
        // register(newUser);
    };
  return (
    <div className="FormForLogin">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              <div className="formLogin">
                <input className="FieldClassLogin" type="text" name="userName" id="userName" value ={formValues.userName} onChange={(e)=>{setFormValues({...formValues,userName : e.target.value})}}></input>
                <label htmlFor="userName">User Name</label>
              
              </div>
              <div className="formLogin">
                <input className="FieldClassLogin" type="text" name="userEmail" id="userEmail" value ={formValues.userEmail} onChange={(e)=>{setFormValues({...formValues,userEmail : e.target.value})}}></input>
                <label htmlFor="userEmail">email</label>
              
              </div>

              <div className="formLogin">
                <input className="FieldClassLogin" type="password" name="userPassword" id="userPassword" value = {formValues.userPassword} onChange={(e)=>setFormValues({...formValues,userPassword : e.target.value})}></input>
                <label htmlFor="userPassword">password</label>
              </div>
              <div className="formLogin">
                <input className="FieldClassLogin" type="password" name="confirmPassword" id="confirmPassword" value ={formValues.confirmPassword} onChange={(e)=>setFormValues({...formValues,confirmPassword : e.target.value})}></input>
                <label htmlFor="confirmPassword">Confirm Password</label>
              
              </div>
              <button
                className="buttonLogin"
                id="submitButtonLogin"
                type="submit"
              >
                Log In
              </button>
            </form>
          
    </div>
  );
}

// FormForRegistration.propTypes = {
//   register: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// };

// const mapStateToProps = (state)=>{
//   isAuthenticated: state.authReducer.isAuthenticated
// }

export default  FormForRegistration;
