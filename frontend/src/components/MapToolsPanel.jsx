import { useState  } from "react";
import "../styles/MapToolsPanel.css";

const MapToolsPanel = ({ onStyleChange }) => {
    const [ showDropDown, setShowDropDown ] = useState(false);

    return(
    <div className="map-tools-panel" onClick={(e) => e.stopPropagation()}>

        {/* Change Base Map View */}
        <div className="tool-item">
            <button className="tool-btn" onClick={(e) => {e.stopPropagation(); setShowDropDown(prev => !prev)}} >🗺  Change Map View</button>

            {showDropDown && (
                <div className="dropdown">
                <button onClick={() => onStyleChange("street")}>Street</button>
                <button onClick={() => onStyleChange("light")}>Light</button>
                <button onClick={() => onStyleChange("dark")}>Dark</button>
                <button onClick={() => onStyleChange("satellite")}>Satellite</button>
            </div>
            )}       
        </div>

    </div>
    );
};

export default MapToolsPanel;