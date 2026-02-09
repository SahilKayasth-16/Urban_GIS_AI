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
        business_name: "",
        category_id: "",
        description: "",
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

        if (!form.business_name || !form.category_id || !form.address || !form.city || form.latitude === null || form.longitude === null ) {
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
            body: JSON.stringify({
                ...form,
                category_id: Number(form.category_id)
            }),
           });

           const data = await res.json();

           if (!res.ok) {
            alert(data.detail || "Business registration failed.");
            return;
           }

           alert("Business submitted. Waiting for approval...");
           setForm({ business_name:"", category_id:"",description:"", address:"", city:"", latitude: null, longitude:null })

           markerRef.current?.setLngLat([78.9629, 20.5937]);
            
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
                    <input name="business_name" placeholder="Business Name" value={form.business_name} onChange={handleChange} />
                    <select name="category_id" value={form.category_id} onChange={handleChange}>
                        <option value="1">Select Category</option>
                        <option value="2">Emergency Services</option>
                        <option value="3">Entertainment</option>
                        <option value="4">Food & Hospitality</option>
                        <option value="5">Corporate & IT</option>
                        <option value="6">Public Amenities</option>
                        <option value="7">Automobile Services</option>
                        <option value="8">Retail Shop</option>
                        <option value="9">Education</option>
                        <option value="10">Logistics</option>
                        <option value="11">Others...</option>
                    </select>
                    <textarea name="description" placeholder="Business Description (optional)" value={form.description} onChange={handleChange} />
                    <input name="address" value={form.address} placeholder="Address" onChange={handleChange} />
                    <input name="city" value={form.city} placeholder="City" onChange={handleChange} />

                    <div className="map-section">
                        <p>Select location on map.</p>
                        <div className="map-container" id="map"></div>
                        <div className="coords">
                            <span>Latitude: {typeof form.latitude === "number" ?form.latitude.toFixed(4) : "--"}</span>
                            <span>Longitude: {typeof form.longitude === "number" ?form.longitude.toFixed(4) : "--"}</span>
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