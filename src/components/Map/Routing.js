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

const Routing = ({truck, mcps}) => {
    const map = useMap();
    const [waypoints, setWaypoint] = useState([]);
    console.log({truck, mcps})
    useEffect(() => {
        try {
            setWaypoint([{ x: truck.x.$numberDecimal, y: truck.y.$numberDecimal},
                ...mcps.map(mcp => {return {x:mcp.x.$numberDecimal, y: mcp.y.$numberDecimal}})
            ]);
        } catch (error) {
        console.error(error);
        }
    }, [truck, mcps]);

    useEffect(() => {
        const waypointsReal = waypoints.map(x => {
            return L.latLng(x.x, x.y);
        });
        
        if (truck && mcps && map) {
            L.Routing.control({
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
        }
    }, [truck, mcps, map]);

    return null;
    try {
        // your code here
      } catch (error) {
        console.error(error);
      }
}

export default Routing;
