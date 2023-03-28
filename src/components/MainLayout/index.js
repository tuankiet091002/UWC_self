import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


import {
    alpha, AppBar, Tooltip,
    Box, Toolbar, List, CssBaseline, Typography, IconButton, Avatar, Menu, MenuItem,
    ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Badge, Stack, Divider
} from '@mui/material';

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

const settings = ['Profile', 'Logout'];

const MainLayout = () => {
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleUser = (event) => {
        if (!anchorElUser)
            setAnchorElUser(event.currentTarget);
        else
            setAnchorElUser(null);
    };

    return (
        <Paper elevation={1} sx={{ p: 1, height: '100%', borderRadius: '10px', display: 'block', backgroundColor: "white" }}>
            <CssBaseline />
            <AppBar
                position="sticky"
                elevation={2}
                open={open}
                sx={{ borderRadius: '10px', backgroundColor: alpha("#32850b", 0.04) }}>
                <Toolbar>
                    <IconButton
                        onClick={handleDrawer}
                        color="text.primary"
                    >
                        <Box component="img" sx={{ height: '80px', width: '120px' }} src={logo} />
                    </IconButton>

                    <Typography sx={{ flexGrow: 1 }} variant="h4" color="text.primary">Đồ án tổng hợp bla bla bla</Typography>
                    <Stack direction='row' spacing={3} alignItems='center' sx={{ flexGrow: 0.05, color: "text.primary" }}>
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

                        <IconButton onClick={handleUser}>
                            <Avatar src={cum} sx={{ width: 40, height: 40 }} />
                            <Typography padding={1} variant="h6" color="text.primary">Nguyễn Tuấn Kiệt</Typography>
                            <ExpandMoreIcon sx={{ color: "text.primary" }} />
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleUser}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Stack direction="row" padding={1}>
                <Paper elevation={2}
                    sx={{
                        flexGrow: 0, background: "#a3ffbd",
                        width: '400px', my: 5, mr: 5, ml: "-50px",
                        borderRadius: '12px'
                    }}>
                    <List>
                        {links.map((link, index) => (
                            <ListItem key={index} sx={{ p: 0, display: 'block' }}>
                                {link.path == '/login' ? <Divider margin={1} variant="middle" sx={{ mt: 5 }} /> : null}
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
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                        posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                    <Outlet />
                </Box>
            </Stack>
        </Paper>
    );
}

export default MainLayout;