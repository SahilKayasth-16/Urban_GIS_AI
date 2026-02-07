import React from "react";
import "../styles/LandingPage.css";
import { Link } from 'react-router-dom';
import VideoBackground from "../components/VideoBackground";
import logo from "../assets/image/urban_gis_ai_logo.png";

const LandingPage = () => {
    return(
        <>
        <VideoBackground />
        <div className="main">
            <div className="heading">
                
                <a href={logo} target="_blank" rel="noreferrer noopener"><h1>Urban GIS AI</h1></a><br /> 
                <h3>Smart Urban Planning with AI-Powered GIS Analytics</h3><br />
                <h5>Transform your urban planning workflow with intelligent geospatial analysis. Our platform<br />
                    combines advanced GIS mapping with AI-powered chatbot assistance to help you make data-<br />
                    driven decisions for utility management and urban development.</h5>
            </div>

            <div className="static_cards">
                <div className="card_1">
                    <h1><i className="fa-solid fa-location-dot"></i></h1>
                    <h3>Interactive GIS Mapping</h3>
                </div>

                <div className="card_2">
                    <h1><i className="fa-regular fa-comments"></i></h1>
                    <h3>AI CHatbot Assistant</h3>
                </div>

                <div className="card_3">
                    <h1><i className="fa-regular fa-file-lines"></i></h1>
                    <h3>Comprehensive Reports</h3>
                </div>
            </div>

            <div className="usefulness">
                <h1>Why UrbanGIS AI ?</h1>

                <div className="list_1">
                    <h3>For Urban Planners</h3>
                    <ul>
                        <li><h5>Streamline utility infrastructure planning</h5></li>
                        <li><h5>Analyze grographic data</h5></li>
                        <li><h5>Optimize resource allocation</h5></li>
                        <li><h5>Monitor urban development tools</h5></li>
                    </ul>
                </div>

                <div className="list_2">
                    <h3>For Decision makers</h3>
                        <li><h5>Data driven policy recommendations</h5></li>
                        <li><h5>Real time spatial analysis</h5></li>
                        <li><h5>Historical trend tracking</h5></li>
                        <li><h5>Collaborative and efficient planning</h5></li>
                </div>
            </div>

            <div className="start">
                <Link to={'/registration'}>
                <button type="submit">Get Started</button>
                </Link>
                
            </div>
        </div>
        </>
    );
}

export default LandingPage;