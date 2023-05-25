import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';

import {
    alpha, AppBar, Tooltip,
    Box, Toolbar, List, CssBaseline, Typography, IconButton, Avatar, Menu, MenuItem,
    ListItem, ListItemButton, ListItemIcon, Paper, Stack, Divider
} from '@mui/material';

import { useAuthContext } from '../../hooks/Auth/useAuthContext';
import { useLogout } from '../../hooks/Auth/useLogout';
import Notification from './Notification';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MapIcon from '@mui/icons-material/Map';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

import logo from '../../assets/logo.jpg';
import title from '../../assets/title.png';
import background from '../../assets/background.png';


const links = [
    { name: 'Thống kê', path: '/', icon: <DashboardIcon sx={{ fontSize: '40px' }} /> },
    { name: 'Phân công', path: '/task', icon: <PendingActionsIcon sx={{ fontSize: '40px' }} /> },
    { name: 'Bản đồ', path: '/map', icon: <MapIcon sx={{ fontSize: '40px' }} /> },
    { name: 'Phương tiện', path: '/truck', icon: <LocalShippingIcon sx={{ fontSize: '40px' }} /> },
    { name: 'Nhân viên', path: '/emp', icon: <PersonIcon sx={{ fontSize: '40px' }} /> },
    { name: 'Nhắn tin', path: '/chat', icon: <ChatIcon sx={{ fontSize: '40px' }} /> },
    { name: 'Đổi tài khoản', path: '/login', icon: <SwitchAccountIcon sx={{ fontSize: '40px' }} /> }
]

const MainLayout = () => {
    const { user } = useAuthContext();

    const { logout } = useLogout();
    const [anchorElUser, setAnchorElUser] = React.useState(false);

    const handleUser = (event) => {
        if (!anchorElUser)
            setAnchorElUser(event.currentTarget);
        else
            setAnchorElUser(null);
    };

    return (
        <Paper sx={{ p: 1, height: '100%', borderRadius: '10px', boxShadow: 'none', display: 'block' }}>
            <CssBaseline />
            <AppBar
                position="sticky"
                elevation={2}
                sx={{ height: "12%", borderRadius: '10px', backgroundImage: `url(${background})`,backgroundSize: "cover", }}>
                <Toolbar>
                    <Link to="/">
                        <IconButton
                            color="text.primary"
                            sx={{marginLeft: '10px',marginRight: '100px'}}
                        >
                            <Box component="img" sx={{ height: '80px', width: '100px' }} src={logo} />
                        </IconButton>
                    </Link>
                    <Typography variant="h4" sx={{flexGrow: 1, fontFamily: "Segoe UI Emoji"}}>URBAN WASTED COLLECTION</Typography>
                    <Stack direction='row' spacing={3} alignItems='center' sx={{ flexGrow: 0.05, color: "text.primary" }}>
                        <Notification/>

                        <IconButton onClick={handleUser}>
                            <Avatar src={user.avatar ? user.avatar : logo} sx={{ width: 40, height: 40 }} />
                            <Typography padding={1} variant="h6" color="white">{user.name}</Typography>
                            <ExpandMoreIcon sx={{ color: "white" }} />
                        </IconButton>

                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleUser}
                            keepMounted={false}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem onClick={logout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Stack direction="row" padding={1} sx={{ height: '88%' }}>
                <Paper elevation={2}
                    sx={{
                        flexGrow: 0,
                        background: "#a3ffbd",
                        my: 5, mr: 5, ml: "-50px",
                        borderRadius: '12px',
                        height: "450px"
                    }}>
                    <List>
                        {links.map((link, index) => (
                            <ListItem key={index} sx={{ p: 0, display: 'block' }}>
                                {link.path === '/login' ? <Divider margin={1} variant="middle" sx={{ mt: 5 }} /> : null}
                                <Link to={link.path}>
                                    <Tooltip title={link.name} placement='right' arrow>
                                        <ListItemButton>
                                            <ListItemIcon
                                                sx={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: "text.primary"
                                                }}>
                                                {link.icon}
                                            </ListItemIcon>
                                        </ListItemButton>
                                    </Tooltip>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Box componenet="main" sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
            </Stack>
        </Paper>
    );
}


export default MainLayout;