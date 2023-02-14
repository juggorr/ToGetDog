import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import SingleChatList from '../components/SingleChatList';
import { BACKEND_URL } from '../config';
import { authAtom, userState } from '../recoil';
import { ChatContainer } from '../styles/ChatEmotion';

const Chat = () => {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const [chatList, setChatList] = useState();
  const [isLoading, setLoading] = useState(true);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAuth(null);
    console.log('로그아웃이 정상적으로 처리되었습니다.');
    navigate('/login');
  };

  useEffect(() => {
    if (!auth || !localStorage.getItem('recoil-persist')) {
      navigate('/login');
      return;
    }

    axios
      .get(`${BACKEND_URL}/chat/list`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data.dm);
        setChatList(resp.data.dm);
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
      <ChatContainer>
        {chatList.length === 0 ? (
          <div className='no-chat'>존재하는 채팅 기록이 없습니다.</div>
        ) : (
          chatList.map((chat) => <SingleChatList chatData={chat} key={chat.userId} />)
        )}
      </ChatContainer>
    </>
  );
};

export default Chat;
