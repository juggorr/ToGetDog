import axios from 'axios';
import { useNavigate } from 'react-router';

import { BACKEND_URL } from '../config';

import { PinkBtn } from '../styles/BtnsEmotion';
import { EmailContainer, EmailWrapper, LogoWrapper } from '../styles/SignupEmotion';
import PinkEmail from './../assets/pink_email.svg';

const EmailAuth = () => {
  const navigate = useNavigate();

  const email = new URLSearchParams(window.location.search).get('email');
  const authKey = new URLSearchParams(window.location.search).get('authKey');

  const handleVerification = async () => {
    console.log(email);
    console.log(authKey);
    await axios
      .post(
        `${BACKEND_URL}/user/auth`,
        {
          email: email,
          authKey: authKey,
        },
        // { headers: { "Content-Type": "application/json" } },
      )
      .then((resp) => {
        console.log('이메일 인증 성공!');
        window.localStorage.removeItem('signupStatus');
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
            <img className='email-logo' src={PinkEmail} />
            <div className='logo-title'>ToGetDog</div>
          </LogoWrapper>
          <div className='text-align-center email-desc'>
            이메일 인증을 완료하셨다면
            <br />
            <span className='pink-font bold'>인증 완료</span> 버튼을 눌러주세요 !!
          </div>
          <PinkBtn onClick={handleVerification}>인증 완료</PinkBtn>
        </EmailWrapper>
      </EmailContainer>
    </>
  );
};

export default EmailAuth;
