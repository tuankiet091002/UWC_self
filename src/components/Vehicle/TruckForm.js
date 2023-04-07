import { Button, Card, Select, FormControl, InputLabel,
    MenuItem, TextField, Grid, Box } from "@mui/material";
import React, { useState } from "react";

function TruckForm (_type, _name) {
    const [type, setType] = useState(_type);
    const [name, setName] = useState(null);

    const handleChange = (value) => () => {
        setType(value);
    }
    return(
        <Card marginTop={5} sx={{width: '15rem'}}>
            <Grid marginTop={2}>
                <FormControl fullWidth>
                <InputLabel id="type-select"></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        defaultValue="truck"
                        onChange={(e) => {setType(e.target.value)}}
                    >
                        <MenuItem value={"truck"}>Truck</MenuItem>
                        <MenuItem value={"troller"}>Troller</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid marginTop={2}>
                <FormControl fullWidth>
                    <TextField id="name-field" label="Search" variant="outlined"/>
                </FormControl>
            </Grid>
            <Box marginTop={2}>
                <Button fullWidth variant="contained" color="success">
                    Search
                </Button>
            </Box>
        </Card>
    )
}
export default TruckForm;