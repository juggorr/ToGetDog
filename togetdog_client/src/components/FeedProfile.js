import { MainDogImg, ProfileWrapper } from '../styles/FeedEmotion';

const FeedProfile = () => {
  return (
    <>
      <ProfileWrapper>
        <div className='flex'>
          <MainDogImg src='https://mblogthumb-phinf.pstatic.net/MjAxOTA1MDhfMTQ2/MDAxNTU3MzAxNzQ4NDIw.MWkemnXiB57Tbm2kNMrDNj4uVImaujgUayV8GSKWA9Mg._lcDUVLNrYzYR9M36qGCdD1Kp0qLNxoZaqqkj-5-tswg.JPEG.hellohappypet/1.jpg?type=w800'></MainDogImg>
          <div className='dog-name'></div>
        </div>
        <div className='flex-column'>
          <div>특이사항</div>
          <div>성격</div>
        </div>
      </ProfileWrapper>
    </>
  );
};

export default FeedProfile;
