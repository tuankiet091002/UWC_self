import React, { useState } from "react";

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Input = ({handleSend}) => {
    const [text, setText] = useState("");

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <Button disabled={text.length === 0} onClick={() => handleSend(text)}>Send<SendIcon sx={{fontSize: 16}}/></Button>
            </div>
        </div>
    );
};

export default Input;
