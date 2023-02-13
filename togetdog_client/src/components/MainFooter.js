import React, { useState } from 'react';
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
            navigate('/recommend');
            setActiveNav(4);
          }}
        >
          <FontAwesomeIcon icon='dog' className={activeNav === 4 ? 'footer-icon active' : 'footer-icon'} />
        </div>
        <div
          className='icon-box'
          onClick={() => {
            navigate(`/feed/${user.userId}`);
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
