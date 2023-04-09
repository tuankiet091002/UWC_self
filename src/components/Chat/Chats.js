import React, { useContext, useEffect, useState } from "react";
import { useChatContext } from "../../hooks/Chat/useChatContext";
import { useGetChats } from "../../hooks/Chat/useGetChats";
import { useChooseChat } from "../../hooks/Chat/useChooseChat";

import cum from '../../assets/cum.jpg';
import { Typography, Stack } from "@mui/material";

const Chats = () => {
    const activeChat = "1"; 
    const { getChats, isLoading, error } = useGetChats();
    const { chooseChat } = useChooseChat();
    const { chats } = useChatContext();

    useEffect(() => {
        getChats();
    }, []);
    const styles = {
        activeChat: {
          backgroundColor: "#f0f0f0",
        },
      };
    return (
        <div className="chats">
            {chats?.map((chat, index) => (
                <div
                    className={`userChat ${activeChat === chat._id ? "activeChat" : ""}`}
                    key={chat._id}
                    onClick={() => chooseChat(chat)}
                    style={
                        activeChat === chat._id
                        ? { ...styles.activeChat, borderBottom: "1px solid white" }
                        : { borderBottom: "1px solid white" }
                    }
                >
                    <img src={chat.groupAdmin.avatar ? chat.groupAdmin.avatar : cum} alt="" />
                    <Stack >
                        <Typography color="#cef3fe" fontSize={20}>{chat.name}</Typography>
                        <Typography color="text.secondary">{chat.latestMessage?.content}</Typography>
                    </Stack>
                </div>
            ))}
        </div>
    );
};

export default Chats;