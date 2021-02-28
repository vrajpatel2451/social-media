import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {connect} from 'react-redux'
import {logout} from '../redux/action/authAction'
import PropTypes from 'prop-types'
import { FaTimes } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom'
import './Modal.css'

const modal = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { 
      x: "0px", 
      opacity: 1,
      transition: { duration:0.5, ease:"easeInOut"}
    },
  }



function Modal({nulls,setNulls,auth,logout}) {
    // const { isAuthenticated } = props.auth;
    console.log("token",auth.isAuthenticated);
                    const authLinks = (
                        <button onClick={logout} className="nav-link btn btn-info btn-sm text-light" >
                        Logout
                        </button>
                );

                const guestLinks = (
                    <ul className="navbar-nav">
                        <Link to="/registration" className="nav-link">
                            Register
                        </Link>
                        
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                        
                    </ul>
                    );

    return (
        <AnimatePresence exitBeforeEnter>
              {
                nulls?(<motion.ul className="media-query-active"
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
                <button className="cross" onClick={()=>{setNulls(!nulls); console.log(nulls)}} ><FaTimes size="1.5rem" color="white"></FaTimes></button>
                <li><NavLink to="/">HOME</NavLink ></li>
                <li><NavLink to="/">ABOUT US</NavLink ></li>
                <li><NavLink to="/">CONTACT</NavLink ></li>
                <li><NavLink to="/services">SERVICES</NavLink ></li>
                <li><NavLink to="/">JOIN COMMUNITY</NavLink ></li>
            {/* <button><Link to="/">JOIN COMMUNITY</Link></button> */}
            {(auth.isAuthenticated)
            ?(<button onClick={logout} className="nav-link btn btn-info btn-sm text-light" >Logout</button>) 
            :(<ul className="navbar-nav">
                <li>
                    <Link to="/registration" >Register</Link>
                </li>
                <li>
                    <Link to="/login" >Login</Link>
                </li>
            </ul>)}
            </motion.ul>):null}
            </AnimatePresence>
    )
}

Modal.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

const mapStateToProps = (state) =>({
    auth:state.authReducer
})

export default connect(mapStateToProps, { logout }) (Modal)
