import styled from "@emotion/styled";

export const FeedContainer = styled.div`
  width: 100%;
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;

  .no-photo {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FeedProfileWrapper = styled.div`
  padding: 1rem 1rem 0 1rem;

  .margin-bottom {
    height: 2rem;
  }
`;

export const FeedPhotoWrapper = styled.div`
  display: flex;
  height: 100%;
  // justify-content: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

export const FeedPhoto = styled.img`
  width: 33.333%;
  object-fit: cover;

  @media (min-width: 650px) {
    height: 111.4px;
  }

  @media (max-width: 650px) {
    /* 650px 이하일 때 */
    height: 33.333vw;
  }
`;

export const FeedProfileTop = styled.div`
  display: flex;
  background-color: #fff;
  position: relative;

  @keyframes leftright {
    0%,
    20% {
      transform: translateX(0%);
      left: 0%;
    }
    80%,
    100% {
      transform: translateX(-100%);
      left: 100%;
    }
  }

  .dog-info-box {
    width: 100%;
    padding-left: 0.7rem;
  }

  .no-dog-info-box {
    width: 50%;
    padding-left: 1rem;
  }

  .dog-name {
    font-size: 0.9rem;
    display: flex;
    padding-bottom: 0.1rem;
  }

  .dog-breed,
  .dog-age {
    font-size: 0.85rem;
    color: #777;
  }

  .dog-breed {
    width: 6.5rem;
    white-space: nowrap;
    overflow-x: scroll;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  .dog-breed::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  .dog-gender {
    width: 1.5rem;
  }

  .profile-etc-wrapper {
    min-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .menu-icon {
    width: 2.5rem;
    color: black;
    font-size: 2rem;
  }

  .follow-info {
    font-size: 0.85rem;
    padding-top: 1rem;
    padding-right: 1rem;
    text-align: end;
  }

  .follow-box {
    display: flex;
    margin-bottom: 0.3rem;
  }

  .follow-text {
    color: #777;
    padding-right: 0.5rem;
  }

  .sub-dogs {
    display: flex;
    position: absolute;
    top: 4.3rem;
    left: 4.3rem;
  }

  .no-dogs-txt {
    font-size: 0.9rem;
  }

  .other-user-btns {
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .feed-btn-box {
    display: flex;
  }

  .make-appointment-btn,
  .dm-btn {
    width: 1.7rem;
    height: 1.7rem;
    font-size: 0.8rem;
    text-align: center;
    line-height: 1.5rem;
    border-radius: 50%;
    color: #fff;
    margin-top: 2.6rem;
  }

  .make-appointment-btn {
    background-color: #7fb77e;
  }

  .dm-btn {
    background-color: #717171;
    margin-right: 0.3rem;
  }
`;

export const FeedProfileBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;

  .special-text {
    font-size: 0.8rem;
  }

  .characters-box {
    padding: 0.5rem 0;
  }

  .dog-user-mine {
    color: #777;
    font-size: 0.8rem;
    padding-left: 0.3rem;
    padding-right: 0.5rem;
    padding-top: 0.1rem;
    cursor: pointer;
    text-align: end;
  }

  .dog-user-not-mine {
    color: #777;
    font-size: 0.8rem;
    padding-left: 0.3rem;
    padding-top: 0.1rem;
    cursor: pointer;
    text-align: end;
  }

  .dog-user-nickname {
    margin-left: 0.3rem;
    border-bottom: 1px solid #777;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainDogImg = styled.img`
  min-width: 100px;
  max-width: 100px;
  min-height: 100px;
  max-height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #fff;
`;

export const SubDogImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 0.3rem;
  object-fit: cover;
  background-color: #fff;
`;
