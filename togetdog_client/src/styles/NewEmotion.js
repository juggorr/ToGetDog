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
    margin-top: 2rem;
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

  .warningStr {
    maring: 0;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 0.5rem;
    color: #f24e1e;
    white-space: pre-wrap;
  }

  .dogImageWrapper {
    display: flex;
    direction: row;
  }

  .textInputWrapper {
    display: flex;
    justify-content: center;
    padding: 0.2rem;
  }

  .textInput {
    border: 1px solid #717171;
    border-radius: 0.5rem;
    width: 16rem;
    height: 10rem;
    margin: 0.2rem;
    padding: 1rem;
    font-family: "Noto Sans KR", sans-serif;
  }

  .photo-desc {
    padding-bottom: 1rem;
  }

  .edit-info {
    font-size: 0.7rem;
    color: #777;
  }

  .red-dot {
    color: red;
    margin-right: 3px;
    font-weight: 700;
  }

  .error-msg {
    color: red;
    font-size: 0.75rem;
    padding-left: 0.3rem;
  }
`;

export const DogImgWrapper = styled.div`
  display: flex;
  margin: 0rem 0.3rem;

  .dogProfileCircle {
    border-radius: 50%;
    width: 4.2rem;
    height: 4.2rem;
    overflow: hidden;
    margin: 0.3rem 0rem;
    background-color: #ffffff;
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

export const ContentImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .contentImg {
    width: 8rem;
    height: 8rem;
    background-color: #606060;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .contentImg > input {
    display: none;
  }

  .iconWrapper {
    color: #ffffff;
    font-size: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .contentImg > label > img {
    width: 100%;
    object-fit: cover;
  }
`;
