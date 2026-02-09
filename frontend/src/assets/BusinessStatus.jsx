import React, { useState, useEffect } from "react";
import BusinessSidebar from "../components/BusinessSidebar";
import StatusBadge from "../components/StatusBadge";
import "../styles/BusinessStatus.css";
import API from "../services/api";
import VideoBackground from "../components/VideoBackground";

const BusinessStatus = () => {
    const [ statuses, setStatuses ] = useState([]);

    useEffect(() => {
        API.get("/business/my")
        .then(res => setStatuses(res.data))
        .catch(err => console.error(err));
    }, []);


    return (
        <>
        <VideoBackground />
        <div className="business-layout">
            <BusinessSidebar />

            <div className="business-content">
                <h2>Business Status</h2>

                <table className="status-table">
                    <thead>
                        <tr>
                            <th>Business</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statuses.map((b, i) => (
                            <tr key={i}>
                                <td>{b.business_name}</td>
                                <td><StatusBadge status={b.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default BusinessStatus;
