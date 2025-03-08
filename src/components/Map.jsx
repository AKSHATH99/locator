import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import findNearestStore from "../utils/FindNearestStore";

const customIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Map = () => {
  const sampledata = {
    found: true,
    total: 47,
    nearest: {
      id: 889585048,
      name: "Rite Aid",
      lat: 40.7121643,
      lon: -74.0150269,
      address: "Address not available",
      phone: "Not available",
      website: null,
      opening_hours: "Not available",
    },
    all: [
      {
        id: 889585048,
        name: "Rite Aid",
        lat: 40.7121643,
        lon: -74.0150269,
        address: "Address not available",
        phone: "Not available",
        website: null,
        opening_hours: "Not available",
      },
      {
        id: 1272961632,
        name: "Kings Pharmacy",
        lat: 40.7160601,
        lon: -74.0093501,
        address: "5 Hudson Street, New York",
        phone: "Not available",
        website: null,
        opening_hours: "Not available",
      },
      {
        id: 1272961636,
        name: "Duane Reade",
        lat: 40.7062064,
        lon: -74.0132627,
        address: "37 Broadway, New York",
        phone: "+1 212-425-8460",
        website:
          "https://www.walgreens.com/locator/walgreens-37+broadway-new+york-ny-10006/id=14101",
        opening_hours:
          'Mo-Fr 09:00-19:00 open "Pharmacy" || Mo-Fr 07:00-21:00; Sa 09:00-18:00; Su 10:00-17:00 open "Store"',
      },
      {
        id: 1272961641,
        name: "Duane Reade",
        lat: 40.7072059,
        lon: -74.0096068,
        address: "42 Pine Street, New York",
        phone: "Not available",
        website: null,
        opening_hours: "Not available",
      },
      {
        id: 1383571132,
        name: "139 Center Pharmacy",
        lat: 40.7173976,
        lon: -74.0006546,
        address: "139 Centre Street, New York",
        phone: "+1 646-838-6388",
        website: null,
        opening_hours: "Not available",
      },
    ],
  };

  const [position, setPosition] = useState([40.7128, -74.006]);
  const [pharmacyData, setPharmacyData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // if (!navigator.geolocation) {
    //   alert("Geolocation not found");
    //   return;
    // }

    // navigator.geolocation.getCurrentPosition(
    //   (pos) => {
    //     setPosition([pos.coords.latitude, pos.coords.longitude]);
    //   },
    //   (err) => {
    //     console.log("Error fetching", err);
    //     alert("Failed to fetch location.");
    //   },
    //   { enableHighAccuracy: true }
    // );

    // const result = await findNearestStore(40.7128, -74.0060);
    // console.log(result);
    // sampledata.all.forEach((item, index) => {
    // //   console.log(`Element ${index}: lat = ${item.lat}, lon = ${item.lon}`);
    // // });

    setPharmacyData(sampledata.all);
  }, []);

  useEffect(() => {
    isHovered
  }, [isHovered]);

  // console.log(isHovered)
  return (
    <div className="flex gap-4 mt-10">
    <p className="relative top-10">bro</p>
    <div style={{ height: "100vh", width: "100vw" }}>
      {position ? (
        <MapContainer
          key={position} // FIX: Forces re-render when position updates
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <div className="w-10">
            <Marker
              position={position}
              icon={customIcon}
              eventHandlers={{
                mouseover: () => setIsHovered(true),
                mouseout: () => setIsHovered(false),
              }}
            >
      
                <Popup
                  // closeButton={false}
                  // autoPan={false}
                  // autoClose={false}
                  // open={true} 
                >
                  You are here
                </Popup>
            </Marker>
          </div>

          {pharmacyData.map((item) => (
            <Marker position={[item.lat, item.lon]} icon={customIcon}>
              <Popup className="w-72 h-44 text-gray-100 mb-10">
                <div className="">
                <p className="text-xl text-black ">{item.name}</p>
                <p className="" >{item.address}</p>
                <p>Phone : {item.phone}</p>
                <p>Timing : {item.opening_hours}</p>
                {item.website?  <a href={item.website} target="_blank" >{item.website}</a>:""}
                </div>
                </Popup>
            </Marker>
            // <p>dd</p>
          ))}
        </MapContainer>
      ) : (
        <p>Fetching location...</p> // Show message while loading
      )}
      {/* <p className="text-red-400">hi</p> */}
    </div>
    </div>
  );
};

export default Map;
