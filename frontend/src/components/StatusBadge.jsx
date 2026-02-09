import React from "react";
import "../styles/StatusBadge.css";

const StatusBadge = ({ status }) => {
    const getStatusClass = () => {

    const normalized = status?.toLowerCase()
        switch (normalized) {
            case "approved":
                return "Approved";
            case "rejected":
                return "Rejected";
            default:
                return "Pending";
        }
    };

    return (
        <span className={getStatusClass()}>
            {status?.toUpperCase() || "Pending"}
        </span>
    );
}

export default StatusBadge;