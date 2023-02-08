import { useState } from 'react';


import { BACKEND_URL } from '../config';
import { InputWrapper, LoginContainer, LoginWrapper, LogoWrapper } from '../styles/LoginEmotion';
import { BlackLongBtn } from '../styles/BtnsEmotion';
import ToGetDog from '../assets/togetdog.png';

const emailRegexp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;


function PasswordSearch() {
  // const [email, setEmail] = useState('');
  // const [emailCheck, setEmailCheck] = useState(false);


  // const [emailStatus]
  
  // const onChange = (e) => {
  //   setEmail(e.target.value);
  // }

  // handleEmailCheck = async (e) => {
  //   if (!emailRegexp.t)
  // }

  
  return(
    <LoginContainer>
      <LoginWrapper>
        <LogoWrapper>
          <img src={ToGetDog} alt="togetdog" className='logo-img' />
        </LogoWrapper>
        <InputWrapper>
          <div className='input-wrapper'>
            <input
              className='search-input'
              placeholder='가입 시 입력한 이메일을 입력해 주세요'
            />
          </div>
        </InputWrapper>
      </LoginWrapper>
    </LoginContainer>
  )
}

export default PasswordSearch;