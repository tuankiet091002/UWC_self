import React, { useEffect, useState } from "react";

import { useAuthContext } from "../../hooks/Auth/useAuthContext"
import { useChatContext } from "../../hooks/Chat/useChatContext"
import { useChooseChat } from "../../hooks/Chat/useChooseChat";
import { useSendMessage } from "../../hooks/Chat/useSendMessage";
import { useDeleteChat } from "../../hooks/Chat/useDeleteChat";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ChatEditorForm from './ChatEditorForm';
import Messages from "./Messages";
import Input from "./Input";

import { Typography, Stack, Button, ButtonGroup, Paper } from "@mui/material";

import io from "socket.io-client";
let socket
const MainChat = () => {
    const [open, setOpen] = useState(false)
    const { user } = useAuthContext()
    const { currChat } = useChatContext()
    const { chooseChat } = useChooseChat();
    const { sendMessage } = useSendMessage();
    const { deleteChat } = useDeleteChat();


    useEffect(() => {
        socket = io('http://localhost:5000')
        socket.emit("setup", user);
        socket.on('connected', () => {
            console.log('socket connected')
        })
    }, [user]);

    useEffect(() => {
        socket?.on("message received", () => {
            chooseChat(currChat);
        })
    })

    const handleSend = (content) => {
        sendMessage(currChat, content)
        socket.emit("new message", currChat);
    }

    return (
        <div className="chat">
            <Paper elevation={3} sx={{ alignItems:'center', padding: '10px', height: '80px', display: 'flex', justifyContent: "space-between" }}>
                <Stack>
                    <Typography variant="h5">{currChat?.name}</Typography>
                    <Typography variant="subtitle1">{currChat?.admin?.available ? "Online" : "Offline"}</Typography>
                </Stack>
                {currChat && <>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => setOpen(true)}><BorderColorIcon /></Button>
                        <Button color='error' onClick={() => deleteChat(currChat._id)}><DeleteOutlineIcon /></Button>
                    </ButtonGroup>
                    <ChatEditorForm open={open} onClose={() => setOpen(false)} currChat={currChat}></ChatEditorForm>
                </>}
            </Paper>
            <Messages />
            <Input handleSend={handleSend} />
        </div>
    );
};

export default MainChat;