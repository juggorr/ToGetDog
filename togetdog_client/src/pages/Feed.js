import { FeedContainer, FeedPhotoWrapper, FeedProfileWrapper } from '../styles/FeedEmotion';

const Feed = () => {
  return (
    <>
      <FeedContainer>
        <FeedProfileWrapper>프로필</FeedProfileWrapper>
        <FeedPhotoWrapper>포토</FeedPhotoWrapper>
      </FeedContainer>
    </>
  );
};

export default Feed;
