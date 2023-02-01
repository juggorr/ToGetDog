import styled from '@emotion/styled';

export const FeedContainer = styled.div`
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
`;

export const FeedProfileWrapper = styled.div`
  flex: 3.5;
  padding: 1rem 1rem 0 1rem;
`;

export const FeedPhotoWrapper = styled.div`
  flex: 6.5;
  display: flex;
  justify-content: space-around;
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
  height: 65%;
  background-color: #fff;
`;

export const FeedProfileBottom = styled.div`
  height: 35%;
  background-color: #e2e2e2;
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
