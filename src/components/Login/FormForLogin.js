import React, { useRef, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {useHistory} from 'react-router-dom'
import { login } from '../../redux/action/authAction';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField
} from 'formik'
import * as Yup from 'yup'
import TextError from '../TextError'


const initialValues = {    
  email: "",
  password: ""
};

const validationSchema = Yup.object({
  // userName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  password: Yup.string().required('Required')
  
  // confirmPassword: Yup.string().required('Required')
  // .oneOf([Yup.ref('userPassword'), null], 'Passwords must match')
})

function FormForLogin({isAuthenticated,isLoading, login}) {
    const [formValues, setFormValues] = useState(initialValues);
    const [load, setLoad] = useState(false);
    const form = useRef(null);
    // const history = useHistory();
    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setFormValues(
            
    //         e.target.name = e.target.value,
    //     )
    // };
    
    const handleSubmit = (values,submitProps) => {
        // e.preventDefault();
        
        submitProps.setSubmitting(false);
        submitProps.resetForm();
        console.log("hello",values);
        const form_data = new FormData();
        form_data.set('username',values.email);
        form_data.set('password',values.password);
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

        // debugger;
        login(form_data);
    };
  return (
    <div className="FormForLogins">
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
              // onSubmit={(e)=>{handleSubmit(e)}}
             >
            {formik => {
                console.log('Formik props', formik)
            return (
            <Form>
              <div className="formLogins">
                <label htmlFor="email">email</label>
                <Field className="FieldClassLogins" type="email" name="email" id="email"
                // value ={formValues.username} onChange={(e)=>{setFormValues({...formValues,username : e.target.value})}}
                ></Field>
                <ErrorMessage name='email' component={TextError} />
              </div>

              <div className="formLogins">
                <label htmlFor="password">password</label>
                <Field className="FieldClassLogins" type="password" name="password" id="password"
                // value = {formValues.password} onChange={(e)=>setFormValues({...formValues,password : e.target.value})}
                ></Field>
                <ErrorMessage name='password' component={TextError} />
              </div>
              <button
                className="buttonLogin"
                id="submitButtonLogin"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Log In
              </button>
              </Form>)
            }}
            </Formik>
          <h1><Link to="/registration">Don't have account? SignUp</Link></h1>
    </div>
  );
}

FormForLogin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading:state.authReducer.isLoading
});

export default connect( mapStateToProps,{ login }) (FormForLogin);