import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

import { IconButton, Badge, Menu, MenuItem, Typography, Stack, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useAuthContext } from '../../hooks/Auth/useAuthContext'
import { useNotificationContext } from '../../hooks/Notification/useNotificationContext'
import { useGetNotifications } from '../../hooks/Notification/useGetNotifications'
import { useReadAllNotifications } from '../../hooks/Notification/useReadAllNotifications'

const Notification = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { notifications } = useNotificationContext()
    const { getNotifications } = useGetNotifications()
    const { readAllNotifications } = useReadAllNotifications()

    const [anchorElNoti, setAnchorElNoti] = React.useState(false);

    const handleNoti = (event) => {
        if (!anchorElNoti) {
            readAllNotifications(user._id)
            setAnchorElNoti(event.currentTarget);
        }
        else
            setAnchorElNoti(null);
    };

    useEffect(() => {
        if (user) {
            getNotifications(user._id)
        }
    }, [])

    return (<>
        <IconButton
            onClick={handleNoti}
            size="large"
            color="inherit"
        >
            <Badge badgeContent={notifications.filter(x => !x.read).length} color="error">
                <NotificationsIcon />
            </Badge>
        </IconButton>
        <Menu
            anchorEl={anchorElNoti}
            open={Boolean(anchorElNoti)}
            onClose={handleNoti}
            keepMounted={false}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            PaperProps={{
                style: {
                    maxHeight: '400px'
                },
            }}
        >
            {notifications.map((noti) => (<>
                <MenuItem key={noti._id} onClick={() => navigate(noti.path)}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Stack onClick={() => navigate(noti.path)}>
                            <Box component="div" whiteSpace="normal" sx={{ width: '300px', overflowWrap: 'break-word' }}>
                                <Typography
                                    textAlign="left"
                                    variant="body2">
                                    {noti.content}
                                </Typography>
                            </Box>
                            <Typography textAlign="left" variant="subtitle2" color='primary'>{moment(noti.createdAt).fromNow()}</Typography>
                        </Stack>
                        <IconButton
                            size='small'
                            color={noti.read ? 'primary' : ''}>
                            {noti.read ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                        </IconButton>
                    </Stack>

                </MenuItem>
            </>))}
        </Menu>
    </>)
}

export default Notification