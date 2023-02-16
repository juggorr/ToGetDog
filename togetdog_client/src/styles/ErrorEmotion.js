import styled from '@emotion/styled';

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .error {
    font-family: 'Orbitron', sans-serif;
    font-size: 25px;
    font-weight: 500;
  }

  .errorDesc {
    padding-top: 1rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    font-size: 15px;
    text-align: center;
  }
`;

export const ErrorImg = styled.img`
  width: 220px;
`;
