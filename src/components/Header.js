import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
function Header() {
    const [token,setToken] = useState("");
    useEffect(
        ()=>{

            setToken(localStorage.getItem('token'));
        },[]
    )
    const handleClick = () =>{
        axios.get("http://107.23.113.233:8080/MentalcareCommunity/logoutrequest")
        .then((res)=>{
            console.log(res);
            localStorage.removeItem('token');
            // setToken("");
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <nav>
            <h1>e-Dost</h1>
            <ul>
                <li><NavLink to="/">HOME</NavLink ></li>
                <li><NavLink to="/">ABOUT US</NavLink ></li>
                <li><NavLink to="/">CONTACT</NavLink ></li>
                <li><NavLink to="/services">SERVICES</NavLink ></li>
            </ul>
            <button><Link to="/">JOIN COMMUNITY</Link></button>
            {
                (token !== null)?
                <button onClick={handleClick}>log out</button>:null
            }
        </nav>
    )
}

export default Header
