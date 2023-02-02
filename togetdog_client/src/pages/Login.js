import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { BACKEND_URL } from '../config';
import { authAtom, userState } from '../recoil';

import { InputWrapper, LoginContainer, LoginWrapper, LogoWrapper, SocialLoginLogo } from '../styles/LoginEmotion';
import { PinkBtn } from '../styles/BtnsEmotion';
import PinkPaw from './../assets/pink_paw.svg';
import naverLogo from '../assets/naver.png';
import googleLogo from '../assets/google.jpg';
import kakaoLogo from '../assets/kakao.png';

const Login = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  // 추후 주석 해제 예정 (개발용)
  useEffect(() => {
    if (auth !== null && auth === JSON.parse(localStorage.getItem('user')) && localStorage.getItem('recoil-persist'))
      navigate('/');
  }, []);

  const setAuth = useSetRecoilState(authAtom);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [user, setUser] = useRecoilState(userState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  const checkInput = () => {
    if (!email) {
      emailRef.current.focus();
      setEmailError('이메일 입력은 필수입니다');
      return;
    }

    if (!password) {
      passwordRef.current.focus();
      setPasswordError('비밀번호 입력은 필수입니다');
      return;
    }

    if (email && password) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    // e.preventDefault();
    await axios
      .post(
        `${BACKEND_URL}/user/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((resp) => {
        console.log('로그인 성공!');
        setUser(resp.data.user);
        // 로그인 토큰 설정 (추후에 주석 해제 예정)
        const userToken = resp.data['access-token'];
        localStorage.setItem('user', JSON.stringify(userToken));
        setAuth(userToken);
        setEmail('');
        setPassword('');
        navigate('/');
      })
      .catch((err) => {
        console.log('로그인 실패');
      });
  };

  return (
    <>
      <LoginContainer>
        <LoginWrapper>
          <LogoWrapper>
            <img className='login-logo' src={PinkPaw} />
            <div className='logo-title'>ToGetDog</div>
          </LogoWrapper>
          <InputWrapper>
            <div className='input-wrapper'>
              <input
                className='email-input'
                ref={emailRef}
                placeholder='이메일을 입력해주세요'
                onChange={onChangeEmail}
              />
            </div>
            <div className='error-msg'>{emailError}</div>
            <div className='input-wrapper'>
              <input
                className='password-input'
                type='password'
                ref={passwordRef}
                placeholder='비밀번호를 입력해주세요'
                onChange={onChangePassword}
              />
            </div>
            <div className='error-msg'>{passwordError}</div>
          </InputWrapper>
          <PinkBtn onClick={checkInput}>로그인</PinkBtn>
          <div className='social-login-wrapper'>
            <SocialLoginLogo src={naverLogo}></SocialLoginLogo>
            <SocialLoginLogo src={googleLogo}></SocialLoginLogo>
            <SocialLoginLogo src={kakaoLogo}></SocialLoginLogo>
          </div>
          <div className='login-bottom-wrapper'>
            <div onClick={() => navigate('/signup')} className='login-bottom-text'>
              회원가입
            </div>
            <div className='login-bottom-text'>비밀번호 찾기</div>
          </div>
        </LoginWrapper>
      </LoginContainer>
    </>
  );
};

export default Login;
