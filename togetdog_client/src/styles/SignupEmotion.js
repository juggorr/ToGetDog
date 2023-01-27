import styled from "@emotion/styled";

export const SignupContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

  .signup-desc {
    width: 270px;
    text-align: left;
    font-size: 0.7rem;
    color: red;
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
    width: 60%;
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
`;
