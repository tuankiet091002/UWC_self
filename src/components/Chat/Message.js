import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { user: currentUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Static data instead of fetching from a server
  
  // const senderPhotoUrl =
  //   message.senderId === currentUser.uid
  //     ? currentUser.avatar
  //     : "https://scontent.fsgn13-4.fna.fbcdn.net/v/t1.15752-9/334868501_1358540914988750_8136921952568439634_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Dpz6sbnXiFgAX8LPeY1&_nc_ht=scontent.fsgn13-4.fna&oh=03_AdQxYDLx3_UHHKJsaNf60YaWmA6R4bDlPLG9GJ0PyKEfSw&oe=6453D2E8";
  const senderPhotoUrl = "https://scontent.fsgn13-4.fna.fbcdn.net/v/t1.15752-9/334868501_1358540914988750_8136921952568439634_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=Dpz6sbnXiFgAX8LPeY1&_nc_ht=scontent.fsgn13-4.fna&oh=03_AdQxYDLx3_UHHKJsaNf60YaWmA6R4bDlPLG9GJ0PyKEfSw&oe=6453D2E8";
  const timestamp = "just now";

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img src={senderPhotoUrl} alt="" />
        <span>{timestamp}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
