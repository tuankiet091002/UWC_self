import React, { useEffect } from 'react';
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
const Routing = () => {
    const { mcps } = useMCPContext();
    const { trucks } = useTruckContext();
    const path = [
        { x: 10.88131, y: 106.804855 },
        { x: 10.876958, y: 106.794195 },
        { x: 10.872158, y: 106.798235 },
    ]
    const { getTrucks } = useGetTrucks();
    const { getMCPs, isLoading, error } = useGetMCPs();

    useEffect(() => {
        getMCPs();
        getTrucks();

    }, []);
    const map = useMap();
    useEffect(() => {
        L.Routing.control({
            waypoints: [
                L.latLng(path[0].x, path[0].y),
                L.latLng(path[1].x, path[1].y),
                L.latLng(path[2].x, path[2].y),
                // L.latLng(10.876958, 106.342423),
                // L.latLng(mcps[0].x.$numberDecimal, mcps[0].y.$numberDecimal),
                // ...mcps.map(mcp=>{
                //     L.latLng(mcp.x.$numberDecimal, mcp.y.$numberDecimal)
                // })
            ],
            lineOptions: {
                styles: [{
                    color: "blue",
                    weight: 6,
                    opacity: 0.7
                }]
            }
        }).addTo(map);
    }, []);
    return null;

}

export default Routing