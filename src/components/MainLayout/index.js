import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/Auth/useAuthContext';
import { TruckContextProvider } from '../../contexts/TruckContext';
import { useLogout } from '../../hooks/Auth/useLogout';

import {
    alpha, AppBar, Tooltip,
    Box, Toolbar, List, CssBaseline, Typography, IconButton, Avatar, Menu, MenuItem,
    ListItem, ListItemButton, ListItemIcon, Paper, Badge, Stack, Divider
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MapIcon from '@mui/icons-material/Map';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import styles from "./Main.module.css"


import logo from '../../assets/logo.png';
import cum from '../../assets/cum.jpg';


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
        
        <div className={styles.container}>
            <div className={styles.header}
            >
                
                <div className={styles.logo} >
                     <Link to="/">
                        <IconButton
                            color="text.primary"
                        >
                            <img src={logo}></img>
                        </IconButton>
                    </Link>
                    
                    </div>
                    <h4 className={styles.title}>Đồ án tổng hợp CNPM</h4>

                    <div className={styles.rightHeader}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <div className={styles.user} onClick={handleUser}>
                            <Avatar src={user.avatar ? user.avatar : cum} sx={{ width: 40, height: 40 }} />
                            <h6 className={styles.username}>{user.name}</h6>
                            <ExpandMoreIcon sx={{ color: "text.primary" }} />
                        </div>

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
                    </div>
               
            </div>
            <div className={styles.displayNav} >
                        <MenuIcon sx={{color: 'text.primary'}}/>
                    </div>       
            <Stack direction="row" sx={{ minHeight: '70vh', mx:4}}>
                            
               
                    <div className={styles.navbar}>
                    <List>
                        {links.map((link, index) => (
                            <ListItem key={index} sx={{ p: 0, display: 'block' }}>
                                {link.path === '/login' ? <Divider margin={1} variant="middle" sx={{ mt: 5 }} /> : null}
                                <Link to={link.path}>
                                    <Tooltip title={link.name} placement='right' arrow>
                                        <ListItemButton >
                                            <ListItemIcon
                                                sx={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: "text.primary",
                                                    fontSize: '40px'
                                                    color: "text.primary",
                                                    '& svg': {
                                                        fontSize: '40px',

                                                    },
                                                }}>
                                                {link.icon}
                                            </ListItemIcon>
                                        </ListItemButton>
                                    </Tooltip>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    </div>
                    
                <div className={styles.outerContainer} >
                    
                    <Outlet />
                </div>
            </Stack>
        </div>
    

    );
}


export default MainLayout;