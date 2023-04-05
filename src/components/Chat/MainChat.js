import React, { useEffect } from "react";

import { useAuthContext } from "../../hooks/Auth/useAuthContext"
import { useChatContext } from "../../hooks/Chat/useChatContext"
import { useChooseChat } from "../../hooks/Chat/useChooseChat";
import { useSendMessage } from "../../hooks/Chat/useSendMessage";

import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Messages from "./Messages";
import Input from "./Input";

import { Typography, Stack } from "@mui/material";

import io from "socket.io-client";

var socket;
const setIo = (function () {
    const _io = io();
    return () => _io;
})()


const MainChat = () => {
    const { user } = useAuthContext()
    const { currChat } = useChatContext()
    const { chooseChat } = useChooseChat();
    const { sendMessage } = useChooseChat();

    useEffect(() => {
        console.log('ets')
        socket = setIo()
        socket.emit("setup", user);
        socket.on('connected', () => {
            console.log('socket connected')
        })
    }, []);

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
            <div className="chatInfo">
                <Stack>
                    <Typography variant="h5">{currChat?.name}</Typography>
                    <Typography variant="subtitle1">{currChat?.admin?.available ? "Online" : "Offline"}</Typography>
                </Stack>

                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input handleSend={handleSend} />
        </div>
    );
};

export default MainChat;
