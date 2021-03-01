import React, { useEffect,useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import img from '../../frontend-designs/Illustration-4.svg'
import './Success.css'
import moment from "moment";
import { toast } from "react-toastify";

const details ={
    name:"",
    date:"",
    time:"",
    status:"",
    amount:0
}

toast.configure();

const notify = (msg) => {
    // debugger;
    toast.error(msg, { position: toast.POSITION.TOP_CENTER });
  }

function Success(props) {
    const[name,setName]= useState("");
    const[date,setDate]= useState("");
    const[time,setTime]= useState("");
    const[status,setStatus]= useState("");
    const[amount,setAmount]= useState("");
    useEffect(()=>{
        if (localStorage.getItem('token')===null || localStorage.getItem('token')===undefined || localStorage.getItem('success')===null || localStorage.getItem('success')===undefined) {
            return <Redirect to ="/"></Redirect>;
        }
        else{
            if (props.history.location.state.success === undefined || props.history.location.state.success === null ){

                console.log('success',localStorage.getItem('success'),props.history);
                notify('Oops!something went wrong');
                localStorage.removeItem('name');
                localStorage.removeItem('date');
                localStorage.removeItem('success');
                localStorage.removeItem('time');
                return <Redirect to ="/"></Redirect>;
            }
            else{
                console.log('success02',props.history.location.state.success);
                // alert('yesssss!');
                const object = props.history.location.state.success;
                console.log('success03',object);
                details.date = object.bookingDate;
                setAmount(object.amount);
                setStatus(object.bookingStatus);
                setTime(object.bookingTime);
                setDate(object.bookingDate);
                setName(object.expertDto.expertName);
                details.time = object.bookingTime;
                details.name = object.expertDto.expertName;
                details.status = object.bookingStatus;
                details.amount = object.amount;
                console.log('success04',details);

            }
        }
    },[])
    const handleRemove =()=>{
        localStorage.removeItem('name');
        localStorage.removeItem('date');
        localStorage.removeItem('success');
        localStorage.removeItem('time');
    }
    return (
        <div className="success">

            <div className="details">
                <p className="go" onClick={handleRemove}><Link to="/">Go back</Link></p>
                <h1>Your Appointment Details</h1>
                <div className="details-list">
                    <div className="detail-individual">
                        <h6>Expert</h6>
                        <p>{name}</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Date</h6>
                        <p>{moment(date,'yyyy-mm-dd').format('MMM Do')}</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Time</h6>
                        <p>{moment(time,'hh:mm:ss').format('h:mm a')}</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Type</h6>
                        <p>video</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Charges</h6>
                        <p>Rs {amount}</p>
                    </div>
                    <div className="detail-individual">
                        <h6>Payment status</h6>
                        <p>{status}</p>
                    </div>
                </div>
                    <h2>Your session joining link will be sent on your Email id and contact number.</h2>
            </div>
            <img src={img}></img>
        </div>
    )
}

export default Success
