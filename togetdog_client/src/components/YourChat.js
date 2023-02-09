import { YourChatBox, YourChatBoxWrapper } from "../styles/ChatEmotion";

const YourChat = ({ text }) => {
  return (
    <>
      <YourChatBoxWrapper>
        <YourChatBox>{text}</YourChatBox>
        <div className="time-txt">2일전</div>
      </YourChatBoxWrapper>
    </>
  );
};

export default YourChat;
