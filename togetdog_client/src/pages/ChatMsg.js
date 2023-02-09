import {
  ChatBtnWrapper,
  ChatInputWrapper,
  ChatMsgBoxWrapper,
  ChatMsgContainer,
  ChatUserContainer,
} from '../styles/ChatEmotion';
import MenuIcon from '../assets/menu_icon.png';
import { useEffect, useState } from 'react';
import UserIcon from '../components/UserIcon';
import { MainColorLongBtn } from '../styles/BtnsEmotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyChat from '../components/MyChat';
import YourChat from '../components/YourChat';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom, userState } from '../recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const ChatMsg = () => {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const [chatTarget, setChatTarget] = useState();
  const [msgInput, setMsgInput] = useState();
  const [chats, setChats] = useState();
  const [menuBtnClick, setMenuBtnClick] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAuth(null);
    console.log('로그아웃이 정상적으로 처리되었습니다.');
    navigate('/login');
  };

  const userAge = (birthyear) => {
    const currentYear = new Date().getFullYear();

    return Math.floor((currentYear - birthyear + 1) / 10) * 10;
  };

  const userDongName = (userAddress) => {
    let dongName = userAddress.split(' ').reverse()[0];
    return dongName;
  };

  const onChangeMsg = (e) => {
    setMsgInput(e.target.value);
  };

  useEffect(() => {
    if (!auth || !localStorage.getItem('recoil-persist')) {
      navigate('/login');
      return;
    }

    axios
      .get(`${BACKEND_URL}/chat/chatting`, {
        params: {
          otherId: 2,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data.chats);
        setChatTarget(resp.data.other);
        setChats(resp.data.chats);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          alert('토큰이 만료되어 자동 로그아웃되었습니다.');
          handleLogout();
        }
      });
  }, []);

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <>
      <ChatMsgContainer>
        <img src={MenuIcon} className='chat-menu-icon' onClick={() => setMenuBtnClick(true)} alt='menu' />
        <ChatUserContainer>
          <UserIcon text={chatTarget.nickName} idx={chatTarget.userId} />
          <div className='nickname'>{chatTarget.nickName}</div>
          <div className='user-info'>
            {userAge(chatTarget.userBirth)}대 / {chatTarget.userGender === 'm' ? '남' : '여'} /{' '}
            {userDongName(chatTarget.address)}
          </div>
        </ChatUserContainer>
        <ChatBtnWrapper>
          <button
            className='first-btn chat-btn'
            onClick={() =>
              navigate('/createAppointment', {
                state: {
                  partnerId: chatTarget.userId,
                },
              })
            }
          >
            산책 약속 잡기
          </button>
          <button className='second-btn chat-btn' onClick={() => navigate('/walk')}>
            약속 확인하기
          </button>
        </ChatBtnWrapper>
        <ChatMsgBoxWrapper>
          {chats.map((chat) => {
            if (chat.userId === user.userId) {
              return <MyChat time={chat.date} text={chat.content} />;
            } else {
              return <YourChat time={chat.date} text={chat.content} />;
            }
          })}
        </ChatMsgBoxWrapper>
        <ChatInputWrapper>
          <div className='chat-input-box'>
            <input className='chat-input' onChange={onChangeMsg} maxLength='5' placeholder='메시지를 입력하세요' />
            <div className='send-btn'>
              <FontAwesomeIcon icon='fa-solid fa-paper-plane' />
            </div>
          </div>
        </ChatInputWrapper>
      </ChatMsgContainer>
    </>
  );
};

export default ChatMsg;
