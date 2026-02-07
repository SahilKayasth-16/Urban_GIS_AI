import React from "react";

const UtilityIndexChart = ({ data }) => {
    return(
        <>
        <div className="chart-card">
            <h3>Utility Avaliability Index</h3>

            {data.map((item, index) => (
                <div className="utility-row" key={index}>
                    <span>{item.area}</span>
                    <progress value={item.utility_index} max={100}></progress>
                    <span>{item.utility_index}/100</span>
                </div>
            ))}
        </div>
        </>
    );
};

export default UtilityIndexChart;