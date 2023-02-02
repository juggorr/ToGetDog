import styled from "@emotion/styled";

export const CreateBoardWrapper = styled.div`
  .boardHeader {
    text-align: center;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 2rem 0rem;
  }

  .btnWrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 4rem;
    padding: 0rem 3rem;
  }
`;

export const BoardContentWrapper = styled.div`
  margin: 0rem 2rem;

  .queryStr {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 0.8rem;
    color: #717171;
    white-space: pre-wrap;
  }

  .dogImageWrapper {
    display: flex;
    direction: row;
  }
`;

export const DogImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0rem 0.3rem;

  .dogProfileCircle {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 70%;
    overflow: hidden;
    margin: 0.3rem 0rem;
  }

  .disabled {
    filter: brightness(50%);
  }

  .dogProfileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
