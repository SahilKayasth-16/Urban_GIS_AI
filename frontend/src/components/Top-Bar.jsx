import React from "react";
import "../styles/TopBar.css";

const TopBar = ({ user, onChatClick }) => {
    return(
        <>
         <header className="topbar">
      <h3>{user?.role === "admin" ? "Admin Dashboard" : "Dashboard" }</h3>

      <button className="chat-btn" onClick={onChatClick}>
        🤖 GIS Assistant
      </button>
    </header>
        </>
    );
}

export default TopBar;