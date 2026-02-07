import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/BusinessSidebar.css";

const BusinessSidebar = () => {
    const navigate = useNavigate();

    const handlelogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return(
        <aside className="buisness-sidebar">
            <h2 className="logo">Urban GIS AI</h2>

        <nav>
            <NavLink to="/business/dashboard">Dashboard</NavLink>
            <NavLink to="/business/register">New business</NavLink>
            <NavLink to="/business/process">Approval Process</NavLink>
            <NavLink to="/business/status">Status</NavLink>
        </nav>

        <button className="logout-btn" onClick={handlelogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
        </aside>
    );
}

export default BusinessSidebar;