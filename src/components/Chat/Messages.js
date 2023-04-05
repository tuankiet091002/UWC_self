import React from "react";
import { useChatContext } from "../../hooks/Chat/useChatContext";

import Message from "./Message";


const Messages = () => {
    const { messages } = useChatContext();

    return (
        <div className="messages">
            {messages?.map((m) => (
                <Message message={m} key={m._id} />
            ))}
        </div>
    );
};

export default Messages;
