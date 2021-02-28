import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import {connect} from 'react-redux'
import {logout} from '../redux/action/authAction'
import PropTypes from 'prop-types'
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion'




function Header({nulls,setNulls,...props}) {
    
    // useEffect(
    //     ()=>{

    //         setToken(localStorage.getItem('token'));
    //     },[]
    // )


    const { isAuthenticated } = props.auth;

    const authLinks = (
          <button onClick={props.logout} className="nav-link btn btn-info btn-sm text-light" >
            Logout
          </button>
    );

    const guestLinks = (
        <ul className="navbar-nav">
          <button className="nav-item">
            <Link to="/registration" className="nav-link">
              Register
            </Link>
          </button>
          <button className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </button>
        </ul>
      );

    return (
        <nav>
            <h1>e-Dost</h1>
            <ul className="non-media-query">
                <li><NavLink to="/">HOME</NavLink ></li>
                <li><NavLink to="/">ABOUT US</NavLink ></li>
                <li><NavLink to="/">CONTACT</NavLink ></li>
                <li><NavLink to="/services">SERVICES</NavLink ></li>
                <li><NavLink to="/">JOIN COMMUNITY</NavLink ></li>
            {isAuthenticated ? authLinks : guestLinks}
            </ul>
              <button className="media-query" onClick={()=>{setNulls(!nulls); console.log(nulls)}}><FaBars size="1.5rem" color="#b7278b"></FaBars></button>
            {/* <button><Link to="/">JOIN COMMUNITY</Link></button> */}
            

        </nav>
    )
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

const mapStateToProps = (state) =>({
    auth:state.authReducer
})

export default connect(mapStateToProps, { logout })(Header);
