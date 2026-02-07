import React from "react";
import "../styles/BusinessDashboard.css";
import { useNavigate } from "react-router-dom";
import BusinessCard from "../components/BusinessCard";
import VideoBackground from "../components/VideoBackground";

const BusinessDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login")
    }

    return (
        <>
        <VideoBackground />

        <div className="business-dashboard">
            <h1>Business Dashboard</h1>
            <p>Manage your businesses & track approval status</p>

            <div className="dashboard-cards">
                <BusinessCard title="New business registration"
                    description="Register a new business or service."
                    icon="➕"
                    onClick={() => navigate("/business/register")} />

                <BusinessCard title="Approval work flow"
                    description="Understand 'How business approval works ?'."
                    icon="💾"
                    onClick={() => navigate("/business/process")} />

                <BusinessCard title="Status"
                    description="Check approval status of your businesses."
                    icon="⏳"
                    onClick={() => navigate("/business/status")} />
            </div>

            <div>
                <button onClick={handleLogout}>
                   <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </button>
            </div>
        </div>
        </>
    );
};

export default BusinessDashboard;