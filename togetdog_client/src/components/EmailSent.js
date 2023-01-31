import axios from 'axios';
import { useNavigate } from 'react-router';

import { BACKEND_URL } from '../config';

import { PinkBtn } from '../styles/BtnsEmotion';
import { EmailContainer, EmailWrapper, LogoWrapper } from '../styles/SignupEmotion';
import PinkEmail from './../assets/pink_email.svg';

const EmailSent = () => {
  const navigate = useNavigate();

  const email = new URLSearchParams(window.location.search).get('email');
  const authKey = new URLSearchParams(window.location.search).get('authKey');

  const handleVerification = async () => {
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
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
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
            togetherdog@dog.com 으로
            <br />
            이메일을 발송했어요!
            <br />
            <br />
            인증 후 <span className='pink-font bold'>인증 완료</span> 버튼을 눌러주세요
          </div>
          <PinkBtn onClick={handleVerification}>인증 완료</PinkBtn>
        </EmailWrapper>
      </EmailContainer>
    </>
  );
};

export default EmailSent;
