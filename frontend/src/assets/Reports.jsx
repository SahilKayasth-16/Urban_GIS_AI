import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Reports.css";
import VideoBackground from "../components/VideoBackground";

const Reports = () => {
    const navigate = useNavigate();

    const [ reports, setReports ] = useState([]);

    useEffect(() => {
        const storedReports = JSON.parse(localStorage.getItem("reports")) || [];
        setReports(storedReports);
    }, []);

    const handleDelete = (index) => {
        const updatedReports = reports.filter((_, i) => i !== index);
        setReports(updatedReports);
        localStorage.setItem("reports", JSON.stringify(updatedReports));
    };

    const handleView = (report) => {
        localStorage.setItem("SelectedReport", JSON.stringify(report));
        navigate("/result");
    };
    return (
        <>
        <VideoBackground />
        <div className="reports-page">
            <div className="report-header">
                <h1>Reports</h1>
                <h5><p>View and manage urban analysis reports</p></h5>
                <button onClick={() => navigate("/dashboard")}><i className="fa-solid fa-arrow-left"></i> Back to Dashboard</button>
            </div>

            {reports.length === 0 ? (
                <div className="empty-state">
                    <h3>No reports found</h3>
                </div>
            ) : (
                <div className="reports-list">
                    {reports.map((report, index) => (
                        <div className="report-card" key={index}>
                            <h3>{report.query}</h3>

                            <p>
                                <strong>Location:</strong>{" "}
                                {report.location ?.name || "N/A"}
                            </p>

                            <p>
                                <strong>Latitude:</strong>{" "}
                                {report.location?.latitude || "--"} |{" "}
                                <strong>Longitude:</strong>{" "}
                                {report.location?.longitude || "--"}
                            </p>

                            <p>
                                <strong>Generated on:</strong> {report.generatedAt}
                            </p>

                            <div className="report-actions">
                                <button onClick={() => handleView(report)}>View</button>
                                <button disabled>Download</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
};

export default Reports;