import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../styles/MapView.css";

const MAP_STYLES = {
  street: "https://tiles.openfreemap.org/styles/liberty",
  light: "https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  satellite: "https://tiles.stadiamaps.com/styles/alidade_satellite.json"
};

const withBase = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path}`.replace("//", "/");
};

const MapView = forwardRef(({ onLocationSelect }, ref) => {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);
  const markerRef = useRef(null);

  const [query, setQuery] = useState("");
  const [mapStyle, setMapStyle] = useState(MAP_STYLES.street);

  //GEOJSON LAYER
  const addGeoJsonLayers = (map) => {

    //ROADS
    if (!map.getSource("roads-src")) {
      map.addSource("roads-src", {
        type: "geojson",
        data: withBase("geojson/roads.geojson")
      });

      map.addLayer({
        id:"roads-layer",
        type: "line",
        source: "roads-src",
        paint: {
          "line-color": "#ffcc00",
          "line-width": 2
        },
        layout: {
          "visibility": "none"
        }
      });
    }

    //RAILWAYS
    if (!map.getSource("rail-src")) {
      map.addSource("rail-src", {
        type: "geojson",
        data: withBase("geojson/railways.geojson")
      });

      map.addLayer({
        id:"rail-layer",
        type: "line",
        source: "rail-src",
        paint: {
          "line-color": "#555",
          "line-dasharray": [2, 2]
        },
        layout: {
          "visibility": "none"
        }
      });
    }

    //LANDUSE
    if (!map.getSource("landuse-src")) {
      map.addSource("landuse-src", {
        type: "geojson",
        data: withBase("geojson/landuse.geojson")
      });

      map.addLayer({
        id:"landuse-layer",
        type: "fill",
        source: "landuse-src",
        paint: {
          "fill-color": [
            "match", ["get", "type"],
            "residential", "#66bb6a",
            "commerical", "#42a5f5",
            "#ccc"
          ],
          "fill-opacity": 0.4
        },
        layout: {
          "visibility": "none"
        }
      });
    }

    // WATER
    if (!map.getSource("water-src")) {
      map.addSource("water-src", {
        type: "geojson",
        data: withBase("geojson/water.geojson")
      });

      map.addLayer({
        id: "water-layer",
        type: "fill",
        source: "water-src",
        paint: {
          "fill-color": "#4fc3f7",
          "fill-opacity": 0.5
        },
        layout: { visibility: "none" }
      });
    }

    // ELECTRICITY
    if (!map.getSource("power-src")) {
      map.addSource("power-src", {
        type: "geojson",
        data: withBase("geojson/electricity.geojson")
      });

      map.addLayer({
        id: "power-layer",
        type: "line",
        source: "power-src",
        paint: {
          "line-color": "#ff0000",
          "line-width": 2
        },
        layout: { visibility: "none" }
      });
    }
  };


  // INIT MAP
  useEffect(() => {
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [78.9629, 20.5937],
      zoom: 4
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      addGeoJsonLayers(map);
    });
  }, []);

  // STYLE SWITCH 
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.setStyle(mapStyle);

    map.once("style.load", () => {
      addGeoJsonLayers(map);
    });
  }, [mapStyle]);

  //SEARCH
  const handleSearch = async () => {
    if (!query) return;

    try {
    const res = await fetch(
      `http://localhost:8000/api/geocode?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      throw new Error("Geocoding Failed");
    } 

    const data = await res.json();
    if (!data.length) return alert("Location not found");

    const place = data[0];
    const lat = Number(place.lat);
    const lon = Number(place.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      console.warn("Invalid coordinates from geocoder:", place);
      alert("Invalid location data received.");
      return;
    }

    if (!mapRef.current) {
      console.warn("Map not initialized yet");
      return;
    }

    mapRef.current.flyTo({ center: [lon, lat], zoom: 13 });

    if (markerRef.current) markerRef.current.remove();
    markerRef.current = new maplibregl.Marker()
      .setLngLat([lon, lat])
      .addTo(mapRef.current);

    onLocationSelect({
      name: place.display_name,
      latitude: lat,
      longitude: lon
    });
  } catch(err) {
    console.error(err);
    alert("Search failed. Try Again");
  }
}

  // EXPOSE MAP API
  useImperativeHandle(ref, () => ({
    changeStyle(style) {
      setMapStyle(MAP_STYLES[style]);
    },
    toggleLayer(id, visible) {
      const map = mapRef.current;
      if (!map || !map.isStyleLoaded() || !map.getLayer(id)) return;

      map.setLayoutProperty(id, "visibility", visible ? "visible" : "none"
      );
    }
  }));

  return (
    <div className="map-wrapper">
      <div className="map-search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      <div ref={mapContainer} className="map-container" />
    </div>
  );
});

export default MapView;