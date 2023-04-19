import { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import { Icons } from '../../icon';
import L from 'leaflet';
export const MCPfull = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',  
    iconUrl: Icons.trashFullIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
export const MCPemp = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',  
    iconUrl: Icons.trashEmptyIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
export const MCPhalf = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',  
    iconUrl: Icons.trashHaflIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
export const truckIcon = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',  
    iconUrl: Icons.TruckIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

export const mylocation = L.icon({
    iconUrl: Icons.MyloIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});