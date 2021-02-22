import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import img from '../../frontend-designs/Illustration-4.svg'
import './Footer.css'

function Footer() {
    return (
        <div className="footer">
            {/* <img  className="bg-img"></img> */}
            {/* <div className="pattern"></div> */}
            <img src={img}></img>
            <div className="lists">
                <ul className="list">
                    <h1 className="list-headings">Useful Links</h1>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/">Blog</Link></li>
                    <li><Link to="/">Contact</Link></li>
                </ul>
                <ul className="list">
                    <h1 className="list-headings">Need Help?</h1>
                    <li><Link to="/">FAQs</Link></li>
                    <li><Link to="/">Privacy</Link></li>
                    <li><Link to="/">Policy</Link></li>
                    <li><Link to="/">Support</Link></li>
                    <li><Link to="/">Terms</Link></li>
                </ul>
                <ul className="list">
                    <h1 className="list-headings">Contact</h1>
                    <li><Link to="/">Instagram</Link></li>
                    <li><Link to="/">Facebook</Link></li>
                    <li><Link to="/">Twitter</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
