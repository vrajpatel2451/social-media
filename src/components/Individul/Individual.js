import React,{useEffect} from 'react'
import {Initial} from '../Initial'
import img from '../../frontend-designs/profile.png'
import img2 from '../../frontend-designs/star.png'
import './Individual.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { GetIndividual } from "../../redux/action/ListActions";


// const modes = individual.modes;
// const skills = individual.skills;


function Individual({ match, individual, GetIndividual }) {
    useEffect(()=>{
        // console.log(modes);
        // console.log(skills);
        // console.log(id)
        console.log(individual);
        // debugger;
        GetIndividual(match.params.id);
        // axios.get(`http://107.23.113.233:8080/MentalcareCommunity/expert/${id}`)
        // .then((res)=>{
        //     console.log(res.data.data);
        // })
        // .catch((err)=>{
        //     console.log(err);
        // })
        
    },[]);
    
    // const id = match.params.id;
    // const individual = Initial.filter((init)=>{return(init.id === 1)});



    console.log(individual);

    return (
        <>
            
                return({
                    (individual===undefined || individual=== null || individual=== {})?<h1>loading...</h1>:
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
                                        <p>modes: Audio, Video</p>

                                <div className="lower-container"> 
                                    <button><Link to={`/services/${individual.expertId}/appointment`}>Appointment</Link></button>
                                    <h4>Rs. 250</h4>
                                </div>
                                    </div>
                                </div>
                                <div className="middle-container">
                                    <div className="skills">
                                        <h2>Skills</h2>
                                        <ul>
                                            <li>love</li>
                                            <li>relationship</li>
                                            <li>mood swings</li>
                                            <li>anger</li>
                                            <li>marriage</li>
                                        </ul>
                                    </div>
                                    <div className="education-experience">
                                        <div className="education">
                                            <h1>Education</h1>
                                            <p>-Msc. in physcology</p>
                                        </div>
                                        <div className="experience">
                                            <h1>Experience</h1>
                                            <p>-expert counseller at corporates</p>
                                        </div>
                                    </div>

                             </div>
                                            <div className="lower-container-main">
                                                <h1>Summary</h1>
                                                <p>
                                                Priya Patel is a trained Psychologist, psychotherapist with 5 years of experience in the field of Psychology, mental Health and Psychotherapy, working with corporate, family, work related, clinical assessments and psychotherapy for both children and adults from different age groups and cultural background.
                                                </p>
                                            </div>
        </div>
            
        }
        );

        </>
    )
}


Individual.propTypes = {
    individual : PropTypes.object.isRequired,
    GetIndividual : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    
    individual : state.DoctorsReducer.individual
});


export default connect (mapStateToProps,{ GetIndividual })(Individual);
