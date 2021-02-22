import React from 'react'
import img from '../../frontend-designs/heroImage.svg'
import './Hero.css'
import {Link} from 'react-router-dom'
function Hero() {
    return (
        <div className="hero">
            <div className="hero-left">
                <h1>Find Your Calm!</h1>
                <p>No matter what's troubling you, get the support you need, right here, right now. People heal when they feel heard. Feel heard & guided by our highly trained & qualified psychologists</p>
                <button>
                    <Link to="/services">
                    Book Appointment
                    </Link>
                </button>
            </div>
            <img src={img}></img>
        </div>
    )
}

export default Hero
