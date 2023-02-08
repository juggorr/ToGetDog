import { MyChatBox, MyChatBoxWrapper } from "../styles/ChatEmotion";

const MyChat = ({ text }) => {
  return (
    <>
      <MyChatBoxWrapper>
        <div className="time-txt">1일전</div>
        <MyChatBox>{text}</MyChatBox>
      </MyChatBoxWrapper>
    </>
  );
};

export default MyChat;
