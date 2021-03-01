import axios from 'axios';
import React,{useState,useEffect} from 'react'
import './Otp.css'
import {Redirect, useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const initialValues = {}

const notify = (msg) => {
    // debugger;
    toast.error(msg, { position: toast.POSITION.TOP_CENTER });
  }
const success = (msg) => {
    // debugger;
    toast.success(msg, { position: toast.POSITION.TOP_CENTER });
  }

  const validationSchema = Yup.object({
    otpValue:Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(6, 'Must be exactly 6 digits')
            .max(6, 'Must be exactly 6 digits'),
  })

function Otp(props) {
    const [Otp, setOtp] = useState({});
    const [load, setLoad] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    useEffect(()=>{
      if (props.isAuthenticated) {
        return <Redirect to="/" />;
      }
    },[])
    // const [finalOtp, setFinalOtp] = useState({});
    const history = useHistory();
    const handleSubmit = (value,submitProps) => {
        // e.preventDefault();
        setLoad(true);
        // setFinalOtp({...finalOtp,userOtp:Otp});
        // debugger;
        console.log(value);
        axios.post("http://107.23.113.233:8080/MentalcareCommunity/registration/otpverify",value)
        .then((response)=>{
          // debugger;
          submitProps.setSubmitting(false);
          submitProps.resetForm();
          setLoad(false);
          if(response.data.data==="Otp is incorrect"){
            // debugger;
            console.log(response.data.data);
            notify("Otp is incorrect");
          }
          else if (response.data.data==="try to resend otp") {
            notify("Try to resend otp");
            
          }
          else{
            // debugger;
            history.push('/login');
          }
          
        })
        .catch((error)=>{
          // debugger;
          setLoad(false);
          submitProps.setSubmitting(false);
          submitProps.resetForm();
          console.log(error);
          notify("Oops!,something went wrong");
        })
        
      };
      
      const handleReset = ()=>{
        setLoad(true);
        if (localStorage.getItem('userKey')===null|| localStorage.getItem('userKey')===undefined) {
          notify("something went wrong!");
          setLoad(false);
          
        } 
        else {
          
        
        const userKey = localStorage.getItem('userKey');
        axios.get(`http://107.23.113.233:8080/MentalcareCommunity/registration/resend?key=${userKey}`)
        .then((res)=>{
          setLoad(false);
          if(res.data.status==="otp resend"){
            success("Otp sent to your email");
            
          }
          else if (res.data.status==="key not valid") {
            
            notify("something went wrong!");
          }
        })
        .catch((err)=>{
          setLoad(false);
          notify("something went wrong!");
          console.log(err);
        })
      }
      }

    return (
        <div className="otp-container">
            
    <FadeLoader css={loaderCSS} size={50} color='black' loading={load}  /> 
            <div className="info">
                <h1 className="font-primary" id="verify-primary">
                    Verify Your Account
                </h1>
                <p className="font-secondary">
                    Provide otp which has been sent to your <span>Email</span>
                </p>
            </div>
            <div className="FormForLogins otps">
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
                <label htmlFor="otpValue">Otp</label>
                <Field className="FieldClassLogins" type="number" name="otpValue" id="otpValue"
                //  value ={Otp.otpValue} onChange={(e)=>{setOtp({...Otp,otpValue : e.target.value})}}
                 ></Field>
                <ErrorMessage name='otpValue' component={TextError} />
              </div>

              
              <button
                className="buttonOtp"
                id="submitButtonOtp"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Verify
              </button>
              <button type="reset"
                className="buttonOtp"
                id="resendButtonOtp"
                onClick={handleReset}
                >
                  Resend Otp
              </button>
              </Form>)
            }}
            </Formik>
            </div>


        </div>
    )
}

Otp.propTypes = {
  // login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated : state.authReducer.isAuthenticated,
})

export default connect(mapStateToProps) (Otp)
