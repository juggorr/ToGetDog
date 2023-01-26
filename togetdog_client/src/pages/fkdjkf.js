import { useState } from "react";
import { Container, EmailError, EmailInput, EmailInputWrapper, EtcFindPw, EtcRegister, EtcWrapper, InputWrapper, LoginBtn, LogoImg, LogoTitle, LogoWrapper, PasswordError, PasswordInput, PasswordInputWrapper, SocialLoginLogo, SocialLoginWrapper, Wrapper } from "../../styles/02_5";

export default function Quiz01_05() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
    
    const isEmail = (email) => {
      const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
      return emailRegex.test(email)
    }

    if (!isEmail(email)) setEmailError("이메일 형식에 맞지 않습니다.")
    else setEmailError("")
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
    
    const isPassword = (password) => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/
      return passwordRegex.test(password)
    }

    if (!isPassword(event.target.value)) setPasswordError("영문, 숫자 조합 8자리 이상이어야 합니다.")
    else {
      setPasswordError("")
    }
  }

  return (
    <>
      <Container>
        <Wrapper>
          <LogoWrapper>
            <LogoImg src="togetdog-02.svg"></LogoImg>
            <LogoTitle>ToGetDog</LogoTitle>
          </LogoWrapper>
          <InputWrapper>
            <EmailInputWrapper>
              <EmailInput onChange={onChangeEmail} placeholder="이메일을 입력해주세요"></EmailInput>
            </EmailInputWrapper>
            <EmailError>{emailError}</EmailError>
            <PasswordInputWrapper>
              <PasswordInput onChange={onChangePassword} type="password" placeholder="비밀번호를 입력해주세요"></PasswordInput>
            </PasswordInputWrapper>
            <PasswordError>{passwordError}</PasswordError>
          </InputWrapper>
          <LoginBtn>로그인</LoginBtn>
          <SocialLoginWrapper>
            <SocialLoginLogo src="naver.png"></SocialLoginLogo>
            <SocialLoginLogo src="kakao.png"></SocialLoginLogo>
            <SocialLoginLogo src="google.jpg"></SocialLoginLogo>
          </SocialLoginWrapper>
          <EtcWrapper>
            <EtcRegister>회원 가입</EtcRegister>
            <EtcFindPw>비밀번호를 잊으셨나요?</EtcFindPw>
          </EtcWrapper>
        </Wrapper>
      </Container>
    </>
  )

}