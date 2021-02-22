import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './Payment.css'
function Payment() {
    const history = useHistory();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token===null) {
            history.replace('/');
        }
    })

    return (
        <div className="payment container">
            hello Payment
        </div>
    )
}

export default Payment
