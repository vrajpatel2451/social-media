import React from 'react'
import img from '../../frontend-designs/connect.svg'
import './JoinCommunity.css'
import image from '../../frontend-designs/dash.png'

function JoinCommunity() {
    return (
        <div className="join-community">
            

            <img src={img}></img>
            
       
            
                
                    

                <div className="community-right">
                <img src={image}></img>
                
                <h1>Join Community</h1>
                <p>This is a safe, supportive community for people facing health challenges and the people who care for them.</p>
                <button>Join the community</button>
                </div>            
        </div>
    )
}

export default JoinCommunity
