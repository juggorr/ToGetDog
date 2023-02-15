import React, { useEffect, useState } from 'react';
// import "./../styles/MainFooter.css";
import { Link, useNavigate } from 'react-router-dom';
// 사용할 아이콘 import
import './FontAwesome';
// FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// styled
import { FooterWrapper } from '../styles/MainFooterEmotion';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil';

const MainFooter = () => {
  const [activeNav, setActiveNav] = useState(3);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  // URL이 바뀔 때마다 해당 URL에 적합한 곳에 불이 들어오도록 작업
  useEffect(() => {
    console.log('하단 바 작업용 url');
    let currentURL = window.location.href.slice(10).split('/');

    const page = currentURL[1];
    const userId = currentURL[2];

    if (page === 'feed') {
      if (userId == user.userId) {
        setActiveNav(5);
      }
    } else if (page === 'chat') {
      setActiveNav(4);
    } else if (page === 'walk') {
      setActiveNav(2);
    } else if (page === 'map') {
      setActiveNav(1);
    }
  }, [window.location.href]);

  return (
    <>
      <FooterWrapper>
        <div
          className='icon-box'
          onClick={() => {
            navigate('/map');
            setActiveNav(1);
          }}
        >
          <FontAwesomeIcon icon='compass' className={activeNav === 1 ? 'footer-icon active' : 'footer-icon'} />
        </div>
        <div
          className='icon-box'
          onClick={() => {
            navigate('/walk');
            setActiveNav(2);
          }}
        >
          <FontAwesomeIcon icon='fa-calendar' className={activeNav === 2 ? 'footer-icon active' : 'footer-icon'} />
        </div>
        <div
          className='icon-box'
          onClick={() => {
            navigate('/');
            setActiveNav(3);
          }}
        >
          <FontAwesomeIcon icon='home' className={activeNav === 3 ? 'footer-icon active' : 'footer-icon'} />
        </div>
        <div
          className='icon-box'
          onClick={() => {
            navigate('/chat');
            setActiveNav(4);
          }}
        >
          <FontAwesomeIcon icon='comments' className={activeNav === 4 ? 'footer-icon active' : 'footer-icon'} />
        </div>
        <div
          className='icon-box'
          onClick={() => {
            console.log(user.userId);
            navigate(`/feed/${user.userId}`);
            // navigate된 후 새로고침 처리
            window.location.reload();
            setActiveNav(5);
          }}
        >
          <FontAwesomeIcon icon='user' className={activeNav === 5 ? 'footer-icon active' : 'footer-icon'} />
        </div>
      </FooterWrapper>
    </>
  );
};

export default MainFooter;
