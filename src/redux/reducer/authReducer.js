import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_LOADING,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REMOVE_SUCCESS,
  } from '../type/Type';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    isError: false,
    user: null,
  };


export default function (state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
      case LOGIN_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          isError: false,
          user: action.payload,
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        console.log(action.payload);
        return {
          ...state,
          ...action.payload,
        //   token:action.payload.token,
          isAuthenticated: true,
          isLoading: false,
          isError: false,
        };
      case AUTH_ERROR:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          // isError: true,
        };
      case LOGIN_FAIL: 
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isError: true,
      };
      case REMOVE_SUCCESS:
        return{
          ...state,
          isError:false,
        }

      default:
        return state;
    }
  }