import React, { useEffect, useState } from 'react'
import img from '../../frontend-designs/couple.svg'
import DoctorList from './DoctorList'
import './Services.css'
import  axios  from "axios";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { GetList } from "../../redux/action/ListActions";


function Services({ list, GetList }) {
    // const[list,setList] = useState({});
    useEffect(()=>{
        GetList();
    },[])

    return (
        
            <div className="services">
                <div className="upper-services">

                <div className="left-services">

                <h1>Select Your Expert</h1>
                <p>Select your ReFreshh Expert and we will book the appointment for you.</p>
                </div>
                <img src={img}></img>
                </div>
                <div className="suggession">
                    <h4>Your Suggession</h4>
                    <h5>See all</h5>
                </div>
                <DoctorList expertList = {list}></DoctorList>
            </div>
        
    )
}

Services.propTypes = {
    list : PropTypes.array.isRequired,
    GetList : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    list : state.DoctorsReducer.list
});


export default connect (mapStateToProps,{ GetList }) (Services);
