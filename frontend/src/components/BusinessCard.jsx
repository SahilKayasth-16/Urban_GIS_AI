import React from "react"; 
import "../styles/BusinessCard.css"; 

const BusinessCard = ({ title, description, icon, onClick}) => {
    return( 
     
        <div className="business-card" onClick={onClick}> 
            <div className="card-icon">{icon}</div> 
                <h3>{title}</h3> 
                <p>{description}</p>     
            </div> 
    ); 
}; 

export default BusinessCard;