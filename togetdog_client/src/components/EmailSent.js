import { EmailContainer, EmailWrapper, LogoWrapper } from '../styles/SignupEmotion';
import PinkEmail from './../assets/pink_email.svg';

const EmailSent = (props) => {
  return (
    <>
      <EmailContainer>
        <EmailWrapper>
          <LogoWrapper>
            <img className='email-logo' src={PinkEmail} />
            <div className='logo-title'>ToGetDog</div>
          </LogoWrapper>
          <div className='text-align-center email-desc'>
            {props.email} 로
            <br />
            이메일이 발송되었습니다.
            <br />
            <br />
            인증을 통해 회원가입을 완료해주세요.
          </div>
        </EmailWrapper>
      </EmailContainer>
    </>
  );
};

export default EmailSent;
