import React, { useState } from "react";
import "../styles/BusinessRegister.css";
import BusinessSidebar from "../components/BusinessSidebar";
import VideoBackground from "../components/VideoBackground";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef  } from "react";

const BusinessRegister = () => {
    const mapRef = useRef(null);

    const markerRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;

        const map = new maplibregl.Map({
            container: "map",
            style: "https://tiles.openfreemap.org/styles/liberty",
            center: [78.9629, 20.5937], // India
            zoom: 5
        });

        map.addControl(new maplibregl.NavigationControl({
            showZoom: true,
            showCompass: true,
            visualizePitch:true
        }), "top-right");

        const marker = new maplibregl.Marker({ draggable: true }).setLngLat([78.9629, 20.5937]).addTo(map);

        marker.on("dragend", () => {
            const { lng, lat } = marker.getLngLat();
            setForm(prev => ({
                ...prev,
                latitude: lat,
                longitude: lng
            }));
        });

        map.on("click", (e) => {
            marker.setLngLat(e.lngLat);
            setForm(prev => ({
                ...prev,
                latitude: e.lngLat.lat,
                longitude: e.lngLat.lng
            }));
        });

        mapRef.current = map;
        markerRef.current = marker;
    }, []);

    const [ form, setForm ] = useState({
        name: "",
        category: "",
        address: "",
        city: "",
        latitude: null,
        longitude: null
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.category || !form.address || !form.city || !form.latitude || !form.longitude) {
            alert("Please fill all required fields & select location on map");
            return;
        }

        try {
           const res = await fetch("http://localhost:8000/business/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(form)
           });

           const data = await res.json();

           if (!res.ok) {
            alert(data.detail || "Business registration failed.");
            return;
           }

           alert("Business submitted. Waiting for approval...");
           setForm({ name:"", category:"", address:"", city:"", latitude:"", longitude:"" })
            
        }
        catch(error) {
            console.error(error);
            alert("Server error. Please try again later.")
        }

    };
    return (
        <>
        <VideoBackground />
        <div className="business-layout">
            <BusinessSidebar />

            <div className="business-content">
                <h2>Register new business</h2>

                <form className="business-form" onSubmit={handleSubmit}>
                    <input name="name" placeholder="Business Name" value={form.name} onChange={handleChange} />
                    <select name="category" value={form.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="emergency_services">Emergency Services</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="food_and_hospitality">Food & Hospitality</option>
                        <option value="corporate_and_IT">Corporate & IT</option>
                        <option value="public_amenitiies">Public Amenities</option>
                        <option value="automobile_services">Automobile Services</option>
                        <option value="retail_shop">Retail Shop</option>
                        <option value="education">Education</option>
                        <option value="logistics">Logistics</option>
                        <option value="others">Others...</option>
                    </select>
                    <input name="address" value={form.address} placeholder="Address" onChange={handleChange} />
                    <input name="city" value={form.city} placeholder="City" onChange={handleChange} />

                    <div className="map-section">
                        <p>Select location on map.</p>
                        <div className="map-container" id="map"></div>
                        <div className="coords">
                            <span>Latitude: {form.latitude?.toFixed(4)}</span>
                            <span>Longitude: {form.longitude?.toFixed(4)}</span>
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default BusinessRegister;