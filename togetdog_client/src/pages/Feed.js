import { FeedContainer, FeedPhotoWrapper, FeedProfileWrapper } from '../styles/FeedEmotion';
// import Dog1 from '../assets/dog1.jpg';

const Feed = () => {
  return (
    <>
      <FeedContainer>
        <FeedProfileWrapper>프로필</FeedProfileWrapper>
        <FeedPhotoWrapper>{/* <Feed src={Dog1} /> */}</FeedPhotoWrapper>
      </FeedContainer>
    </>
  );
};

export default Feed;
