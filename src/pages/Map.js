import React from "react";
import { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Container,
  Typography,
  ButtonGroup,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import GetLocation from "../components/Map/MapLocation.js";
import MapSearch from "../components/Map/MapSearch.js";
import GetLatLng from "../components/Map/GetLatLng.js";
import {
  truckIcon,
  MCPfull,
  MCPhalf,
  MCPemp,
} from "../components/Map/MapEntity.js";
import DialogMCP from "../components/Map/DialogMCP.js";
import { useMCPContext } from "../hooks/MCPs/useMCPContext.js";
import { useGetMCPs } from "../hooks/MCPs/useGetMCPs.js";
import { useGetTasks } from "../hooks/Tasks/useGetTasks.js";
import { useDeleteMCP } from "../hooks/MCPs/useDeleteMCP.js";
import { useGetTrucks } from "../hooks/Trucks/useGetTrucks.js";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTruckContext } from "../hooks/Trucks/useTruckContext.js";
import "./map.css";
import Routing from "../components/Map/Routing.js";
const Map = () => {
  const { mcps } = useMCPContext();
  const { trucks } = useTruckContext();
  const { getMCPs } = useGetMCPs();
  const { deleteMCP } = useDeleteMCP();
  const { getTrucks } = useGetTrucks();
  const { getTasks } = useGetTasks();

  const [display, setDisplay] = useState(0);
  const [task, setTask] = useState('')
  const [displayMCP, setDisplayMCP] = useState(mcps);
  const [displayTruck, setDisplayTruck] = useState(trucks);
  const [open, setOpen] = useState(false);

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

            <GetLocation />

            {trucks.length===1 && displayTruck.length===1 && trucks[0]._id===displayTruck[0]._id && task !=='' && (
              <Routing truck={trucks[0]} mcps={mcps} />
            )}
          </MapContainer>
        </Grid>
      </Grid>
    </Container>
  );
};
//why can't change humand
export default Map;
