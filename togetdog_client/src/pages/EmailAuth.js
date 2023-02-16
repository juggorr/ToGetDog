import axios from 'axios';
import { useNavigate } from 'react-router';

import { BACKEND_URL } from '../config';

import { EmailBtn, MainColorLongBtn, PinkBtn } from '../styles/BtnsEmotion';

import { EmailContainer, EmailWrapper, LogoWrapper } from '../styles/SignupEmotion';

import ToGetDog from '../assets/togetdog.png';

const EmailAuth = () => {
  const navigate = useNavigate();

  let url = window.location.search;
  url = url.replace(/&amp;/gi, '&');
  let email = new URLSearchParams(url).get('email');
  const authKey = new URLSearchParams(url).get('authKey');

  const handleVerification = async () => {
    console.log(email);
    console.log(authKey);
    await axios
      .post(`${BACKEND_URL}/user/auth`, {
        email: email,
        authKey: authKey,
      })
      .then((resp) => {
        console.log('이메일 인증 성공!');
        alert('이메일 인증 완료! 로그인 페이지로 이동합니다.');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        alert('이메일 인증을 완료해주세요.');
        console.log('이메일 인증 실패');
      });
  };

  return (
    <>
      <EmailContainer>
        <EmailWrapper>
          <LogoWrapper>
            <img src={ToGetDog} className='logo-img' alt='MainLogo' />
          </LogoWrapper>
          <div className='text-align-center email-desc'>
            이메일 인증을 완료하셨다면
            <br />
            <span className='green-font bold'>인증 완료</span> 버튼을 눌러주세요 !!
          </div>
          <EmailBtn onClick={handleVerification}>인증 완료</EmailBtn>
        </EmailWrapper>
      </EmailContainer>
    </>
  );
};

export default EmailAuth;
