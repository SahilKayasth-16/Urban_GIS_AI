import React from "react";
import "../styles/LocationInfo.css";

const LocationInfo = ({ location }) => {
    if (!location) {
        return (
            <div className="location-card empty">
                <p>📍 Select a location on a map.</p>
            </div>
        );
    }

    return (
        <div className="location-card">
            <h4>Selected location:</h4>

            <p><strong>Name:</strong>{location.name || "Unknown location."}</p>
            <p><strong>Latitude:</strong>{location.latitude !== undefined ? `${location.latitude.toFixed(4)}°` : "--"}</p>
            <p><strong>Longitude:</strong>{location.longitude !== undefined ? `${location.longitude.toFixed(4)}°` : "--"}</p>
        </div>
    );
};

export default LocationInfo;