import React from "react";
import AnalyticsPanel from "../components/analytics/AnalyticsPanel";
import "../styles/Analytics.css";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../constants/roles";
import VideoBackground from "../components/VideoBackground";

const AnalyticsPage = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleMoveToDashboard = () => {
        if (user?.role === ROLES.ADMIN) {
            navigate("/admindashboard");
        } else {
            navigate("/userdashboard");
        }
    };
 return(
    <>
    <VideoBackground />
    <div className="analytics-page">
        <AnalyticsPanel />

        <button onClick={handleMoveToDashboard}>
            <i className="fa-solid fa-arrow-left"></i> Back to dashboard
        </button>
    </div>
    </>
 );
};

export default AnalyticsPage;