import Axios from 'axios';
import { returnErrors } from './messages';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_LOADING,
  REMOVE_SUCCESS
} from '../type/Type';
import { Redirect } from 'react-router-dom';


toast.configure();

const notify = (msg) => {
  // debugger;
  toast.error(msg, { position: toast.POSITION.TOP_CENTER })
}


export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });
    
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined ){
      // debugger;
      dispatch({
        type: AUTH_ERROR,
      });
    }
    else{
      // debugger;
      dispatch({
            type: USER_LOADED,
            payload: localStorage.getItem('token'),
          });
        }
      };
      
      
      
      
      export const login = (form_data) => (dispatch) => {
        
        // var form_data = new FormData();
        // form_data.set('username',"19039011@g.i");
        // form_data.set('password',"dhdd");
        // // Request Body
        // // const body = JSON.stringify({ userName:username, password });
        // debugger;
        dispatch({ type: LOGIN_LOADING });
        console.log("inner",form_data);
        // dispatch({ type: USER_LOADING });
        Axios.post('http://107.23.113.233:8080/MentalcareCommunity/loginrequest', form_data)
        .then((res) => {
          // debugger;
          console.log("vraj",res.data.data);
          if (res.data.data === "invalid username and passwords" ) {
            // alert('invalid username or password');
            // dispatch(returnErrors(err.response.data, err.response.status));
                        notify("invalid username or password");
                        dispatch({
                          type: LOGIN_FAIL,
                        });
                      }
          else if(res.data.data==="verify your account"){
              notify("Verify your account");
              dispatch({
                type: LOGIN_FAIL,
              });
              return <Redirect to="/"></Redirect>

          }          
          else{

                        // debugger;
                        console.log("neel",res.data);
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: res.data,
                        });
                    }
                })
                .catch((err) => {
                    // debugger;
                    // alert('something went wrong');
                    notify('something went wrong');
                    // dispatch(returnErrors(err.response.data, err.response.status));
                    dispatch({
                    type: LOGIN_FAIL,
                    });
                });
  };


  export const register = ({ username, email , password }) => (dispatch) => {
    // Request Body
    const body = JSON.stringify({ userName:username, userEmail:email, userPassword:password });
  
    Axios
      .post('/api/auth/register', body)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };  



  export const logout = () => (dispatch) => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      
  };
  
  export const removeError = () => (dispatch) => {
        dispatch({
          type: REMOVE_SUCCESS,
        });
      
  };

