import React from "react";
import Search from "./Search"
import Chats from "./Chats"
import { Button, Typography, Divider } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import ChatForm from './ChatForm';
const Sidebar = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="container" style={{ display: "flex", flexDirection: "column", width: "23vw", borderRadius: "20px 0 20px 20px" }}>
            <div className="sidebar" style={{ backgroundColor: "#f0f2f5", padding: "10px" }}>
                <Typography variant='h4' align='center' sx={{pb: 1}}>Chat box</Typography>
                <Search />
                <Divider/>
                <Chats />
            </div>
            <div style={{ margin: "auto" }}>
                <ChatForm open={open} onClose={() => setOpen(false)}></ChatForm>
                <Button sx={{ width: "23vw" }} variant="contained" onClick={() => setOpen(true)}
                ><PeopleIcon />Tạo nhóm</Button>
            </div>
        </div>
    );
};

export default Sidebar;