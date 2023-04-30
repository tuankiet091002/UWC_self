import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { useMap } from 'react-leaflet';
import { useGetTrucks } from '../../hooks/Trucks/useGetTrucks';
import { useGetMCPs } from '../../hooks/MCPs/useGetMCPs';
import { useTruckContext } from '../../hooks/Trucks/useTruckContext'
import { useMCPContext } from '../../hooks/MCPs/useMCPContext.js';

const Routing = ({mytruck, mymcps}) => {
    const map = useMap();
    const [routingControl, setRoutingControl] = useState(undefined); // Keep track of the routing control instance

    var waypoints = []
    
    try {
        waypoints = [{ x: mytruck.x.$numberDecimal, y: mytruck.y.$numberDecimal},
            ...mymcps.map(mcp => {return {x:mcp.x.$numberDecimal, y: mcp.y.$numberDecimal}})
        ];
    } catch (error) {
    
    }

    var waypointsReal = waypoints.map(x => {
        return L.latLng(x.x, x.y);
    });

    console.log('WAY POINTTTTTTTTT')
    console.log(waypointsReal)

    useEffect(() => {
        if (mytruck && mymcps && map) {
            const newRoutingControl = L.Routing.control({
                waypoints: waypointsReal,
                lineOptions: {
                    styles: [{
                        color: "blue",
                        weight: 6,
                        opacity: 0.7
                    }]
                },
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                showAlternatives: false,
                show: false,
                routeWhileDragging: false,
                autoRoute: true,
                useZoomParameter: true,
                createMarker: function () {
                    return null; // This will prevent the marker icon from being shown
                },
            }).addTo(map);
            
            setRoutingControl(newRoutingControl); // Save the instance to state
        }
    }, [mytruck, mymcps, map]);

    useEffect(() => {
        return () => {
            try {
                // Remove the routing control instance when the component unmounts
                if (routingControl !== undefined && routingControl !== null) {
                    routingControl._clearLines();
                    map.removeControl(routingControl);
                }
            } catch (error) {
                // Catch and ignore the error
            }
        }
    }, [routingControl, map]);

    return null;
}

export default Routing;
