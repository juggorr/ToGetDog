import { useState } from "react";
import axios from "axios";

import { BACKEND_URL, LOCAL_SERVER } from '../config';


import { MainShortBtn, GreyColorShortBtn } from '../styles/BtnsEmotion';
import { SignupContainer, SignupWrapper, InputWrapper } from '../styles/SignupEmotion';

const passwordRegexp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,16}$/;


function PasswordEdit() {

  const [inputs, setInputs] = useState({
    passwordOld: '',
    password: '',
    passwordCheck: '',
  });

  const {
    passwordOld,
    password,
    passwordCheck,
  } = inputs;

  // 추후에 
  // 현재 접속한 유저 비밀번호
  // 받아서 해당작업 진행
  const oldPassword = 'aaaaaa!1';

  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(true);
  const [oldPasswordErrorMsg, setOldPasswordErrorMsg] = useState('본인 확인을 위해 기존 비밀번호를 입력해 주세요');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordCheckErrorMsg, setPasswordCheckErrorMsg] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target; // e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 기존 비밀번호 핸들러 메소드
  const handleOldPassword = (e) => {
    if (oldPassword === (e.target.value)) {
      setOldPasswordError(false);
      setOldPasswordErrorMsg('기존 비밀번호와 일치합니다')
    } else {
      setOldPasswordError(true);
      setOldPasswordErrorMsg('기존 비밀번호와 일치하지 않습니다')
    }
    onChange(e);
  }

  // 비밀번호 핸들러 메소드
  const handlePassword = (e) => {
    // 비밀번호 유효성 검사
    if (!passwordRegexp.test(e.target.value)) {
      setPasswordError(false);
      setPasswordErrorMsg('비밀번호는 영문, 숫자, 특수문자 포함 8~16자');
    } else {
      setPasswordError(true);
      setPasswordErrorMsg('사용 가능한 비밀번호입니다.');
    }
    onChange(e);
  };

  // 비밀번호 재확인 핸들러 메소드
  const handlePasswordCheck = (e) => {
    // 비밀번호 일치 여부 검사
    if (password === e.target.value && e.target.value !== '') {
      console.log('비밀번호 일치');
      setPasswordCheckError(true);
      setPasswordCheckErrorMsg('비밀번호가 일치합니다.');
    } else {
      console.log('비밀번호 불일치');
      setPasswordCheckError(false);
      setPasswordCheckErrorMsg('비밀번호가 일치하지 않습니다.');
    }

    onChange(e);
  };

  // 비밀번호 바뀌었는지 확인 메소드 추가해야함

  const checkOthers = () => {
    if (!oldPassword || !password || !passwordCheck) {
      setInputError(true);
      setInputErrorMsg('필수 값이 입력되지 않았습니다');
    }
    return;
  };

  return (
    <>
    <SignupContainer>
      <SignupWrapper>
          {/* 기존 비밀번호 wrapper */}
          <InputWrapper>
            <div className='input-title'>
              기존 비밀번호<span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='input-box general-input-box'>
                <input
                  name='passwordOld'
                  className='email-input'
                  type='password'
                  placeholder='기존 비밀번호를 입력해주세요.'
                  onChange={(e) => handleOldPassword(e)}
                />
              </div>
            </div>
            <div className={oldPasswordError ? 'error' : 'success'}>{oldPasswordErrorMsg}</div>
          </InputWrapper>
          {/* 비밀번호 wrapper */}
          <InputWrapper>
            <div className='input-title'>
              변경할 비밀번호<span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='input-box general-input-box'>
                <input
                  name='password'
                  className='email-input'
                  type='password'
                  placeholder='변경할 비밀번호를 입력해주세요.'
                  onChange={(e) => handlePassword(e)}
                />
              </div>
            </div>
            <div className={passwordError ? 'success' : 'error'}>{passwordErrorMsg}</div>
          </InputWrapper>
          {/* 비밀번호 확인 wrapper */}
          <InputWrapper>
            <div className='input-title'>
              변경할 비밀번호 확인<span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='input-box general-input-box'>
                <input
                  name='passwordCheck'
                  className='email-input'
                  type='password'
                  placeholder='변경할 비밀번호를 다시 한번 입력해 주세요.'
                  onChange={(e) => handlePasswordCheck(e)}
                />
              </div>
            </div>
            <div className={passwordCheckError ? 'success' : 'error'}>{passwordCheckErrorMsg}</div>
          </InputWrapper>
          <div className='signup-desc'>* 표시는 필수 입력 값입니다.</div>
          <div className={inputError ? null : 'input-error'}>{inputErrorMsg}</div>
          <div className='two-btns-wrapper'>
              <GreyColorShortBtn onClick={checkOthers}>돌아가기</GreyColorShortBtn>
              <MainShortBtn onClick={checkOthers}>변경하기</MainShortBtn>
          </div>
      </SignupWrapper>
    </SignupContainer>
    </>
  );
}

export default PasswordEdit;