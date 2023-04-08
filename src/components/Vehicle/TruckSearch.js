import React, { useState } from "react";

import {
    Button, Card, Select, FormControl, InputLabel,
    MenuItem, Grid, Box
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useTruckContext } from '../../hooks/Trucks/useTruckContext';
import { useGetTrucks } from "../../hooks/Trucks/useGetTrucks";

function TruckSearch() {
    const { trucks } = useTruckContext();
    const { getTrucks, isLoading, error } = useGetTrucks();

    const [form, setForm] = useState({ driver: '', cap: "" });
    /// array => set => array :)
    const allCap = [...(new Set(trucks.map(truck => truck.cap)))]

    return (
        <Card marginTop={5} sx={{ p: 3, width: '100%' }}>
            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <InputLabel id="available-select">Trạng thái</InputLabel>
                    <Select
                        labelId="available-select"
                        label="Trạng thái"
                        defaultValue=""
                        onChange={(e) => { setForm({ ...form, driver: e.target.value }) }}
                    >
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={'true'}>Được lái</MenuItem>
                        <MenuItem value={'false'}>Có thể sử dụng</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <InputLabel id="available-select">Dung tích</InputLabel>
                    <Select
                        labelId="available-select"
                        label="Dung tích"
                        defaultValue=""
                        onChange={(e) => { setForm({ ...form, cap: e.target.value }) }}
                    >
                        <MenuItem value={""}>All</MenuItem>
                        {allCap.map(cap => <MenuItem value={cap} key={cap}>{cap}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>

            <Box marginTop={2}>
                {error ? error.message : null}
                <Button fullWidth variant="contained" color="success" sx={{ borderRadius: 28 }}
                onClick={()=> getTrucks(form)} disabled={isLoading}>
                    <SearchIcon />Search
                </Button>
            </Box>
        </Card>
    )
}
export default TruckSearch;