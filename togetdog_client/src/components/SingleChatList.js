import { useNavigate } from 'react-router-dom';
import { ChatRedDot, SingleChatListWrapper } from '../styles/ChatEmotion';
import UserIcon from './UserIcon';

const SingleChatList = () => {
  const navigate = useNavigate();
  const chatUser = {
    chatId: 1,
    nickName: '크림맘',
    userId: 1,
    userAge: '20대',
    userGender: 'female',
    userHome: '역삼동',
    msg: '안녕하세요 뽀삐 보호자님!! 오늘 시간 어떠신가요?',
  };

  return (
    <>
      <SingleChatListWrapper onClick={() => navigate(`/chat/${chatUser.chatId}`)}>
        <div className='chat-profile-box'>
          <UserIcon text={chatUser.nickName} idx={chatUser.userId} />
          {/* 채팅 안읽은 상태 시에만 ChatRedDot 띄우기 */}
          <ChatRedDot />
        </div>
        <div className='chat-content-box'>
          <div className='nickname'>{chatUser.nickName}</div>
          <div className='user-info'>
            {chatUser.userAge} / {chatUser.userGender === 'male' ? '남' : '여'} / {chatUser.userHome}
          </div>
          <div className='chat-preview'>{chatUser.msg}</div>
        </div>
      </SingleChatListWrapper>
    </>
  );
};

export default SingleChatList;
