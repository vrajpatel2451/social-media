import React, { useRef, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {useHistory} from 'react-router-dom'
import { login } from '../../redux/action/authAction';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const initialValues = {    
  username: "",
  password: ""
};

function FormForLogin({isAuthenticated, login}) {
    const [formValues, setFormValues] = useState(initialValues);
    const form = useRef(null);
    // const history = useHistory();
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
        form_data.set('username',formValues.username);
        form_data.set('password',formValues.password);
        var options = { content: form_data };
        console.log("outer",form);
        console.log("outer",options);
    // // Request Body
    // axios.post('http://107.23.113.233:8080/MentalcareCommunity/loginrequest', form_data)
    //             .then((res) => {
    //                 debugger;
    //                 console.log(res);
    //                 // dispatch({
    //                 // type: LOGIN_SUCCESS,
    //                 // payload: res.data.data,
    //                 // });
    //             })
    //             .catch((err) => {
    //                 debugger;
    //                 alert('hi');
    //                 // dispatch(returnErrors(err.response.data, err.response.status));
    //                 // dispatch({
    //                 // type: LOGIN_FAIL,
    //                 // });
    //             });
    // const body = JSON.stringify({ userName:username, password });

        debugger;
        login(form_data);
    };
  return (
    <div className="FormForLogin">
            <form ref={form} onSubmit={(e)=>{handleSubmit(e)}}>
              
              <div className="formLogin">
                <input className="FieldClassLogin" type="text" name="email" id="email" value ={formValues.username} onChange={(e)=>{setFormValues({...formValues,username : e.target.value})}}></input>
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

FormForLogin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect( mapStateToProps,{ login }) (FormForLogin);