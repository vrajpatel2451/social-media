import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import {useHistory ,Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { FadeLoader } from 'react-spinners'
import { toast } from "react-toastify";
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

const loaderCSS = css`
  position:fixed;
  top:50%;
  left:50%;
  width:100px;
  height:100px;
  transform:translate(-50%,-50%);
  overflow:visible;
`
toast.configure();
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
    const [load, setLoad] = useState(false);
    // const [finalFormValues, setFinalFormValues] = useState(final);
    const history = useHistory();
    const notify = (msg) => {
      // debugger;
      toast.error(msg, { position: toast.POSITION.TOP_CENTER });
    }
    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setFormValues(
            
    //         e.target.name = e.target.value,
    //     )
    // };
    
    const handleSubmit = (values,submitProps) => {
        // e.preventDefault();
        setLoad(true);
        // console.log(values);
        // console.log(e.target[0].attributes.value.nodeValue);
        // setFinalFormValues({
        //   ...finalFormValues,
        //   userName:e.target[0].attributes.value.nodeValue,
        //   // userEmail:e.target[1].attributes.value.nodeValue,
        //   // userPassword:e.target[2].attributes.value.nodeValue
        // });
        if (values.userPassword === values.confirmPassword) {
          
          
          final.userName = values.userName;
          final.userEmail = values.userEmail;
          final.userPassword = values.userPassword;
          console.log(final);
          axios.post("http://107.23.113.233:8080/MentalcareCommunity/registration/user",final)
          .then((response)=>{
            
            setLoad(false);
            if (response.data.data==="user already exist") {
              notify("user already exist!")
              console.log(response.data.data);
              submitProps.setSubmitting(false);
              submitProps.resetForm();
            } else {
              // setLoad(false);
              console.log(response);
              localStorage.setItem('userKey',response.data.data);
              history.push('/otp-verification');
              submitProps.setSubmitting(false);
              submitProps.resetForm();
            }
          })
          .catch((error)=>{
            setLoad(false);
            notify("Opps! Something went wrong. try later")
            submitProps.setSubmitting(false);
            submitProps.resetForm();
            console.log(error);
          })
        } else {
          setLoad(false);
          notify("please enter matching password")
          submitProps.setSubmitting(false);
          submitProps.resetForm();
        }
          // const { userName, userEmail, userPassword } = formValues;
          
          // const newUser = {
            //   userName,
            //   userEmail,
            //   userPassword
            // };
            // register(newUser);
          };

          const validationSchema = Yup.object({
            userName: Yup.string().required('Required'),
            userEmail: Yup.string()
              .email('Invalid email format')
              .required('Required'),
            userPassword: Yup.string().required('Required')
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
              "Password must be strong"
            ),
            confirmPassword: Yup.string().required('Required')
            .oneOf([Yup.ref('userPassword'), null], 'Passwords must match')
          })

  return (
    <div className="FormForLogins">
      
    <FadeLoader css={loaderCSS} size={50} color='black' loading={load}  /> 
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
              // onSubmit={(e)=>{handleSubmit(e)}}
             >
            {formik => {
                // console.log('Formik props', formik)
            return (
            <Form>
              <div className="formLogins">
                <label htmlFor="userName">User Name</label>
                <Field className="FieldClassLogins" type="text" name="userName" id="userName"
                //  value ={formValues.userName} onChange={(e)=>{setFormValues({...formValues,userName : e.target.value})}}
                ></Field>
                <ErrorMessage name='userName' component={TextError} />
              </div>
              <div className="formLogins">
                <label htmlFor="userEmail">email</label>
                <Field className="FieldClassLogins" type="text" name="userEmail" id="userEmail" 
                // value ={formValues.userEmail} onChange={(e)=>{setFormValues({...formValues,userEmail : e.target.value})}}
                ></Field>
                <ErrorMessage name='userEmail' component={TextError} />
              </div>

              <div className="formLogins">
                <label htmlFor="userPassword">password</label>
                <Field className="FieldClassLogins" type="password" name="userPassword" id="userPassword"
                //  value = {formValues.userPassword} onChange={(e)=>setFormValues({...formValues,userPassword : e.target.value})}
                 ></Field>
                <ErrorMessage name='userPassword' component={TextError} />
              </div>

              <div className="formLogins">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field className="FieldClassLogins" type="password" name="confirmPassword" id="confirmPassword"
                // value ={formValues.confirmPassword} onChange={(e)=>setFormValues({...formValues,confirmPassword : e.target.value})}
                ></Field>
                <ErrorMessage name='confirmPassword' component={TextError} />
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
            <h1><Link to="/login">Already have an account? Log in</Link></h1>
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
