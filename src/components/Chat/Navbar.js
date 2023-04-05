import React from 'react';

import { Typography, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const staticUser = {
    displayName: 'Hào Quang Rực Rỡ',
    photoURL: 'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/3/22/tran-thanh-1679470577131190955048-53-211-544-1149-crop-16794706034051970895643.jpg'
};

const Navbar = () => {
    return (
        <div className='navbar'>
            <Typography variant='h4' color="text.primary">UWC Chat</Typography>
            <Button variant="contained"><PeopleIcon/>Tạo nhóm</Button>
        </div>
    );
};

export default Navbar;
