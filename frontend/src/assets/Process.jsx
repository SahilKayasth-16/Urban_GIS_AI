import React, { useEffect, useState } from "react"; 
import BusinessSidebar from "../components/BusinessSidebar"; 
// import BusinessCard from "../components/BusinessCard"; 
import VideoBackground from "../components/VideoBackground"; 
import API from "../services/api"; 
import "../styles/Process.css"; 

const Process = () => { 
    const [ businesses, setBusinesses ] = useState([]); 
    
    useEffect(() => { 
        API.get("business/my") 
        .then(res => setBusinesses(res.data)) 
        .catch(err => console.error(err)); 
    }, []); 
    
    return ( 
    <> 
    <VideoBackground /> 
    <div className="business-layout"> 
        <BusinessSidebar /> 
        <div className="business-content"> 
            <h2>Approval work process</h2> 
            <div className="business-grid"> 
                <h3>Step-1. Application Submitted</h3>
                <h3>Step-2. Document Verification</h3>
                <h3>Step-3. GIS Location Check</h3>
                <h3>Step-4. Authority Review</h3>
                <h3>Step-5. Approved / Rejected</h3>
            </div> 
        </div> 
    </div> 
    </> 
    ); 
}; 

export default Process;