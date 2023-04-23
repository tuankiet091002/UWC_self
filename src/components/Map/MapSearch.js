import React, { useState, useEffect } from "react";

import {
    Button, Card, Select, FormControl, InputLabel,
    MenuItem, Grid, Box, TextField,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useTaskContext } from "../../hooks/Tasks/useTaskContext";
import { useGetMCPs } from "../../hooks/MCPs/useGetMCPs";
import { useGetTrucks } from "../../hooks/Trucks/useGetTrucks";
import styles from "../Employee/Employee.module.css"
function MapSearch({ display, setDisplay }) {
    const { tasks } = useTaskContext();

    const { getTrucks } = useGetTrucks();
    const { getMCPs } = useGetMCPs();


    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        getTrucks({ task })
        getMCPs({ task })
    }

    return (
        <div className={styles.search}>
            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Hiển thị</InputLabel>
                    <Select
                        labelId="select-label"
                        label="Hiển thị"
                        value={display}
                        onChange={(e) => setDisplay(e.target.value)}
                    >
                        <MenuItem value={0}>Tất cả</MenuItem>
                        <MenuItem value={1}>Truck</MenuItem>
                        <MenuItem value={2}>MCP</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Nhiệm vụ</InputLabel>
                    <Select
                        labelId="select-label"
                        label="Nhiệm vụ"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    >
                        {tasks.map((task) => (
                            <MenuItem key={task._id} value={task._id}>{task._id}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Nhiệm vụ</InputLabel>
                    <Select
                        labelId="select-label"
                        label="Nhiệm vụ"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    >
                        {tasks.map((task) => (
                            <MenuItem key={task._id} value={task._id}>{task._id}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Box marginTop={2}>
                <Button fullWidth variant="contained" color="success" sx={{ borderRadius: 28 }} onClick={handleSubmit}>
                    <SearchIcon />Search
                </Button>
            </Box>
        </div>
    )
}
export default MapSearch;