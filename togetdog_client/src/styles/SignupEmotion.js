import styled from '@emotion/styled';

export const SignupContainer = styled.div`
  height: calc(100vh - 60px - 3rem);
  display: flex;
  // align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
`;

export const SignupWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .signup-title {
    padding-bottom: 3rem;
    font-size: 1.2rem;
  }

  .togetdog {
    font-weight: 700;
    color: #559968;
  }

  .btn-wrapper {
    padding-top: 1.5rem;
  }

  .two-btns-wrapper {
    padding-top: 2rem;
    justify-content: space-around;
  }

  .signup-desc {
    width: 270px;
    text-align: left;
    font-size: 0.7rem;
    color: red;
  }

  .input-error {
    color: red;
    font-size: 0.8rem;
  }

  .edit-bottom-wrapper {
    border-top: 0.125rem solid #e2e2e2;
    margin-top: 1rem;
    width: 90%;
  }

  .edit-bottom-text {
    color: #aaa;
    text-decoration: underline;
    font-size: 13px;
    float: right;
    margin-top: 0.25rem;
  }
`;

export const InputWrapper = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 15px;

  .horizontal-flex {
    display: flex;
  }

  .input-title {
    font-size: 15px;
    margin-bottom: 0.5rem;
  }

  .email-box {
    width: 70%;
  }

  .input-box {
    border-bottom: 2px solid #e2e2e2;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .number-input-box {
    width: 50%;
    border-bottom: 2px solid #e2e2e2;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .address-box {
    width: 75%;
    border-bottom: 2px solid #e2e2e2;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .email-input,
  .number-input {
    width: 100%;
    font-size: 13px;
    color: #000;
    border: none;
    background: none;
    outline: none;
    padding: 0.7rem 0.2rem 0.2rem;
  }

  .red-dot {
    color: red;
    margin-left: 3px;
    font-weight: 700;
  }

  .general-input-box {
    width: 270px;
  }

  .btn-list {
    margin-top: 0.5rem;
    width: 270px;
    justify-content: space-around;
  }

  .option-btn-on {
    background-color: #699bf7;
    color: #fff;
  }

  .year {
    font-size: 1rem;
  }

  .success {
    color: #0052ff;
    font-size: 0.8rem;
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }

  .boardHeader {
    text-align: center;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 2rem 0rem;
  }
`;

export const EmailContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgba(0, 0, 0, 0.55);
`;

export const EmailWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .email-desc {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: center;
  padding-bottom: 50px;

  .logo-title {
    font-size: 40px;
    font-weight
    color: #000;
  }

  .email-logo {
    width: 9rem;
    height: 9rem;
    margin: auto;
    margin-bottom: 2rem;
  }
`;
