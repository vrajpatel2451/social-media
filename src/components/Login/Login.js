import React,{useEffect} from "react";
// import API from "./API";
import FormForLogin from "./FormForLogin";
import './Login.css'
import img from '../../frontend-designs/Illustration-4.svg'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { FadeLoader } from 'react-spinners'
import { toast } from "react-toastify";
import { removeError } from "../../redux/action/authAction";

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

const CustomToast = ({ closeToast }) => {
  return (
    <div>
      Something went wrong! <button onClick={closeToast}>Close</button>
    </div>
  )
}


function Login( props ) {
        const notify = () => {
          // debugger;
          toast.error(<CustomToast closeToast={props.removeError}/>, { position: toast.POSITION.TOP_CENTER });
        }

                useEffect(() => {
                  // const token = localStorage.getItem('token');
                  // console.log(props.history)
                  // if (props.history.properties === undefined || props.history.properties === null ) {
                  //   if (token) {
                  //     console.log("token1",token);
                  //     props.history.replace('/');
                  //   }
                  //   else{
                      
                  //     console.log("token2",token);
                  //   }
                  // }
                  // else{
                  //   const state = props.history.properties.state;
                  //   if (state) {
                  //     if (token) {
                  //       console.log("token1",token);
                  //       props.history.replace(state.getpath);
                  //     }
                  //     else{
                        
                  //       console.log("token2",token);
                  //     }
                  //   }
                  // }
                  
                  if (props.isError) {
                    notify();
                  }
                  
                }, [props.isError])
                if (props.isAuthenticated) {
                  return <Redirect to="/" />;
                }
      
  return (
    <div className="LoginFormMerge"> 
    <FadeLoader css={loaderCSS} size={50} color='black' loading={props.isLoading}  />       
      <FormForLogin></FormForLogin>
        <div className="image">
            <img src={img}></img>
        </div>
      {/* <API></API> */}
    </div>
  );
}

Login.propTypes = {
  removeError: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
  isError: state.authReducer.isError,
});

export default connect(mapStateToProps,{removeError}) (Login);
