import React from 'react'
import Sidebar from '../components/Chat/Sidebar.js'
import MainChat from '../components/Chat/MainChat.js'
import "./chat.scss";
function Chat() {
    return (
        <div className="container">
            <Sidebar />
            <MainChat />
        </div>

    )
}

export default Chat;