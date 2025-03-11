import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import arrow from "./assets/arrow.png";
import "./App.css";
import Map from "./components/Map";
import SideBar from "./components/SideBar";

function App() {
  const sampledata = {
    found: true,
    total: 47,
    nearest: {
      id: 889585048,
      name: "Rite Aid",
      lat: 40.7121643,
      lon: -74.0150269,
      address: "Address not available",
      distance: 149.8940868948466,
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
        distance: 149.8940868948466,
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
  const [openSideBar, setOpenSidebar] = useState(false);
  const [position, setPosition] = useState([]);

  const findUserLocation = async () => {
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
  };



  return (
    <div className="relative gap-4">
      <div className="flex z-50 absolute top-20   ">
        {openSideBar ? (
          <div className="bg-white flex flex-col w-1/2 max-h-[500px] p-4 border rounded-lg shadow-sm overflow-auto">
            <SideBar data={sampledata.all} />
          </div>
        ) : (
          ""
        )}
        <div
          className="border border-red-950 w-max h-max p-2 z-50   bg-white rounded-r-lg hover:cursor-pointer"
          onClick={() => {
            setOpenSidebar(!openSideBar);
          }}
        >
          <img className="w-3 h-4" src={arrow} />
        </div>
      </div>
      <div className="relative z-0">
        <Map data={sampledata.all} position={[40.7128, -74.006]} />
      </div>
    </div>
  );
}

export default App;
