import React, { useContext, useEffect, useState } from "react";
import { useChatContext } from "../../hooks/Chat/useChatContext";
import { useGetChats } from "../../hooks/Chat/useGetChats";
import { useChooseChat } from "../../hooks/Chat/useChooseChat";

import cum from '../../assets/cum.jpg';
import { Typography, Stack } from "@mui/material";

const Chats = () => {
    const { getChats, isLoading, error } = useGetChats();
    const { chooseChat } = useChooseChat();
    const { chats } = useChatContext();

    useEffect(() => {
        getChats();
    }, []);

    return (
        <div className="chats">
            {chats?.map((chat) => (
                <div
                    className="userChat"
                    key={chat._id}
                    onClick={() => chooseChat(chat)}
                >
                    <img src={chat.groupAdmin.avatar ? chat.groupAdmin.avatar : cum} alt="" />
                    <Stack sx={{}}>
                        <Typography color="text.primary" fontSize={25}>{chat.name}</Typography>
                        <Typography color="text.secondary">ligma ball</Typography>
                    </Stack>
                </div>
            ))}
        </div>
    );
};

export default Chats;
