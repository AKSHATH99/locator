import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import arrow from "./assets/arrow.png";
import "./App.css";
import Map from "./components/Map";
import SideBar from "./components/SideBar";
import findNearestStore from "./utils/FindNearestStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";

const healthcareTags = [
  { value: "pharmacy", label: "Pharmacy" },
  { value: "hospital", label: "Hospital" },
  { value: "doctors", label: "Doctors" },
  { value: "clinic", label: "Clinic" },
  { value: "dentist", label: "Dentist" },
  { value: "alternative", label: "Alternative Medicine" },
  { value: "laboratory", label: "Laboratory" },
  { value: "physiotherapist", label: "Physiotherapist" },
  { value: "optometrist", label: "Optometrist" },
  { value: "rehabilitation", label: "Rehabilitation Center" },
  { value: "blood_donation", label: "Blood Donation Center" },
  { value: "birthing_center", label: "Birthing Center" },
  { value: "emergency", label: "Emergency Services" },
];

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
  const [position, setPosition] = useState([18.926736, 72.833797]);
  const [pharmacyData, setPharmacyData] = useState([]);
  const [radius, setRadius] = useState(1000);
  const [filter , setFilter] = useState();
  const [fetching , setFetching]=useState(false);

  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

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
        // alert("");
        notify("Failed to fetch location.")
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    setFetching(true)
    findUserLocation();
  }, []);

  useEffect(()=>{
    console.log(fetching)
  },[fetching])


  useEffect(()=>{
    console.log(position)
  },[position])

  useEffect(() => {
    const fetchNearestStore = async () => {
      // 18.926736, 72.833797 -> for indian map
      // console.log(position[0], position[1]);
      if(position){
        const result = await findNearestStore(position[0], position[1], radius , filter);
        console.log(result.found);
        if(!result.found){
          console.log("no data hahah  ")
          notify("No nearby found ")
        }
        setPharmacyData(result);  
        setFetching(false)
      }else{
        notify("Location not fetched")
      }

      
     
    };

    fetchNearestStore();
  }, [position, radius, filter]);

  useEffect(() => {
    console.log("pharmacyData>>", pharmacyData.found);
  }, [pharmacyData]);

  return (
    <div className="h-screen w-screen bg-gray-50">
      <ToastContainer/>
      <div className="flex flex-col h-screen">
        {/* Header - Fixed at top */}
        <div className="p-6 bg-white shadow-sm">
          <div className="flex gap-3 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 48 48"
              id="Medicine--Streamline-Kameleon"
              height="48"
              width="48"
              className="drop-shadow-md"
            >
              <path
                fill="#92de46"
                d="M24.0006 48.0012c13.2553 0 24.0006 -10.7453 24.0006 -24.0006C48.0012 10.7453 37.2559 0 24.0006 0 10.7453 0 0 10.7453 0 24.0006c0 13.2553 10.7453 24.0006 24.0006 24.0006Z"
                strokeWidth="1"
              ></path>
              <path
                fill="#000000"
                d="M32.7284 18.7639c0 -0.9258 -0.3678 -1.8138 -1.0225 -2.4685 -0.6546 -0.6546 -1.5426 -1.0225 -2.4685 -1.0225h-10.473c-0.9258 0 -1.8138 0.3679 -2.4685 1.0225 -0.6547 0.6547 -1.0225 1.5427 -1.0225 2.4685v15.7095c0 0.9259 0.3678 1.8139 1.0225 2.4686 0.6547 0.6546 1.5427 1.0224 2.4685 1.0224h10.473c0.9259 0 1.8139 -0.3678 2.4685 -1.0224 0.6547 -0.6547 1.0225 -1.5427 1.0225 -2.4686V18.7639Z"
                strokeWidth="1"
              ></path>
              <path
                fill="#ffffff"
                fillRule="evenodd"
                d="M32.7284 20.5098h-17.455v-1.3091h17.455v1.3091Zm-17.455 12.2185h17.455v1.3091h-17.455v-1.3091Z"
                clipRule="evenodd"
                strokeWidth="1"
              ></path>
              <path
                fill="#ffffff"
                d="M32.7284 14.3999c0 0.2314 -0.0919 0.4534 -0.2556 0.6171 -0.1637 0.1637 -0.3857 0.2556 -0.6171 0.2556H16.1462c-0.2315 0 -0.4535 -0.0919 -0.6171 -0.2556 -0.1637 -0.1637 -0.2557 -0.3857 -0.2557 -0.6171v-3.491c0 -0.2315 0.092 -0.4535 0.2557 -0.6171 0.1636 -0.1637 0.3856 -0.2557 0.6171 -0.2557h15.7095c0.2314 0 0.4534 0.092 0.6171 0.2557 0.1637 0.1636 0.2556 0.3856 0.2556 0.6171v3.491Z"
                strokeWidth="1"
              ></path>
              <path
                fill="#ffffff"
                d="M28.8004 24.6191h-2.8002v-2.8003h-3.9998v2.8003h-2.8002v3.9998h2.8002v2.8002h3.9998v-2.8002h2.8002v-3.9998Z"
                strokeWidth="1"
              ></path>
            </svg>
            <div>
              <p className="text-4xl font-bold text-[#92DE46]">Pharm-locator</p>
              <p className="text-lg text-gray-500 mt-1">
                Find the nearest medical services near you in a go!
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Developed by{" "}
            <a
              href="https://akshathp.xyz/"
              target="_blank"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              <span className="underline">akshath</span>
            </a>
          </p>
        </div>
        {/* Controls Section */}
        <div className="px-6 py-4 bg-white border-t border-b border-gray-200">
        { fetching? <div className="flex gap-2 text-[#92DE46]">
          <p>Fetching nearby medical services</p>
          <Loader/>
        </div> :""}
          <div className="flex flex-wrap items-center gap-6">
            {/* Location Button */}
            <button
              onClick={() => {
                findUserLocation();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <svg
                viewBox="0 0 16 16"
                fill="#92DE46"
                xmlns="http://www.w3.org/2000/svg"
                id="Crosshair-Line--Streamline-Remix"
                height="16"
                width="16"
              >
                <desc>
                  Crosshair Line Streamline Icon: https://streamlinehq.com
                </desc>
                <path
                  d="M8.666666666666666 13.292066666666665c2.4124666666666665 -0.30079999999999996 4.3246 -2.212933333333333 4.6254 -4.6254H11.333333333333332v-1.3333333333333333h1.9587333333333332C12.991266666666665 4.9208533333333335 11.079133333333333 3.0087599999999997 8.666666666666666 2.7079266666666664V4.666666666666666h-1.3333333333333333V2.7079266666666664C4.9208533333333335 3.0087599999999997 3.0087599999999997 4.9208533333333335 2.7079266666666664 7.333333333333333H4.666666666666666v1.3333333333333333H2.7079266666666664C3.0087599999999997 11.079133333333333 4.9208533333333335 12.991266666666665 7.333333333333333 13.292066666666665V11.333333333333332h1.3333333333333333v1.9587333333333332ZM8 14.666666666666666C4.318099999999999 14.666666666666666 1.3333333333333333 11.681866666666666 1.3333333333333333 8 1.3333333333333333 4.318099999999999 4.318099999999999 1.3333333333333333 8 1.3333333333333333c3.6818666666666666 0 6.666666666666666 2.9847666666666663 6.666666666666666 6.666666666666666 0 3.6818666666666666 -2.9848 6.666666666666666 -6.666666666666666 6.666666666666666Zm0 -5.333333333333333c-0.7363999999999999 0 -1.3333333333333333 -0.5969333333333333 -1.3333333333333333 -1.3333333333333333s0.5969333333333333 -1.3333333333333333 1.3333333333333333 -1.3333333333333333 1.3333333333333333 0.5969333333333333 1.3333333333333333 1.3333333333333333 -0.5969333333333333 1.3333333333333333 -1.3333333333333333 1.3333333333333333Z"
                  strokeWidth="0.6667"
                ></path>
              </svg>
              <span className="text-[#92DE46] font-medium">My location</span>
            </button>

            {/* Radius Slider */}
            <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[#92DE46] font-medium whitespace-nowrap">
                Radius:
              </span>
              <input
                type="range"
                min="1000"
                max="5000"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-64 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-gray-800 font-semibold min-w-16">
                {radius}m
              </span>
            </div>

            <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[#92DE46] font-medium whitespace-nowrap">
                Type:
              </span>
              <select
                name="type"
                onChange={(e) => setFilter(e.target.value)}
                className="w-64  py-2 text-center rounded-md border cursor-pointer max-h-10 overflow-auto"
                
              >
                {healthcareTags.map((tag, index) => (
                  <option key={index} value={tag.value}>
                    {tag.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Main content area - Sidebar and Map */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Fixed on left */}
          <div
            className={`${
              openSideBar ? "w-1/4 min-w-64" : "w-0"
            } transition-all duration-300 border-r border-gray-200 bg-white`}
          >
            {openSideBar && pharmacyData? (
              <div className="h-full overflow-auto p-4">
                <SideBar data={pharmacyData.all} />
              </div>
            ):""}
          </div>

          {/* Toggle sidebar button */}
          <div className="flex items-center">
            <button
              className="bg-white p-2 border border-gray-200 rounded-r-lg hover:bg-gray-50 transition-colors"
              onClick={() => {
                setOpenSidebar(!openSideBar);
              }}
            >
              <img className="w-3 h-4" src={arrow} alt="Toggle sidebar" />
            </button>
          </div>

          {/* Map area - Takes remaining space */}
          {position.length>0 && pharmacyData ? (
            <div className="flex-1 relative">
              <Map data={pharmacyData.all} position={position} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-100">
              <div className="text-center p-6 rounded-lg bg-white shadow-md">
                <p className="text-lg text-gray-600">
                  Please select your location to view the map
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
