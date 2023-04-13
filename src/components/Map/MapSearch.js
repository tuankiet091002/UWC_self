import React, { useState } from "react";

import {
    Button, Card, Select, FormControl, InputLabel,
    MenuItem, Grid, Box, TextField,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


function MapSearch() {
    const [form, setForm] = useState({ name: "", role: "" });
    return (
        <Card sx={{ p: 3, width: '100%' }}>
            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Item</InputLabel>
                    <Select
                        labelId="select-label"
                        label="Hiển thị"
                    >
                        <MenuItem value={0}>Tất cả</MenuItem>
                        <MenuItem value={1}>Truck</MenuItem>
                        <MenuItem value={2}>MCP</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid marginTop={2}>
                <TextField label="Search" variant="outlined" fullWidth />
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