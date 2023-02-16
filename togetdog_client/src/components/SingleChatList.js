import { useNavigate } from "react-router-dom";
import { ChatRedDot, SingleChatListWrapper } from "../styles/ChatEmotion";
import UserIcon from "./UserIcon";

const SingleChatList = ({ chatData }) => {
  const navigate = useNavigate();

  const userAge = (birthyear) => {
    const currentYear = new Date().getFullYear();

    return Math.floor((currentYear - birthyear + 1) / 10) * 10;
  };

  const userDongName = (userAddress) => {
    let dongName = userAddress.split(" ").reverse()[0];
    return dongName;
  };

  return (
    <>
      <SingleChatListWrapper
        onClick={() => {
          navigate(`/chat/${chatData.userId}`);
        }}>
        <div className="chat-profile-box">
          <UserIcon
            text={chatData.nickName}
            idx={chatData.userId}
            txt={"chat"}
          />
          {/* 채팅 안읽은 상태 시에만 ChatRedDot 띄우기 */}
          {chatData.newChat > 0 ? <ChatRedDot /> : null}
        </div>
        <div className="chat-content-box">
          <div className="nickname">{chatData.nickName}</div>
          <div className="user-info">
            {userAge(chatData.userBirth)}대 /{" "}
            {chatData.gender === "m" ? "남" : "여"} /{" "}
            {userDongName(chatData.address)}
          </div>
          <div className="chat-preview">{chatData.lastChatContent}</div>
        </div>
      </SingleChatListWrapper>
    </>
  );
};

export default SingleChatList;
