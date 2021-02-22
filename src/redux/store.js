import {createStore ,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import RootReducer from './RootReducer'

const initialState = {};

const middlWare = [thunk];

const store = createStore(
    RootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlWare))
)

export default store;