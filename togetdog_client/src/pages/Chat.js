import { useNavigate } from "react-router-dom";
import SingleChatList from "../components/SingleChatList";
import { ChatContainer } from "../styles/ChatEmotion";

const Chat = () => {
  const navigate = useNavigate();
  return (
    <>
      <ChatContainer>
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
        <SingleChatList />
      </ChatContainer>
    </>
  );
};

export default Chat;
