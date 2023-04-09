import React, { useState } from "react";

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Input = ({ handleSend }) => {
    const [text, setText] = useState("");

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
                style={{ height: "2.8em", flex: 1, marginRight: 10, padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <div className="send">
                <Button disabled={text.length === 0} onClick={() => { setText(''); handleSend(text) }} sx={{
                    bgcolor: "#5d5b8d",
                    color: "#fff",
                }}>Send<SendIcon sx={{ fontSize: 16 }} /></Button>
            </div>
        </div>
    );
};

export default Input;