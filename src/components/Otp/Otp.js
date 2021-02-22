import axios from 'axios';
import React,{useState} from 'react'
import './Otp.css'
import {useHistory} from 'react-router-dom'

function Otp() {
    const [Otp, setOtp] = useState({});
    // const [finalOtp, setFinalOtp] = useState({});
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        // setFinalOtp({...finalOtp,userOtp:Otp});
        console.log(Otp);
        axios.post("http://107.23.113.233:8080/MentalcareCommunity/registration/otpverify",Otp)
        .then((response)=>{
            console.log(response);
            history.push('/login');
            
        })
        .catch((error)=>{
            console.log(error);
        })
    
    };
    return (
        <div className="otp-container">
            
            <div className="info">
                <h1 className="font-primary" id="verify-primary">
                    Verify Your Account
                </h1>
                <p className="font-secondary">
                    Provide otp which has been sent to your <span>Email</span>
                </p>
            </div>
            <div className="FormForLogin">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              
              <div className="formLogin">
                <input className="FieldClassLogin" type="number" name="otp" id="otp" value ={Otp.otpValue} onChange={(e)=>{setOtp({...Otp,otpValue : e.target.value})}}></input>
                <label htmlFor="otp">Otp</label>
              
              </div>

              
              <button
                className="buttonOtp"
                id="submitButtonOtp"
                type="submit"
              >
                Verify
              </button>
              <button type="reset"
                className="buttonOtp"
                id="resendButtonOtp">
                  Resend Otp
              </button>
            </form>
            </div>


        </div>
    )
}

export default Otp
