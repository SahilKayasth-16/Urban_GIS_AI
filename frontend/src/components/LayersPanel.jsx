import React, { useState } from "react";
import "../styles/LayersPanel.css";

const layers = [
    {id: "roads-layer", label: "Roads"},
    {id: "rail-layer", label: "Railways"},
    {id: "landuse-layer", label: "Landuse"},
    {id: "water-layer", label: "Water Supply"},
    {id: "power-layer", label: "Electricity"},
];

const LayersPanel = ({ onToggleLayer, onClose }) => {
    const [ active, setActive ] = useState([]);

    const handleChange = (id) => {
        const next = !active[id];
        setActive({...active, [id]: next });
        onToggleLayer(id, next);
        onClose();
    };

    return(
        <>
        <div className="layers-panel" onClick={e => e.stopPropagation()}>
            <h4>📚 Layers</h4>

            {layers.map(layer => (
                <label key={layer.id}>
                    <input type="checkbox" checked={!!active[layer.id]} onChange={() => handleChange(layer.id)} />
                    {layer.label}
                </label>
            ))}
        </div>
        </>
    );
};

export default LayersPanel;