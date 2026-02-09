import React, { useState, useEffect } from "react";
import PopulationDensityChart from "./PopulationDensityChart";
import QuerySummaryPanel from "./QuerySummaryPanel";
import UtilityIndexChart from "./UtilityIndexChart";

const AnalyiticsPanel = () => {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/analytics/overview")
        .then(res => res.json())
        .then(res => setData(res.results))
        .catch(err => console.error(err));
    })
    return(
        <>
        <div className="analytics-container">
            <h1>📊 Analytics</h1>

            <div className="analytics-grid">
                <PopulationDensityChart data={data} />
                <UtilityIndexChart data={data} />
            </div>

            <QuerySummaryPanel />
        </div>
        </>
    );
};

export default AnalyiticsPanel;