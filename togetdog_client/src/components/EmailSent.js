import { EmailContainer, EmailWrapper, LogoWrapper } from '../styles/SignupEmotion';
import ToGetDog from '../assets/togetdog.png';

const EmailSent = (props) => {
  return (
    <>
      <EmailContainer>
        <EmailWrapper>
          <LogoWrapper>
            <img src={ToGetDog} className='logo-img' alt='MainLogo' />
          </LogoWrapper>
          <div className='text-align-center email-desc'>
            {props.email} 로
            <br />
            이메일이 발송되었습니다.
            <br />
            <br />
            24시간 이내로 인증하신 후
            <br />
            회원가입을 완료해주세요.
          </div>
        </EmailWrapper>
      </EmailContainer>
    </>
  );
};

export default EmailSent;
