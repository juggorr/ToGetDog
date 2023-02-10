import styled from "@emotion/styled";

export const HomeWrapper = styled.div`
  overflow-y: scroll;
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 8rem;
  background-color: #559968;

  .backgroundImg {
    right: 1rem;
    z-index: 1;
    position: absolute;
    height: 6rem;
    object-fit: contain;
  }

  .typed-out {
    z-index: 2;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.3rem;
    font-weight: 700;
    font-family: "Gowun Dodum", sans-serif;
    color: #fff;
    text-shadow: -1px 0 #559968, 0 1px #559968, 1px 0 #559968, 0 -1px #559968;
    animation: typing 1s steps(20, end) forwards;
  }

  .container {
    width: calc(100% - 3rem);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    z-index: 2;
    padding: 1.5rem;
    overflow: hidden;
  }

  .typedOutContainer {
    display: inline-block;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  .btnContainer {
    display: flex;
    justify-content: end;
  }

  .walk-btn {
    width: 7rem;
    z-index: 2;
    padding: 0.3rem;
    border: 1px solid #559968;
    color: #559968;
    font-weight: 700;
    font-size: 0.8rem;
    border-radius: 1rem;
  }
`;

export const RecommendBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0rem;

  .recommendBox {
    display: flex;
    overflow-x: scroll;
    padding-left: 0.3rem;
  }

  .recommend-txt-box {
    padding-top: 0.5rem;
    padding-left: 0.7rem;
  }

  .recommend-txt {
    font-family: "Gowun Dodum", sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    padding-left: 0.3rem;
  }
`;

export const DogRecommendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  width: fit-content;
  align-items: center;
`;

export const DogProfile = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const DogName = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.8rem;
  padding-top: 0.3rem;
  font-weight: 600;
`;

export const SingleBoardWrapper = styled.div`
  margin: 0rem 1rem;

  .profileWrapper {
    display: flex;
    padding: 0.5rem;
  }
  .contentWrapper {
    display: flex;
    flex-direction: column;

    align-items: center;
  }
  .imgWrapper {
    width: 20rem;
    height: 20rem;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .contentImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .contentText {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    padding: 0.8rem;
    margin-bottom: 1rem;
  }

  .contentLine {
    margin: 0.5rem 0rem;
    border-bottom: 1px solid #ececec;
  }
`;

export const DogImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0rem 0.3rem;

  .dogProfileCircle {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 70%;
    overflow: hidden;
    margin: 0.3rem 0rem;
  }

  .dogProfileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DogInfoWrapper = styled.div`
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;

  .dogInfo {
    margin: 0rem;
  }

  .dogNameWrapper {
    display: flex;
    align-items: center;
    font-weight: 800;
    font-size: 1rem;
    margin: 0rem;
    margin-left: 0.3rem;
  }

  .dogType {
    font-size: 0.78rem;
    color: #717171;
    margin: 0.3rem 0.35rem;
    display: flex;
    align-items: center;
  }

  .genderWrapper {
    margin: 0rem 0.2rem;
    display: flex;
    align-items: center;
    width: 1rem;
    height: 1rem;
  }

  .genderImg {
    object-fit: contain;
    width: 0.8rem;
    height: 0.8rem;
  }
`;
