import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import { Button } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import ChatForm from './ChatForm';
const Sidebar = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="container" style={{ display: "flex", flexDirection: "column", width: "23vw", borderRadius: "20px 0 20px 20px" }}>
            <div className="sidebar" style={{ backgroundColor: "#6b7c97", padding: "10px" }}>
                <Navbar />
                <Search />
                <Chats />
            </div>
            <div style={{ margin: "auto" }}>
                <ChatForm open={open} onClose={() => setOpen(false)}></ChatForm>
                <Button sx={{ backgroundColor: "#3b3a5a", width: "23vw" }} fullWidth variant="contained" onClick={() => setOpen(true)}
                ><PeopleIcon />Tạo nhóm</Button>
            </div>
        </div>
    );
};

export default Sidebar;