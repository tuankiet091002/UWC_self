import React, { useState } from "react";

import {
    Button, Select, FormControl, InputLabel,
    MenuItem, TextField, Grid, Stack
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useGetEmps } from "../../hooks/Emps/useGetEmps";
import styles from "./Employee.module.css"


function EmployeeSearch() {
    const [form, setForm] = useState({ name: "", role: "" });
    const { getEmps, isLoading, error } = useGetEmps();

    return (
    
        <div className={styles.search}>
            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <InputLabel id="role-select">Vị trí</InputLabel>
                    <Select
                        labelId="role-select"
                        label="Vị trí"
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={"backofficer"}>Back Officer</MenuItem>
                        <MenuItem value={"janitor"}>Janitor</MenuItem>
                        <MenuItem value={"collector"}>Collector</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <TextField label="Tên" variant="outlined" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </FormControl>
            </Grid>
            <Stack marginTop={2} alignItems='center'>
                {error ? error.message : null}
                <Button fullWidth variant="contained" color="success" sx={{ borderRadius: 28 }}
                    onClick={() => { getEmps(form) }} disabled={isLoading}>
                    <SearchIcon />Search
                </Button>
            </Stack>
        </div>
    )
}
export default EmployeeSearch;