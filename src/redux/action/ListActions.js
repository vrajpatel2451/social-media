import axios from 'axios'
import {GET_LIST} from '../type/Type'

export const GetList = () => dispatch => {
    axios.get("http://107.23.113.233:8080/MentalcareCommunity/expert/expertlist")
    .then((res)=>{
        dispatch({
            type : GET_LIST,
            payload : res.data.data
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const GetIndividual = (id) => dispatch => {
    axios.get(`http://107.23.113.233:8080/MentalcareCommunity/expert/${id}`)
    .then((res)=>{
        dispatch({
            type : GET_LIST,
            payload : res.data.data
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}