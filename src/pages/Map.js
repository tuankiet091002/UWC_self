import React from "react";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

import { Button, Container, Typography, ButtonGroup } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTruckContext } from "../hooks/Trucks/useTruckContext.js";
import "./map.css";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import GetLocation from "../components/Map/MapLocation.js";
import MapSearch from "../components/Map/MapSearch.js";
import GetLatLng from "../components/Map/GetLatLng.js";
import Routing from "../components/Map/Routing.js";
import MCPEditForm from "../components/Map/MCPEditForm.js";
import MCPForm from "../components/Map/MCPForm.js";
import { truckIcon, MCPfull, MCPhalf, MCPemp } from "../components/Map/MapEntity.js";

import { useMCPContext } from "../hooks/MCPs/useMCPContext.js";
import { useGetMCPs } from "../hooks/MCPs/useGetMCPs.js";
import { useGetTasks } from "../hooks/Tasks/useGetTasks.js";
import { useDeleteMCP } from "../hooks/MCPs/useDeleteMCP.js";
import { useGetTrucks } from "../hooks/Trucks/useGetTrucks.js";



const Map = () => {
    const { mcps } = useMCPContext();
    const { trucks } = useTruckContext();
    const { getMCPs } = useGetMCPs();
    const { deleteMCP } = useDeleteMCP();
    const { getTrucks } = useGetTrucks();
    const { getTasks } = useGetTasks();
    const [display, setDisplay] = useState(0);
    const [curMCP, setCurMCP] = useState(null);
    const [task, setTask] = useState('')
    const [displayMCP, setDisplayMCP] = useState(mcps);
    const [displayTruck, setDisplayTruck] = useState(trucks);
    const [open, setOpen] = useState(false);
    const rMachine = useRef();
    const [waypoints, setWaypoints] = useState([]);

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

    useEffect(() => {
        if (task && display === 0) {
            if (rMachine.current) {
                if (trucks[0].nextMCP === null)
                    rMachine.current.setWaypoints([]);
                else {
                    const truckPoint = { x: trucks[0].x, y: trucks[0].y }
                    const endPoint = { x: 10.882085252264929, y: 106.80478992730173 }
                    const index = displayMCP.findIndex(x => x._id === displayTruck[0].nextMCP);

                    rMachine.current.setWaypoints([...[truckPoint,
                        ...displayMCP].slice(index).map(mcp => { return { x: mcp.x.$numberDecimal, y: mcp.y.$numberDecimal } }),
                        endPoint].map(x => { return L.latLng(x.x, x.y); }))
                }
            }
        }
    }, [trucks, mcps])

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
                    />
                    <Button onClick={() => setOpen(true)} variant="outlined" fullWidth>
                        Tạo MCP
                    </Button>
                    <MCPForm open={open} onClose={() => setOpen(false)} />

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
                        <TileLayer
                            attribution='&copy; <a href="https://www.facebook.com/chacachiene/">Nguyen Phat</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <GetLatLng />

                        {displayMCP.map((mcp) => {
                            let icon;
                            if (mcp.load.$numberDecimal / mcp.cap > 0.8) {
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
                                            <Button onClick={() => setCurMCP(mcp)}>
                                                <BorderColorIcon />
                                            </Button>
                                            <Button
                                                color="error"
                                                onClick={() => deleteMCP(mcp._id)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </ButtonGroup>
                                    </Popup>
                                    <Tooltip direction="top" offset={[0, -38]}>
                                        MCP ID: {mcp._id}
                                    </Tooltip>
                                </Marker>
                            );
                        })}
                        <MCPEditForm
                            curMCP={curMCP}
                            open={Boolean(curMCP)}
                            onClose={() => setCurMCP(null)}
                        />

                        {displayTruck.map((truck) => {
                            return (
                                <Marker
                                    icon={truckIcon}
                                    position={[truck.x.$numberDecimal, truck.y.$numberDecimal]}
                                    key={truck._id}
                                >
                                    <Tooltip direction="top" offset={[0, -38]}>
                                        Truck ID: {truck._id}
                                    </Tooltip>
                                    <Popup>
                                        Load: {truck.load.$numberDecimal} <br />
                                        Capacity: {truck.cap} <br />
                                        {truck.nextMCP && <div>NextMCP: {truck.nextMCP} </div>}
                                        {truck.driver && <div> Driver: {truck.driver.name} </div>}
                                    </Popup>
                                </Marker>
                            );
                        })}

                        <div className="leaflet-top leaflet-left">
                            <button className="leaflet-bar" style={{ marginTop: "10vh", marginLeft: "0.7rem" }}>
                                <MyLocationIcon />
                            </button>
                        </div>
                        <GetLocation />
                        {task && display === 0 && <Routing ref={rMachine} waypoints={waypoints} />}
                    </MapContainer>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Map;