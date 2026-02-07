import React from "react";
import {Link, useNavigate } from "react-router-dom";
import "../styles/ResultPage.css";
import VideoBackground from "../components/VideoBackground";

const ResultPage = () => {
    const navigate = useNavigate();

    const resData = {
        query: "Gyms nearby ",
        location: {
            name: "Bardoli, Surat",
            latitude: "21.1255",
            longitude: "73.1122"
        },
        generatedAt: "16 January 2026 | 05:05 PM",

        summary: [
            { title: "No. of Gyms in Bardoli", value: "13" },
            { title: "Average fees", value: "5k - 8k" },
            { title: "No. of clients per gym", value: "120 / gym avg."}
        ],

        recommendations: {
            high: [
                "Maintain parking & bathing facility",
                "Select near supplement stores",
            ],
            medium: [
                "Minimum 3 rooms of 10 x 10 feet.",
                "Average fees 3750 /-."
            ],
            low: [
                "Consist of maximum 5 personal trainers.",
                "Minimum fees 2000 /-."
            ],
        },
    };

    const handleSaveReport = () => {
        const reports = JSON.parse(localStorage.getItem("reports")) || [];

        reports.push(resData);
        localStorage.setItem("reports", JSON.stringify(reports));

        navigate("/reports")
    };

    const resultData = JSON.parse(
        localStorage.getItem("latestResult")
    );


    return (
        <>
        <VideoBackground />
        <div className="result-page">

      
      <header className="result-header">
        <h2>Analysis Result</h2>
        <p className="meta">
          <strong>Query:</strong> {resData.query}
        </p>
        <p className="meta">
          <strong>Location:</strong> {resData.location.name} (
          {resData.location.latitude},{" "}
          {resData.location.longitude})
        </p>
        <p className="meta">{resData.generatedAt}</p>
      </header>

      
      <section className="summary-section">
        {resData.summary.map((item, index) => (
          <div className="summary-card" key={index}>
            <h4>{item.title}</h4>
            <p>{item.value}</p>
          </div>
        ))}
      </section>

     
      <section className="charts-section">
        <h3>Statistical Overview</h3>
        <div className="chart-placeholder">
          <p>Charts will be displayed here</p>
        </div>
      </section>

      
      <section className="map-section">
        <h3>Spatial Analysis</h3>
        <div className="map-placeholder">
          <p>GIS Map Visualization Here</p>
        </div>
      </section>

      
      <section className="recommendations-section">
        <h3>AI Recommendations</h3>

        <div className="recommendation-block high">
          <h4>High Priority</h4>
          <ul>
            {resData.recommendations.high.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>

        <div className="recommendation-block medium">
          <h4>Medium Priority</h4>
          <ul>
            {resData.recommendations.medium.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>

        <div className="recommendation-block low">
          <h4>Low Priority</h4>
          <ul>
            {resData.recommendations.low.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </section>

    
      <footer className="result-actions">
        <button onClick={handleSaveReport}>
          Save as Report
        </button>

        <Link to="/dashboard">
          <button className="secondary">
            <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
          </button>
        </Link>
      </footer>
    </div>    
        </>
    );
}

export default ResultPage;