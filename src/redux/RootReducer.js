import {combineReducers} from 'redux'
import DoctorsReducer from './reducer/DoctorsReducer'
import authReducer from './reducer/authReducer'
import messageReducer from './reducer/messageReducer'
import errorReducer from './reducer/errorReducer'
export default combineReducers({
   DoctorsReducer,
   authReducer,
   messageReducer,
   errorReducer
});