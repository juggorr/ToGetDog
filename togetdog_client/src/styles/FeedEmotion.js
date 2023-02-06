import styled from "@emotion/styled";

export const FeedContainer = styled.div`
  width: 100%;
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
`;

export const FeedProfileWrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
`;

export const FeedPhotoWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

export const FeedPhoto = styled.img`
  width: 33%;
  margin-bottom: 0.15rem;
  object-fit: cover;

  @media (min-width: 650px) {
    height: 111.4px;
  }

  @media (max-width: 650px) {
    /* 650px 이하일 때 */
    height: 33vw;
  }
`;

export const FeedProfileTop = styled.div`
  display: flex;
  background-color: #fff;

  .dog-info-box {
    width: 40%;
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
    width: 35%;
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
  }

  .follow-text {
    margin-right: 0.5rem;
    color: #777;
  }

  .sub-dogs {
    display: flex;
    position: absolute;
    top: 8.5rem;
    padding-left: 4.5rem;
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const SubDogImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 0.3rem;
`;
