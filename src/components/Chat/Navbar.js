import React from 'react';

import { Typography, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

import ChatForm from './ChatForm';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className='navbar'>
            <Typography variant='h4' color="text.primary">UWC Chat</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}><PeopleIcon />Tạo nhóm</Button>
            <ChatForm open={open} onClose={() => setOpen(false)}></ChatForm>
        </div>
    );
};

export default Navbar;
