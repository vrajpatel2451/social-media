import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
const initialValues = {
    
  email: "",
  password: ""
};

// const final ={
//   username:"",
//   password:""
// }


// const validateComments = (values) => {
//     let error;
//     if (!values) {
//         error = "Required";
//     }
//     return error;
// };




function FormForLogin() {
    const [formValues, setFormValues] = useState(initialValues);
    const history = useHistory();
    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setFormValues(
            
    //         e.target.name = e.target.value,
    //     )
    // };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        const form_data = new FormData();
        form_data.set('username',formValues.email);
        form_data.set('password',formValues.password);
        // final.username = formValues.email;
        // final.password = formValues.password;
        console.log(form_data)
        axios.post("http://107.23.113.233:8080/MentalcareCommunity/loginrequest",form_data)
        .then((response)=>{
          console.log(response.data.token);
          const token = response.data.token;
          localStorage.setItem("token",token);
        })
        .catch((error)=>{
          console.log(error);
        })
    
    };
  return (
    <div className="FormForLogin">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              
              <div className="formLogin">
                <input className="FieldClassLogin" type="text" name="email" id="email" value ={formValues.email} onChange={(e)=>{setFormValues({...formValues,email : e.target.value})}}></input>
                <label htmlFor="email">email</label>
              
              </div>

              <div className="formLogin">
                <input className="FieldClassLogin" type="password" name="password" id="password" value = {formValues.password} onChange={(e)=>setFormValues({...formValues,password : e.target.value})}></input>
                <label htmlFor="password">password</label>
              
              </div>
              <button
                className="buttonLogin"
                id="submitButtonLogin"
                type="submit"
              >
                Log In
              </button>
            </form>
          <h1><Link to="/registration">Don't have account? SignUp</Link></h1>
    </div>
  );
}

export default FormForLogin;