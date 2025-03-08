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

const Map = ({data, position}) => {
 
  console.log(data)
  const [pharmacyData, setPharmacyData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
  

    // const result = await findNearestStore(40.7128, -74.0060);
    // console.log(result);
    // sampledata.all.forEach((item, index) => {
    // //   console.log(`Element ${index}: lat = ${item.lat}, lon = ${item.lon}`);
    // // });

    setPharmacyData(data);
  }, []);



  // console.log(isHovered)
  return (
    <div className="z-0">
    <div style={{ height: "100vh", width: "100vw" }}>
      {position ? (
        <MapContainer
          // key={[40.7128, -74.006]} // FIX: Forces re-render when position updates
          center={[40.7128, -74.006]}
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
