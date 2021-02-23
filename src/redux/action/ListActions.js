import axios from 'axios'
import {GET_LIST,GET_INDIVIDUAL} from '../type/Type'

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
    // debugger;
    axios.get(`http://107.23.113.233:8080/MentalcareCommunity/expert/${id}`)
    .then((res)=>{
        console.log(res.data.data)
        dispatch({
            type : GET_INDIVIDUAL,
            payload : res.data.data
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}