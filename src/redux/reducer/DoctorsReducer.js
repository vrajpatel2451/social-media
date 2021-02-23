import { GET_LIST, GET_INDIVIDUAL } from '../type/Type'

const initialState = {
    list : [],
    individual : {}
}

 const DoctorsReducer = (state = initialState , action ) => {
    switch (action.type) {
        case GET_LIST:
            return{
                ...state,
                list: action.payload
            }
            
        case GET_INDIVIDUAL:
            // debugger;
            return{
                ...state,
                list: [],
                individual : action.payload
            }
        default:
            return state;
    }
}

export default DoctorsReducer;