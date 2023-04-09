import React, { useState } from "react";

import {
    Button, Card, Select, FormControl, InputLabel,
    MenuItem, Grid, Box, TextField, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useTruckContext } from '../../hooks/Trucks/useTruckContext';
import { useGetTrucks } from "../../hooks/Trucks/useGetTrucks";

function MapSearch() {

    return (
        <Card marginTop={5} sx={{ p: 3, width: '100%' }}>
            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Item</InputLabel>
                    <Select
                        labelId="select-label"
                        id="simple-select"
                        label="Item"
                        sx={{ mb: "2px" }}
                    >
                        <MenuItem value={10}>Truck</MenuItem>
                        <MenuItem value={20}>MCP</MenuItem>
                        <MenuItem value={30}></MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid marginTop={2}>
                <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth sx={{ mb: "2px" }} />
            </Grid>

            <Box marginTop={2}>
                <Button fullWidth variant="contained" color="success" sx={{ borderRadius: 28 }}>
                    <SearchIcon />Search
                </Button>
            </Box>
        </Card>
    )
}
export default MapSearch;