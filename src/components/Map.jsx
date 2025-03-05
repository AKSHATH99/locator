import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Map = () => {
  const [position, setPosition] = useState([11.920939,75.335007]);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not found");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log("Error fetching", err);
        alert("Failed to fetch location.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}> {/* FIX: Ensures parent has height */}
      {position ? (
        <MapContainer 
          key={position}  // FIX: Forces re-render when position updates
          center={position} 
          zoom={13} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Fetching location...</p>  // Show message while loading
      )}
    </div>
  );
};

export default Map;
