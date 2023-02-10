import styled from "@emotion/styled";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .typed-out {
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.3rem;
    font-weight: 700;
    font-family: "Gowun Dodum", sans-serif;
    color: #fff;
    animation: typing 1s steps(20, end) forwards;
  }

  .container {
    z-index: 1;
    position: absolute;
    display: inline-block;
    padding-top: 1rem;
    padding-left: 0.7rem;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  .walk-btn {
    width: 7rem;
    z-index: 1;
    position: absolute;
    right: 0.7rem;
    top: 4.7rem;
    padding: 0.3rem;
    border: 1px solid #559968;
    color: #559968;
    font-weight: 700;
    font-size: 0.8rem;
    border-radius: 1rem;
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

export const HomeWelcomeBox = styled.img`
  width: 100%;
  height: 7rem;
  object-fit: cover;
  filter: brightness(50%);
`;

export const RecommendBox = styled.div`
  display: flex;
  overflow-x: scroll;
`;

export const DogRecommendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  width: fit-content;
  align-items: center;
`;

export const DogProfile = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
`;

export const DogName = styled.div`
  font-size: 0.8rem;
  padding-top: 0.3rem;
`;
