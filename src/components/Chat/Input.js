import React, { useState } from "react";

import { useChatContext } from "../../hooks/Chat/useChatContext"
import { useSendMessage } from '../../hooks/Chat/useSendMessage'

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Input = () => {
    const [text, setText] = useState("");

    const { currChat } = useChatContext()
    const { sendMessage } = useSendMessage()

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <Button disabled={text.length > 0} onClick={() => sendMessage(currChat, text)}>Send<SendIcon sx={{fontSize: 16}}/></Button>
            </div>
        </div>
    );
};

export default Input;
