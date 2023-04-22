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

  useEffect(() => {
    getMCPs();
    getTrucks();
    getTasks();
  }, []);

  useEffect(() => {
    if (display !== 1) setDisplayMCP(mcps);
    else setDisplayMCP([]);
  }, [mcps]);

  useEffect(() => {
    if (display !== 2) setDisplayTruck(trucks);
    else setDisplayTruck([]);
  }, [trucks]);

  const handleDeleteMCP = (id) => {
    deleteMCP(id);
  };
  console.log(display);
  console.log(trucks);
  console.log(mcps);
  return (
    <Container maxWidth={false} sx={{ mx: 0, overflow: "hidden" }}>
      <Grid container spacing={3} sx={{ my: 2, height: "100%" }}>
        <Grid item xs={3} columnSpacing={2} sx={{ pt: 3 }}>
          <Typography textAlign="center" variant="h4">
            Bản đồ
          </Typography>
          <MapSearch
          task={task}
          setTask={setTask}
            display={display}
            setDisplay={setDisplay}
            setDisplayMCP={setDisplayMCP}
            setDisplayTruck={setDisplayTruck}
          />
          <Button onClick={() => setOpen(true)} variant="outlined" fullWidth>
            Tạo MCP
          </Button>
          <DialogMCP open={open} onClose={() => setOpen(false)} />

          <Typography>
            MCP hien thi: {displayMCP.map((x) => x._id).join(", ")}
          </Typography>
          <Typography>
            Truck hien thi: {displayTruck.map((x) => x._id).join(", ")}
          </Typography>
        </Grid>
        <Grid xs={9}>
          <MapContainer
            style={{ height: "500px" }}
            center={[10.876958, 106.794195]}
            zoom={15}
            scrollWheelZoom={true}
          >
            {/* <Routing /> */}

            <TileLayer
              attribution='&copy; <a href="https://www.facebook.com/chacachiene/">Nguyen Phat</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GetLatLng />

            {(display === 2 || display === 0) &&
              mcps.map((mcp) => {
                let icon;
                if (mcp.load.$numberDecimal / mcp.cap > 0.7) {
                  icon = MCPfull;
                } else if (mcp.load.$numberDecimal / mcp.cap > 0.3) {
                  icon = MCPhalf;
                } else {
                  icon = MCPemp;
                }
                return (
                  <Marker
                    icon={icon}
                    position={[mcp.x.$numberDecimal, mcp.y.$numberDecimal]}
                    key={mcp._id}
                  >
                    <Popup>
                      Load: {mcp.load.$numberDecimal} <br />
                      Capacity: {mcp.cap} <br />
                      <ButtonGroup variant="contained" size="xsmall">
                        <Button onClick={() => setOpen(true)}>
                          <BorderColorIcon />
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleDeleteMCP(mcp._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                      <DialogMCP
                        curMCP={mcp}
                        open={open}
                        onClose={() => setOpen(false)}
                      />
                    </Popup>
                    <Tooltip direction="bottom" style={{ marginTop: "-20px" }}>
                      MCP ID: {mcp._id}
                    </Tooltip>
                  </Marker>
                );
              })}

            {(display === 1 || display === 0) &&
              trucks.map((truck) => {
                return (
                  <Marker
                    icon={truckIcon}
                    position={[truck.x.$numberDecimal, truck.y.$numberDecimal]}
                    key={truck._id}
                  >
                    <Tooltip direction="bottom" style={{ bottom: "0px" }}>
                      Truck ID: {truck._id}
                    </Tooltip>
                    <Popup>
                      Load: {truck.load.$numberDecimal} <br />
                      Capacity: {truck.cap} <br />
                      NextMCP: {truck.nextMCP} <br />
                      Driver: {truck.driver}
                    </Popup>
                  </Marker>
                );
              })}

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