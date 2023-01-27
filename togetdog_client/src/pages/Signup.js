import { DoubleCheckBtn } from '../styles/BtnsEmotion';
import { SignupContainer, SignupWrapper, InputWrapper } from '../styles/SignupEmotion';

const Signup = () => {
  return (
    <>
      <SignupContainer>
        <SignupWrapper>
          <InputWrapper>
            <div className='input-title'>
              이메일<span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='input-box email-box'>
                <input className='email-input' placeholder='이메일을 입력해주세요.' />
              </div>
              <DoubleCheckBtn>중복 확인</DoubleCheckBtn>
            </div>
          </InputWrapper>
          <InputWrapper>
            <div className='input-title'>
              비밀번호<span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='input-box general-input-box'>
                <input className='email-input' type='password' placeholder='비밀번호를 입력해주세요.' />
              </div>
            </div>
          </InputWrapper>
          <InputWrapper>
            <div className='input-title'>
              비밀번호 확인<span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='input-box general-input-box'>
                <input className='email-input' type='password' placeholder='비밀번호를 다시 한번 입력해 주세요.' />
              </div>
            </div>
          </InputWrapper>
        </SignupWrapper>
      </SignupContainer>
    </>
  );
};

export default Signup;
