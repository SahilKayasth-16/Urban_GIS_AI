import React from "react";
import "../styles/StatusBadge.css";

const StatusBadge = ({ status }) => {
    const getStatusClass = () => {
        switch (status) {
            case "approved":
                return "✅ approved";
            case "rejected":
                return "❌ rejected";
            default:
                return "⏳ pending";
        }
    };

    return (
        <span className={getStatusClass}>
            {status?.toUpperCase() || "Pending"}
        </span>
    );
}

export default StatusBadge;