import { useRef, useState } from "react"

import { InputWrapper, LoginContainer, LoginWrapper, LogoWrapper, SocialLoginLogo } from "../styles/LoginEmotion"
import { PinkBtn } from "../styles/BtnsEmotion"
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
const Login = () => {

  // const [loginState, setLoginState] = useRecoilState(loginStatus);//리코일로 로그인 상태여부 확인
  // const [logininfo, setLoginInfo] = useRecoilState(loginInfo);//리코일로 유저정보 관리

  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    if (emailError) setEmailError("")
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
    if (passwordError) setPasswordError("")
  }

  const checkInput = () => {
   
    if (!email) {
      emailRef.current.focus()
      setEmailError("이메일 입력은 필수입니다")
      return
    }

    if (!password) {
      passwordRef.current.focus()
      setPasswordError("비밀번호 입력은 필수입니다")
      return
    }

    if (email && password) {
      console.log("로그인 시도 가능!")
    }

  }
  
  return (
    <>
    <LoginContainer>
      <LoginWrapper>
        <LogoWrapper>
          <img className="login-logo" src={process.env.PUBLIC_URL + `assets/pink_paw.png`} />
          <div className="logo-title">ToGetDog</div>
        </LogoWrapper>
        <InputWrapper>
          <div className="input-wrapper">
            <input
              className="email-input" 
              ref={emailRef}
              placeholder="이메일을 입력해주세요" 
              onChange={onChangeEmail}
            />
          </div>
          <div className="error-msg">{emailError}</div>
          <div className="input-wrapper">
            <input
              className="password-input"
              type="password" 
              ref={passwordRef}
              placeholder="비밀번호를 입력해주세요" 
              onChange={onChangePassword}
            />
          </div>
          <div className="error-msg">{passwordError}</div>
        </InputWrapper>
        <PinkBtn onClick={checkInput}>로그인</PinkBtn>
        <div className="social-login-wrapper">
          <SocialLoginLogo src={process.env.PUBLIC_URL + `assets/naver.png`}></SocialLoginLogo>
          <SocialLoginLogo src={process.env.PUBLIC_URL + `assets/kakao.png`}></SocialLoginLogo>
          <SocialLoginLogo src={process.env.PUBLIC_URL + `assets/google.jpg`}></SocialLoginLogo>
        </div>
        <div className="login-bottom-wrapper">
          <div className="login-bottom-text">회원가입</div>
          <div className="login-bottom-text">비밀번호 찾기</div>
        </div>
      </LoginWrapper>
    </LoginContainer>
    </>
  )
}

export default Login