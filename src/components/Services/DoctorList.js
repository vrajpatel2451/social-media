import React from 'react'
import './DoctorList.css'
import {Initial} from '../Initial'
import img from '../../frontend-designs/profile.png'
import img2 from '../../frontend-designs/star.png'
import {Link} from 'react-router-dom'



function DoctorList({ expertList }) {
    // console.log(expertList);
    const data = expertList;
    
    return (
        <>
        {
            (expertList === null || expertList === undefined)? <h1>loading....</h1> :
        <div className="doctor-list">
            {
                
                
                    
                    expertList.map(
                        (expert)=>{
                            return(
                            
                            <div className="container-list" key={expert.expertId}>
                                <div className="upper-container-list">
                                <img src={img}></img>
                                    <div className="container-right-list">
                                        <h2>
                                            {expert.expertName}
                                            </h2>
                                        <h4>{expert.expertType}</h4>
                                        <div className="star-list">
                                        <img src={img2} ></img>
                                        <img src={img2} ></img>
                                        <img src={img2} ></img>
                                        <img src={img2} ></img>
                                        <img src={img2} ></img>
                                        </div>
                                        <p>modes: Audio, Video</p>

                                        </div>
                                </div>
                                <div className="lower-container-list"> 
                                <Link to={`/services/${expert.expertId}`}>
                                    <button>Appointment</button>
                                    </Link>
                                    <h4>$ 124</h4>
                                </div>
                            </div>
                            
                            )
                            
                    }
                    )
                    
            }
        </div>
                        }
        </>
    )
}



export default DoctorList;
