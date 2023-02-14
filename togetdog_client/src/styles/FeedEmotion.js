import styled from '@emotion/styled';

export const FeedContainer = styled.div`
  width: 100%;
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;

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
  margin-bottom: 0.1rem;
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

  .dog-info-box {
    width: 75%;
    padding-left: 0.7rem;
  }

  .no-dog-info-box {
    width: 50%;
    padding-left: 1rem;
  }

  .dog-info {
    font-size: 0.85rem;
    color: #777;
    display: flex;
    align-items: center;
  }

  .dog-gender {
    width: 1.5rem;
  }

  .profile-etc-wrapper {
    width: 30%;
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
    margin-bottom: 0.3rem;
  }

  .follow-text {
    color: #777;
  }

  .sub-dogs {
    display: flex;
    position: absolute;
    top: 3.7rem;
    left: 4.5rem;
  }

  .no-dogs-txt {
    font-size: 0.9rem;
  }

  .other-user-btns {
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .make-appointment-btn {
    width: 1.7rem;
    height: 1.7rem;
    font-size: 0.8rem;
    background-color: #7fb77e;
    text-align: center;
    line-height: 1.5rem;
    border-radius: 50%;
    color: #fff;
    margin-top: 2.6rem;
  }
`;

export const FeedProfileBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;

  .special-text {
    font-size: 0.8rem;
  }

  .characters-box {
    padding: 0.5rem 0;
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
