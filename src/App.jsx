import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import arrow from "./assets/arrow.png";
import "./App.css";
import Map from "./components/Map";
import SideBar from "./components/SideBar";
import findNearestStore from "./utils/FindNearestStore";

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
  const [pharmacyData, setPharmacyData] = useState([])

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

  useEffect(()=>{
    findUserLocation()
  },[])

  useEffect(()=>{

    const fetchNearestStore = async () => {
      // 18.926736, 72.833797 -> for indian map
      console.log(position[0] ,position[1] )
      const result =  await findNearestStore(18.926736, 72.833797);
      console.log(result);
      setPharmacyData(result)
      
    };

    fetchNearestStore();
  },[position])

  useEffect(()=>{
    console.log("pharmacyData>>", pharmacyData)
  },[pharmacyData])


  return (
    <div className="flex flex-col h-screen">
      {/* Header - Fixed at top */}
      <div className="p-4 ">
        <div className="flex gap-2 items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Medicine--Streamline-Kameleon" height="48" width="48">
            <path fill="#92de46" d="M24.0006 48.0012c13.2553 0 24.0006 -10.7453 24.0006 -24.0006C48.0012 10.7453 37.2559 0 24.0006 0 10.7453 0 0 10.7453 0 24.0006c0 13.2553 10.7453 24.0006 24.0006 24.0006Z" strokeWidth="1"></path>
            <path fill="#000000" d="M32.7284 18.7639c0 -0.9258 -0.3678 -1.8138 -1.0225 -2.4685 -0.6546 -0.6546 -1.5426 -1.0225 -2.4685 -1.0225h-10.473c-0.9258 0 -1.8138 0.3679 -2.4685 1.0225 -0.6547 0.6547 -1.0225 1.5427 -1.0225 2.4685v15.7095c0 0.9259 0.3678 1.8139 1.0225 2.4686 0.6547 0.6546 1.5427 1.0224 2.4685 1.0224h10.473c0.9259 0 1.8139 -0.3678 2.4685 -1.0224 0.6547 -0.6547 1.0225 -1.5427 1.0225 -2.4686V18.7639Z" strokeWidth="1"></path>
            <path fill="#ffffff" fillRule="evenodd" d="M32.7284 20.5098h-17.455v-1.3091h17.455v1.3091Zm-17.455 12.2185h17.455v1.3091h-17.455v-1.3091Z" clipRule="evenodd" strokeWidth="1"></path>
            <path fill="#ffffff" d="M32.7284 14.3999c0 0.2314 -0.0919 0.4534 -0.2556 0.6171 -0.1637 0.1637 -0.3857 0.2556 -0.6171 0.2556H16.1462c-0.2315 0 -0.4535 -0.0919 -0.6171 -0.2556 -0.1637 -0.1637 -0.2557 -0.3857 -0.2557 -0.6171v-3.491c0 -0.2315 0.092 -0.4535 0.2557 -0.6171 0.1636 -0.1637 0.3856 -0.2557 0.6171 -0.2557h15.7095c0.2314 0 0.4534 0.092 0.6171 0.2557 0.1637 0.1636 0.2556 0.3856 0.2556 0.6171v3.491Z" strokeWidth="1"></path>
            <path fill="#ffffff" d="M28.8004 24.6191h-2.8002v-2.8003h-3.9998v2.8003h-2.8002v3.9998h2.8002v2.8002h3.9998v-2.8002h2.8002v-3.9998Z" strokeWidth="1"></path>
          </svg>
          <p className="text-4xl font-bold">Pharm-locator</p>
        </div>
        <p className="text-xl text-gray-400 my-3">Find the nearest medical stores near you in a go!</p>
        <p className="text-sm text-gray-400">Developed by <a href="https://akshathp.xyz/" target="_blank"><span className="underline">akshath</span></a></p>
      </div>

      <div className="ml-4">
        <div onClick={()=>{findUserLocation()}} className=" flex items-center justify-center  gap-2 border-t rounded-t-lg border-x w-max p-2 hover:cursor-pointer">
        <svg viewBox="0 0 16 16" fill="#000000" xmlns="http://www.w3.org/2000/svg" id="Crosshair-Line--Streamline-Remix" height="16" width="16"><desc>Crosshair Line Streamline Icon: https://streamlinehq.com</desc><path d="M8.666666666666666 13.292066666666665c2.4124666666666665 -0.30079999999999996 4.3246 -2.212933333333333 4.6254 -4.6254H11.333333333333332v-1.3333333333333333h1.9587333333333332C12.991266666666665 4.9208533333333335 11.079133333333333 3.0087599999999997 8.666666666666666 2.7079266666666664V4.666666666666666h-1.3333333333333333V2.7079266666666664C4.9208533333333335 3.0087599999999997 3.0087599999999997 4.9208533333333335 2.7079266666666664 7.333333333333333H4.666666666666666v1.3333333333333333H2.7079266666666664C3.0087599999999997 11.079133333333333 4.9208533333333335 12.991266666666665 7.333333333333333 13.292066666666665V11.333333333333332h1.3333333333333333v1.9587333333333332ZM8 14.666666666666666C4.318099999999999 14.666666666666666 1.3333333333333333 11.681866666666666 1.3333333333333333 8 1.3333333333333333 4.318099999999999 4.318099999999999 1.3333333333333333 8 1.3333333333333333c3.6818666666666666 0 6.666666666666666 2.9847666666666663 6.666666666666666 6.666666666666666 0 3.6818666666666666 -2.9848 6.666666666666666 -6.666666666666666 6.666666666666666Zm0 -5.333333333333333c-0.7363999999999999 0 -1.3333333333333333 -0.5969333333333333 -1.3333333333333333 -1.3333333333333333s0.5969333333333333 -1.3333333333333333 1.3333333333333333 -1.3333333333333333 1.3333333333333333 0.5969333333333333 1.3333333333333333 1.3333333333333333 -0.5969333333333333 1.3333333333333333 -1.3333333333333333 1.3333333333333333Z" stroke-width="0.6667"></path></svg>
        <p className="text-[13px] text-gray-500" >My location</p>
        </div>
      </div>
      
      {/* Main content area - Sidebar and Map */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed on left */}
        <div className={`${openSideBar ? 'w-1/4 min-w-64' : 'w-0'} transition-all duration-300 border-r`}>
          {openSideBar && (
            <div className="h-full overflow-auto p-4">
              <SideBar data={sampledata.all} />
            </div>
          )}
        </div>
        
        {/* Toggle sidebar button */}
        <div className="flex items-center">
          <div
            className="border border-red-950 p-2 bg-white rounded-r-lg hover:cursor-pointer"
            onClick={() => {
              setOpenSidebar(!openSideBar);
            }}
          >
            <img className="w-3 h-4" src={arrow} alt="Toggle sidebar" />
          </div>
        </div>
        
        {/* Map area - Takes remaining space */}

       { position ?<div className="flex-1 ">
          <Map data={sampledata.all} position={[40.7128, -74.006]} />
        </div> : ""}
      </div>
    </div>
  );
}

export default App;
