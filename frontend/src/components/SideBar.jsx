import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const SideBar = ({ onMapViewClick, onLayersClick }) => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const role = user?.role || "user";

    const handlelogout = () => {
        logout();
        navigate("/login");
    };
    
    return(
        <>
        <aside className="sidebar">
        <h2 className="logo">Urban GIS AI</h2>

        <ul className="menu">
            {/*COMMON FOR ADMIN & USER*/}
            <li onClick={onMapViewClick}>🗺 Map View</li>
            <li onClick={onLayersClick}>📚 Layers</li>
            <li><NavLink to={"/analytics"} className="sidebar-link">📊 Analytics</NavLink></li>

            {/* ADMIN ONLY */}
            {role === "admin" && (
                <>
                <li>👥 User Management</li>
                <li><NavLink to="/admin/business-approvals">🏢 Business Approvals</NavLink></li>
                <li>⚙ Admin Settings</li>
                </>
            )}
        </ul>

        <div className="sidebar-footer">
            <p>{user?.username || "Guest"}</p>
            <small>{role.toUpperCase()}</small>
        </div>
        
        <div className="logout_btn">
            <button onClick={handlelogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
        </div>
        
        </aside>
        </>
    );
}

export default SideBar;