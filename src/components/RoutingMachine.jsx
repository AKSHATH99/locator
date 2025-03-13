import React , {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


const RoutingMachine = ({userPosition , destination})=>{
    const map = useMap();
    const [routingControl , setRoutingControl] = useState(null)

    useEffect(() => {
        if (!userPosition || !destination) return;
    
        // Clean up previous routing control if it exists
        if (routingControl) {
          map.removeControl(routingControl);
        }
    
        // Create new routing control
        const routeControl = L.Routing.control({
          waypoints: [
            L.latLng(userPosition[0], userPosition[1]),
            L.latLng(destination[0], destination[1])
          ],
          routeWhileDragging: false,
          showAlternatives: false,
          fitSelectedRoutes: true,
          lineOptions: {
            styles: [{ color: '#3234a8', weight: 4 }]
          },
          show: false,
          createMarker: function() { return null; }, // Don't create markers, we have our own
        addWaypoints: false 
        }).addTo(map);
    
        setRoutingControl(routeControl);
    
        return () => {
          if (routeControl) {
            map.removeControl(routeControl);
          }
        };
      }, [map, userPosition, destination]);

    return null
}

export default RoutingMachine;