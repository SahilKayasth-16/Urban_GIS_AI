import React from "react";

const PopulationDensityChart = ({ data }) => {
    return(
        <>
        <div className="chart-card">
            <h3>Population Density</h3>

            {data.map((item, index) => (
                <div key={index} className="bar-row">
                    <span>{item.area}</span>
                    <div className="bar">
                        <div className="bar-fill" style={{width: `${item.population_density / 300}` }} />
                        <span>{item.population_density}</span>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default PopulationDensityChart;