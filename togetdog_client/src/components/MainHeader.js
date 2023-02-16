import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { userState } from '../recoil';

import './FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeaderWrapper, PositionDiv, SearchModal } from '../styles/MainHeaderEmotion';

const Modal = ({ setModalOpen }) => {
  const navigate = useNavigate();
  const inputText = useRef();

  const onChange = (e) => {
    inputText.current = e.target.value;
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate('/search', { state: { keyword: inputText.current } });
    }
  };

  return (
    <SearchModal>
      <div className='inside'>
        <div onClick={() => setModalOpen(false)} className='iconWrapper'>
          <FontAwesomeIcon icon='fa-arrow-left' />
        </div>
        <input
          type='search'
          className='searchInput'
          placeholder='검색어를 입력해주세요.'
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <div className='searchBtn' onClick={() => navigate('/search', { state: { keyword: inputText.current } })}>
          <FontAwesomeIcon icon='fa-magnifying-glass' />
        </div>
      </div>
      <div onClick={() => setModalOpen(false)} className='outside'></div>
    </SearchModal>
  );
};

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [modalOpen, setModalOpen] = useState(false);
  let dongName = '주소를 등록해주세요';

  if (user) {
    dongName = user.address.substring(user.address.lastIndexOf(' ') + 1);
  }

  return (
    <>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
      <HeaderWrapper>
        <div className='positionDiv'></div>
        <div className='head-icon-wrapper head-left'>
          <div className='dongName-box notoSans'>
            <FontAwesomeIcon className='header-icon' icon='fa-solid fa-house' />
            {dongName}
          </div>
        </div>
        <div className='head-icon-wrapper head-right'>
          <div className='icon-box' onClick={() => navigate('/new')}>
            <FontAwesomeIcon className='header-icon' icon='fa-solid fa-square-plus' />
          </div>
          <div className='icon-box' onClick={() => setModalOpen(true)}>
            <FontAwesomeIcon className='header-icon' icon='fa-solid fa-magnifying-glass' />
          </div>
          <div className='icon-box' onClick={() => navigate('/notifications')}>
            <FontAwesomeIcon className='header-icon' icon='fa-solid fa-bell' />
          </div>
        </div>
      </HeaderWrapper>
      <PositionDiv></PositionDiv>
    </>
  );
}

export default Navbar;
