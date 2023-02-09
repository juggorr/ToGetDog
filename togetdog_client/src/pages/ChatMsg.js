import {
  ChatBtnWrapper,
  ChatInputWrapper,
  ChatMsgBoxWrapper,
  ChatMsgContainer,
  ChatUserContainer,
} from "../styles/ChatEmotion";
import MenuIcon from "../assets/menu_icon.png";
import { useState } from "react";
import UserIcon from "../components/UserIcon";
import { MainColorLongBtn } from "../styles/BtnsEmotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyChat from "../components/MyChat";
import YourChat from "../components/YourChat";

const ChatMsg = () => {
  const [menuBtnClick, setMenuBtnClick] = useState(false);

  const chatUser = {
    chatId: 1,
    nickName: "크림맘",
    userId: 1,
    userAge: "20대",
    userGender: "female",
    userHome: "역삼동",
  };

  const yourTxt = "안녕하세요 뽀삐 보호자님";
  const myTxt = "크림이 보호자님 안녕하세요 :)";

  return (
    <>
      <ChatMsgContainer>
        <img
          src={MenuIcon}
          className="chat-menu-icon"
          onClick={() => setMenuBtnClick(true)}
          alt="menu"
        />
        <ChatUserContainer>
          <UserIcon text={chatUser.nickName} idx={chatUser.userId} />
          <div className="nickname">{chatUser.nickName}</div>
          <div className="user-info">
            {chatUser.userAge} / {chatUser.userGender === "male" ? "남" : "여"}{" "}
            / {chatUser.userHome}
          </div>
        </ChatUserContainer>
        <ChatBtnWrapper>
          <button className="first-btn chat-btn">산책 약속 잡기</button>
          <button className="second-btn chat-btn">약속 확인하기</button>
        </ChatBtnWrapper>
        <ChatMsgBoxWrapper>
          <YourChat text={yourTxt} />
          <MyChat text={myTxt} />
          <MyChat text={"오랜만이네용!!"} />
        </ChatMsgBoxWrapper>
        <ChatInputWrapper>
          <div className="chat-input-box">
            <input className="chat-input" placeholder="메시지를 입력하세요" />
            <div className="send-btn">
              <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
            </div>
          </div>
        </ChatInputWrapper>
      </ChatMsgContainer>
    </>
  );
};

export default ChatMsg;
