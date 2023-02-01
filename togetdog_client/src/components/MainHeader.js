import React from 'react';
import { Link } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { userState } from '../recoil';

import './FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeaderWrapper } from '../styles/MainHeaderEmotion';

function Navbar() {
  const [user, setUser] = useRecoilState(userState);
  const dongName = user.address.substring(user.address.lastIndexOf(' ') + 1);

  return (
    <>
      <HeaderWrapper>
        <div className='head-icon-wrapper'>
          <div className='dongName-box notoSans'>
            <FontAwesomeIcon className='header-icon' icon='fa-solid fa-house' />
            {dongName}
          </div>
        </div>
        <div className='head-icon-wrapper'>
          <div className='icon-box'>
            <Link to='/new'>
              <FontAwesomeIcon className='header-icon' icon='fa-solid fa-square-plus' />
            </Link>
          </div>
          <div className='icon-box'>
            <Link to='/search'>
              <FontAwesomeIcon className='header-icon' icon='fa-solid fa-magnifying-glass' />
            </Link>
          </div>
          <div className='icon-box'>
            <Link to='/alarm'>
              <FontAwesomeIcon className='header-icon' icon='fa-solid fa-bell' />
            </Link>
          </div>
        </div>
      </HeaderWrapper>
    </>
  );
}

export default Navbar;
