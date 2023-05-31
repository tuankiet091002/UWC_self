import React, { useContext, useEffect, useState } from "react";
import { useChatContext } from "../../hooks/Chat/useChatContext";
import { useGetChats } from "../../hooks/Chat/useGetChats";
import { useChooseChat } from "../../hooks/Chat/useChooseChat";

import cum from '../../assets/logo.jpg';
import { Typography, Stack, Box } from "@mui/material";

const Chats = () => {
    const { getChats } = useGetChats();
    const { chooseChat } = useChooseChat();
    const { chats, currChat } = useChatContext();

    useEffect(() => {
        getChats();
    }, []);
    const styles = {
        activeChat: {
            backgroundColor: "#red",
        },
    };
    return (
        <Box sx={{ overflow: 'auto', height: '50vh' }}>
            {chats?.map((chat, index) => (
                <div
                    className={`userChat ${currChat?._id === chat._id ? "activeChat" : ""}`}
                    key={chat._id}
                    onClick={() => chooseChat(chat)}
                    style={
                        currChat?._id === chat._id
                            ? { ...styles.activeChat, borderBottom: "1px solid white" }
                            : { borderBottom: "1px solid white" }
                    }
                >
                    <img src={chat.groupAdmin.avatar ? chat.groupAdmin.avatar : cum} alt="" />
                    <Stack >
                        <Typography fontSize={20}>{chat.name}</Typography>
                        <Typography variant="subtitle2" color='text.secondary'>{chat.latestMessage?.content}</Typography>
                    </Stack>
                </div>
            ))}
        </Box>
    );
};

export default Chats;