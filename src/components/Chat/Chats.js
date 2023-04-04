import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      userInfo: {
        uid: "123",
        displayName: "Hào Quang Rực Rỡ",
        photoURL: "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/3/22/tran-thanh-1679470577131190955048-53-211-544-1149-crop-16794706034051970895643.jpg",
      },
      lastMessage: { text: "Ai muốn nhận tiền và hào quang thì cứ bước lên đây" },
      date: new Date(),
    },
    {
      id: 2,
      userInfo: {
        uid: "456",
        displayName: "Siêu hướng nội",
        photoURL: "https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.15752-9/335779150_629614469004756_4715221156031862380_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=uMej2lkZCVwAX_7rEKA&_nc_ht=scontent.fsgn13-3.fna&oh=03_AdQvKc8pr7cvsTKDGBYG35Sxj1pYhsuQ-pWbt5HP4H7W7g&oe=645397E8",
      },
      lastMessage: { text: ".........." },
      date: new Date(),
    },
    {
      id: 2,
      userInfo: {
        uid: "789",
        displayName: "Nhóm 5 anh em",
        photoURL: "https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.15752-9/338888512_246904177795596_5695461202739492357_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=E6Agb_WpfmcAX_jUlSE&_nc_ht=scontent.fsgn13-3.fna&oh=03_AdS0fhqBhJioiBvOcEtEXqGIreXs4MNZmbEkh4kOg3OMkg&oe=6453C169",
      },
      lastMessage: { text: "Quẩy đê !" },
      date: new Date(),
    },
  ]);

//   const { dispatch } = useContext(ChatContext);

  const handleSelect = (u) => {
    // dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {chats?.sort((a, b) => b.date - a.date).map((chat) => (
        <div
          className="userChat"
          key={chat.id}
          onClick={() => handleSelect(chat.userInfo)}
        >
          <img src={chat.userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat.userInfo.displayName}</span>
            <p>{chat.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
