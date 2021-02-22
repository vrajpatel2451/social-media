import React from 'react'
import img from '../../frontend-designs/Illustration-4.svg'
import './Success.css'
function Success() {
    return (
        <div className="success">
            <div className="details">
                <h1>Your Appointment Details</h1>
                <div className="details-list">
                    <div className="detail-individual">
                        <h6>Expert</h6>
                        <p>Vraj Patel</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Date</h6>
                        <p>Dec,26</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Time</h6>
                        <p>9:38 am</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Type</h6>
                        <p>video</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Charges</h6>
                        <p>Rs 859</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Payment status</h6>
                        <p>paid</p>
                    </div>
                    <h2>Your session joining link will be sent on your Email id and contact number.</h2>
                </div>
            </div>
            <img src={img}></img>
        </div>
    )
}

export default Success
