import React,{useEffect, useState} from 'react'
import {Initial} from '../Initial'
import img from '../../frontend-designs/profile.png'
import img2 from '../../frontend-designs/star.png'
import DateIndi from './Date';
import './Appointment.css'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { GetIndividual } from "../../redux/action/ListActions";


// const modes = individual.modes;
// const skills = individual.skills;




function Appointment({ match, individual, GetIndividual }) {
    const[audio,setAudio] = useState(false); 
    const[video,setVideo] = useState(false); 
    useEffect(()=>{
        // console.log(modes);
        // console.log(skills);
        GetIndividual(match.params.id)
        // console.log(id)
        console.log(individual);
        
    },[]);
    
    const handleClick = (value) =>{
        switch (value) {
            case 0:
                setAudio(false);
                setVideo(true);
                break;
            case 1:
                setAudio(true);
                setVideo(false);
                break;
            default:
                break;
        }
    }
    // const id = match.params.id;
    // const individual = Initial.filter((init)=>{return(init.id === 1)});





    return (
        <>
            
                
                    <div className="container" key={individual.expertId} >
            
                        <div className="upper-container">
                            <img src={individual.expertPath}></img>
                            <div className="container-right">
                                <h2>
                                    {individual.expertName}
                                </h2>
                                <h4>{individual.expertType}</h4>
                                <div className="star">
                                    <img src={img2} ></img>
                                    <img src={img2} ></img>
                                    <img src={img2} ></img>
                                    <img src={img2} ></img>
                                    <img src={img2} ></img>
                                </div>
                                {/* <p>modes: Audio, {indi.modes[1]}</p> */}
                                <div className="btn-class">
                                <button className={`btn ${audio?"btn-primary":"btn-secondary"}`} onClick={()=>{handleClick(1)}}>Audio</button>
                                <button className={`btn ${video?"btn-primary":"btn-secondary"}`} onClick={()=>{handleClick(0)}}>Video</button>
                                </div>
                                <div className="lower-container"> 
                                    <h4>Rs 250</h4>
                                </div>
                            </div>
                        </div>
                        <DateIndi expertId = {individual.expertId} expertName={individual.expertName}></DateIndi>
                                    {/* <button className = "btn-appointment"><Link to="/verify"> Appointment</Link></button> */}
                    </div>
                        
        
        </>
    )
}

Appointment.propTypes = {
    individual : PropTypes.object.isRequired,
    GetIndividual : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    individual : state.DoctorsReducer.individual
});


export default connect (mapStateToProps,{ GetIndividual })(Appointment);
