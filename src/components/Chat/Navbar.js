import React from 'react';

import { Typography, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

// import ChatForm from './ChatForm';

const Navbar = () => {
    // const [open, setOpen] = React.useState(false);

    return (
        <div className='navbar'>
            <Typography variant='h5' color="#ffffff">Chat box</Typography>
            {/* <ChatForm open={open} onClose={() => setOpen(false)}></ChatForm>
            <Button variant="contained" onClick={() => setOpen(true)}><PeopleIcon />Tạo nhóm</Button> */}
        </div>
    );
};

export default Navbar;