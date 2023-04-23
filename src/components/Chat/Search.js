import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useGetChats } from "../../hooks/Chat/useGetChats";
const Search = () => {
    const [name, setName] = useState('')
    const { getChats } = useGetChats()

    useEffect(() => {
        getChats({ name })
    }, [name])

    return (
        <Box sx={{ mb: 1, px: 5, display: 'flex', alignItems: 'center', width: "100%", justifyContent: "center" }}>
            <TextField fullWidth label={<Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <SearchIcon />Search</Typography>}
                variant="outlined" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 7 } }}
                value={name}
                onChange={e => setName(e.target.value)} />
        </Box>
    );
};

export default Search;
