import React from 'react'
import { Link } from 'react-router-dom'
import {
    Stack, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Box, Typography, alpha, FormControl
} from '@mui/material'

import logo from '../assets/logo.png'

const Login = () => {
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
                <Box sx={{ flexGrow: 7 }} />
                <Stack
                    alignItems='center'
                    sx={{
                        py: 2,
                        width: '650px',
                        backgroundColor: alpha('#ffffff', 0.54)
                    }}
                >
                    <img src={logo} alt="logo" />
                    <Typography variant="h5" sx={{ my: 2 }}>
                        Đăng nhập
                    </Typography>
                    <FormControl sx={{ width: '550px' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Link to="/signup">
                            {"Chưa có tài khoản? Đăng ký"}
                        </Link>
                    </FormControl>
                </Stack>
                <Box sx={{ flexGrow: 2 }} />
            </Stack>
        </Box>
    )
}

export default Login