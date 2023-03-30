import React from 'react'
import { Link } from 'react-router-dom'

import FileBase from 'react-file-base64';
import {
    Stack, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Box, Typography, alpha, FormControl, MenuItem, InputLabel, Select
} from '@mui/material'

const Signup = () => {
    return (
        <Box sx={{
            height: '100%',
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <CssBaseline />
            <Stack direction="row" spacing={2} sx={{ height: '100%' }}>
                <Box sx={{ flexGrow: 1 }} />
                <Stack
                    alignItems='center'
                    sx={{
                        py: 2,
                        width: '750px',
                        backgroundColor: alpha('#ffffff', 0.75)
                    }}
                >
                    <Typography variant="h5" sx={{ my: 2 }}>
                        Đăng ký
                    </Typography>
                    <FormControl sx={{ width: '650px' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Tên"
                            name="name"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControl required sx={{ minWidth: 200 }} margin="normal">
                            <InputLabel id="role">Chức vụ</InputLabel>
                            <Select labelId="role" label="Chức vụ">
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>Collector</MenuItem>
                                <MenuItem value={1}>Janitor</MenuItem>
                                <MenuItem value={2}>Back Officer</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography sx={{ mt: 2 }}>Ảnh đại diện: <FileBase type="file" multiple={false} /></Typography>

                        <Button variant="contained" sx={{ my: 2 }}>
                            Sign In
                        </Button>
                        <Link to="/login">
                            Quay trở lại đăng nhập
                        </Link>
                    </FormControl>
                </Stack>
                <Box sx={{ flexGrow: 1 }} />
            </Stack>
        </Box >
    )
}

export default Signup