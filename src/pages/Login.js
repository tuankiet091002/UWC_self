import React from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/Auth/useLogin'
import { useAuthContext } from '../hooks/Auth/useAuthContext'

import {
    Stack, Button, CssBaseline, TextField,
    Box, Typography, alpha, FormControl
} from '@mui/material'

import logo from '../assets/logo.png'

const Login = () => {
    const { user } = useAuthContext();
    const { login, isLoading, error } = useLogin();
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (

        <Box sx={{
            height: '100%',
            backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/003/552/029/original/green-energy-environmental-concept-design-with-windmills-solar-panels-and-town-vector.jpg)',
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
                        minWidth: '450px',
                        backgroundColor: alpha('#ffffff', 0.54)
                    }}
                >
                    <img src={logo} alt="logo" />
                    <Typography variant="h5" sx={{ my: 2 }}>
                        Đăng nhập
                    </Typography>
                    <FormControl sx={{ minWidth: '350px' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                            onClick={() => login(username, password)}
                        >
                            Sign In
                        </Button>

                        {user?.role === 'backofficer' &&
                            <Link to="/signup">
                                {"Tạo tài khoản mới"}
                            </Link>}
                    </FormControl>
                </Stack>
                <Box sx={{ flexGrow: 2 }} />
            </Stack>
        </Box>
    )
}

export default Login