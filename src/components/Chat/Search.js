import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const [search, setSearch] = useState('')
    return (
        <Box sx={{ mb: 1, px: 5, display: 'flex', alignItems: 'center', width: "100%", justifyContent: "center" }}>
            <TextField fullWidth label={<Typography sx={{ display: 'flex', alignItems: 'center' }} value={search} onChange={e => setSearch(e.target.value)}><SearchIcon />Search</Typography>} variant="outlined" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 7 } }} />
        </Box>
    );
};

export default Search;