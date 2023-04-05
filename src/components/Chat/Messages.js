import React, { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../context/ChatContext";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Dạ anh ơi", timestamp: new Date() },
    { id: 2, text: "Em muốn nhận tiền và hào quang", timestamp: new Date() },
    { id: 3, text: "Nhưng bảo vệ cứ cản không cho em đi lên", timestamp: new Date() },
  ]);

//   const { data } = useContext(ChatContext);

//   useEffect(() => {
//     // Your Firebase code here...
//   }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
