import {
  ChatBtnWrapper,
  ChatInputWrapper,
  ChatMsgBoxWrapper,
  ChatMsgContainer,
  ChatUserContainer,
} from '../styles/ChatEmotion';
import MenuIcon from '../assets/menu_icon.png';
import { useEffect, useRef, useState } from 'react';
import UserIcon from '../components/UserIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyChat from '../components/MyChat';
import YourChat from '../components/YourChat';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom, userState } from '../recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import Loading from '../assets/loading.gif';
import { MenuModalWrapper } from '../styles/ModalEmotion';

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
  const [roomId, setRoomId] = useState();

  const [sessionId, setSessionId] = useState();
  const [stompClient, setStompClient] = useState();

  const outSection = useRef();
  const location = useLocation();
  let otherId = location.pathname.split('/').reverse()[0];

  const exitChat = () => {
    axios
      .put(`${BACKEND_URL}/chat`, null, {
        params: {
          roomId: roomId,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        console.log('채팅방 나가기 완료');
        navigate(`/chat`);
      })
      .catch((err) => {
        console.log(err);
        console.log('채팅방을 나가는 도중에 에러가 발생하였습니다.');
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAuth(null);
    navigate('/login');
  };

  const userAge = (birthyear) => {
    const currentYear = new Date().getFullYear();

    return Math.floor((currentYear - birthyear) / 10) * 10;
  };

  const userDongName = (userAddress) => {
    let dongName = userAddress.split(' ').reverse()[0];
    return dongName;
  };

  const onChangeMsg = (e) => {
    setMsgInput(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const gotoBottom = () => {
    let chatBox = document.getElementById('chatContent');
    chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
  };

  const sendMessage = () => {
    if (msgInput && stompClient.connected) {
      send();
      setMsgInput('');
      document.querySelector('.chat-input').value = '';
    }
  };
  const send = () => {
    const msg = {
      userId: user.userId,
      content: msgInput,
      sessionId: sessionId,
      roomId: roomId,
    };

    if (stompClient.connected) {
      // 보낼 메세지 json 객체 (roomid 넣으삼)
      const msg = {
        userId: user.userId,
        content: msgInput,
        sessionId: sessionId,
        roomId: roomId,
      };
      // 하단 /publish/messages/ 뒤에 서버로부터 받은 roomId 붙여주면 됨(5 대신에)
      stompClient.send('/publish/messages/' + roomId, JSON.stringify(msg), {});
    }
  };

  const connect = (rooms) => {
    const serverURL = 'https://i8a807.p.ssafy.io/ws/chat';
    let socket = new SockJS(serverURL);
    let newClient = Stomp.over(socket);
    setStompClient(newClient);
    newClient.connect(
      {},
      (frame) => {
        // 소켓 연결 성공
        console.log('소켓 연결 성공', frame);
        setLoading(false);
        gotoBottom();

        let len = socket._transport.url.length;
        let sess = socket._transport.url.substring(len - 8, len);

        setSessionId(sess);

        // 처음 접속시 서버로 해당 채팅방에 접속한 유저의 정보를 보냄
        // 정보 : sessionId , userId , roomId(방번호)
        // 성다연 todo : 하단 userId roomId 저장
        newClient.send(
          '/publish/messages/sessionNum',
          JSON.stringify({
            sessionId: sess,
            userId: user.userId,
            roomId: rooms,
          }),
          {},
        );

        // 서버의 메시지 전송 endpoint를 구독합니다. 이런형태를 pub sub 구조라고 합니다.

        // 하단 /subscribe/roomId/ 뒤에 서버로부터 받은 roomId 붙여주면 됨(5 대신에)
        newClient.subscribe('/subscribe/roomId/' + rooms, async (res) => {
          // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
          await setChats((chats) => [...chats, JSON.parse(res.body)]);
          gotoBottom();
        });
      },
      (error) => {
        // 소켓 연결 실패
        navigate('/500');
        console.log(error);
        stompClient.connected = false;
      },
    );
    // socket.onclose = () => {
    //   connect(roomId);
    // };
  };

  useEffect(() => {
    if (!auth || !localStorage.getItem('recoil-persist')) {
      navigate('/login');
      return;
    }

    axios
      .get(`${BACKEND_URL}/chat/chatting`, {
        params: {
          otherId: otherId,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        setChatTarget(resp.data.other);
        setChats(resp.data.chats);
        setRoomId(resp.data.other.roomId);
        // 소켓 연결 시도
        connect(resp.data.other.roomId);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          alert('토큰이 만료되어 자동 로그아웃되었습니다.');
          handleLogout();
        }
      });

    setTimeout(() => {
      gotoBottom();
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <img src={Loading} alt='loading...'></img>
      </div>
    );
  }

  return (
    <>
      <ChatMsgContainer>
        <img src={MenuIcon} className='chat-menu-icon' onClick={() => setMenuBtnClick(true)} alt='menu' />
        {menuBtnClick === true ? (
          <MenuModalWrapper
            ref={outSection}
            onClick={(e) => {
              if (outSection.current === e.target) {
                setMenuBtnClick(false);
              }
            }}
          >
            <div className='modal-body'>
              <div className='single-menu' onClick={exitChat}>
                {'채팅방 나가기'}
              </div>
            </div>
          </MenuModalWrapper>
        ) : null}
        <ChatUserContainer>
          <UserIcon text={chatTarget.nickName} idx={chatTarget.userId} />
          <div className='nickname'>{chatTarget.nickName}</div>
          <div className='user-info'>
            {userAge(chatTarget.userBirth)}대 / {chatTarget.gender === 'm' ? '남' : '여'} /{' '}
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
        <ChatMsgBoxWrapper id='chatContent'>
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
            <input
              className='chat-input'
              onChange={onChangeMsg}
              onKeyPress={onKeyPress}
              maxLength='100'
              placeholder='메시지를 입력하세요'
            />
            <div className='send-btn' onClick={sendMessage}>
              <FontAwesomeIcon icon='fa-solid fa-paper-plane' />
            </div>
          </div>
        </ChatInputWrapper>
      </ChatMsgContainer>
    </>
  );
};

export default ChatMsg;
