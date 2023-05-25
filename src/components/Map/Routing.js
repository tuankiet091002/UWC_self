import { createControlComponent } from "@react-leaflet/core";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


const createRoutineMachineLayer = ({ waypoints }) => {
    const instance = L.Routing.control({
        waypoints: waypoints,
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
        collapsible: true,
        createMarker: function () {
            return null; // This will prevent the marker icon from being shown
        },
    });
    console.log(waypoints)
    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;