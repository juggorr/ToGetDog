import styled from "@emotion/styled";

export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgba(0, 0, 0, 0.55);
`;

export const LoginWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .social-login-wrapper {
    display: flex;
    justify-content: center;
    width: 260px;
    padding: 60px 0;
    border-bottom: 2px solid #e2e2e2;
  }

  .login-bottom-wrapper {
    width: 260px;
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
  }

  .login-bottom-wrapper .login-bottom-text {
    color: #aaa;
    text-decoration: underline;
    font-size: 13px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: center;
  padding-bottom: 50px;

  .logo-img {
    width: 19rem;
  }
`;

export const InputWrapper = styled.div`
  width: 260px;

  .input-wrapper {
    border-bottom: 2px solid #e2e2e2;
    margin-bottom: 5px;
  }

  .email-input,
  .password-input {
    width: 80%;
    font-size: 16px;
    color: #000;
    border: none;
    background: none;
    outline: none;
    padding: 10px 5px;
  }

  .error-msg {
    padding-bottom: 10px;
    color: #ff1b6d;
    font-size: 13px;
  }
`;

export const SocialLoginLogo = styled.img`
  width: 50px;
  border-radius: 50%;
  margin: 0 15px;
  cursor: pointer;
`;
