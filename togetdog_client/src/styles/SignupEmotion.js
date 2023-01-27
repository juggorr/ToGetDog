import styled from '@emotion/styled';

export const SignupContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e2e2;
`;

export const SignupWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  }

  .email-box {
    width: 200px;
  }

  .input-box {
    border-bottom: 2px solid #e2e2e2;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .email-input {
    width: 100%;
    font-size: 13px;
    color: #000;
    border: none;
    background: none;
    outline: none;
    padding: 10px 2px 5px;
  }

  .red-dot {
    color: red;
    margin-left: 3px;
    font-weight: 700;
  }

  .general-input-box {
    width: 270px;
  }
`;
