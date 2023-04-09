import React from 'react';
import { useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, MenuItem, Select, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Icons } from '../icon.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import MapSearch from '../components/Map/MapSearch.js';

var MCPfull = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',  
    iconUrl: Icons.trashFullIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
var MCPemp = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',  
    iconUrl: Icons.trashEmptyIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
var MCPhalf = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',  
    iconUrl: Icons.trashHaflIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
var truckIcon = L.icon({
    //iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',  
    iconUrl: Icons.TruckIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

var mylocation = L.icon({
    iconUrl: Icons.MyloIcon,
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});



console.log(Icons);
// function ComponentDidMount(){
//   navigator.geolocation.getCurrentPosition((position) => {
//     this.setState({
//       latitude: position.coords.latitude, 
//       longitude: position.coords.longitude
//     })
//   });
// }

const Map = () => {

    const [truckLocation, setTruckLocation] = useState({
        location: {
            lat: 108.6,
            lng: 10
        },
        zoom: 2,
        situation: 10
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords;
            setTruckLocation({
                location: {
                    lat: latitude - 0.001,
                    lng: longitude - 0.004
                },
                zoom: 13,
                situation: 10
            });
        }, (error) => {
            console.log(error);
        });
    }, []);

    const [MCPFullLocation, setMCPFullLocation] = useState({
        location: {
            lat: 108.6,
            lng: 10
        },
        zoom: 2,
        situation: 10
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords;
            setMCPFullLocation({
                location: {
                    lat: latitude - 0.003,
                    lng: longitude + 0.01
                },
                zoom: 13,
                situation: 10
            });
        }, (error) => {
            console.log(error);
        });
    }, []);
    const [MCPHalfLocation, setMCPHalfLocation] = useState({
        location: {
            lat: 108.6,
            lng: 10
        },
        zoom: 2,
        situation: 10
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords;
            setMCPHalfLocation({
                location: {
                    lat: latitude + 0.001,
                    lng: longitude + 0.01
                },
                zoom: 13,
                situation: 10
            });
        }, (error) => {
            console.log(error);
        });
    }, []);
    const [MCPEmpLocation, setMCPEmpLocation] = useState({
        location: {
            lat: 108.6,
            lng: 10
        },
        zoom: 2,
        situation: 10
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords;
            setMCPEmpLocation({
                location: {
                    lat: latitude + 0.001,
                    lng: longitude + 0.001
                },
                zoom: 13,
                situation: 10
            });
        }, (error) => {
            console.log(error);
        });
    }, []);

    const [position, setPosition] = useState({
        location: {
            lat: 0,
            lng: 0
        },
        zoom: 2,
        haveMCPLocation: false
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords;
            setPosition({
                location: {
                    lat: latitude,
                    lng: longitude
                },
                zoom: 13,
                haveMCPLocation: true
            });
        }, (error) => {
            console.log(error);
        });
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [Item, setAge] = React.useState('');
    const [selectedValue, setSelectedValue] = React.useState('MCP');



    //const po=[position.location.lat, position.location.lng];
    return (
        <Container maxWidth={false} sx={{ mx: 0, overflow: 'hidden' }}>
            <Grid container spacing={3} sx={{ my: 2, height: '100%' }}>
                <Grid item xs={3} columnSpacing={2} >
                    <Typography textAlign="center" variant="h4">Phương tiện</Typography>
                    <MapSearch />
                </Grid>

                <Grid xs={9}>
                    {position.haveMCPLocation && (
                        <MapContainer style={{ height: '800vh' }} center={[position.location.lat, position.location.lng]} zoom={15} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.facebook.com/chacachiene/">Nguyen Phat</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker icon={mylocation} position={[position.location.lat, position.location.lng]}>
                                <Popup>
                                    This is my location.
                                </Popup>
                            </Marker>


                            <Marker icon={truckIcon} position={[truckLocation.location.lat, truckLocation.location.lng]}>
                                <Popup>
                                    I am a truck <br /> I am going to MCP.
                                </Popup>
                            </Marker>

                            <Marker icon={MCPfull} position={[MCPFullLocation.location.lat, MCPFullLocation.location.lng]}>
                                <Popup>
                                    This MCP is full <br /> Please come here now.
                                </Popup>
                            </Marker>

                            <Marker icon={MCPhalf} position={[MCPHalfLocation.location.lat, MCPHalfLocation.location.lng]}>
                                <Popup>
                                    This MCP is half of full <br /> You can come here or not.
                                </Popup>
                            </Marker>

                            <Marker icon={MCPemp} position={[MCPEmpLocation.location.lat, MCPEmpLocation.location.lng]}>
                                <Popup>
                                    This MCP is empty <br /> Stay away from me.
                                </Popup>
                            </Marker>
                        </MapContainer>

                    )}
                </Grid>
            </Grid>
        </Container>
    )
}
//why can't change humand
export default Map