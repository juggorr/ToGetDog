import { FeedProfileTop, FeedProfileBottom, MainDogImg, SubDogImg } from '../styles/FeedEmotion';

import Boy from '../assets/boy.png';
import Girl from '../assets/girl.png';
import MenuIcon from '../assets/menu_icon.png';
import OrangeCharacterBtn from './OrangeCharacterBtn';
import YellowCharacterBtn from './YellowCharacterBtn';
import { PlusBtn } from '../styles/BtnsEmotion';
import { useNavigate } from 'react-router-dom';

const FeedProfile = ({ menuBtnClick, setMenuBtnClick, data }) => {
  data = {
    userId: '12414',
    nickname: '크림엄마',
    userBirth: '1997',
    userGender: 'female',
    address: '서울특별시 동작구 흑석동',
    regionCode: '11439',
    social: 'naver',
    rating: '3.14',
    dogs: [
      {
        dogId: '114',
        userId: '12414',
        dogName: '뽀삐',
        dogGender: 'female', // female, male
        dogType: '폼피츠',
        dogAge: '70', // 개월수
        dogWeight: '3.4',
        dogNeutered: true, // 중성화 되어 있음
        dogCharacter1: 'independent', // 독립적
        dogCharacter2: 'active', // 활동적
        description: '활동적이나 순해요',
        dogProfile:
          'https://mblogthumb-phinf.pstatic.net/MjAxOTA1MDhfMTQ2/MDAxNTU3MzAxNzQ4NDIw.MWkemnXiB57Tbm2kNMrDNj4uVImaujgUayV8GSKWA9Mg._lcDUVLNrYzYR9M36qGCdD1Kp0qLNxoZaqqkj-5-tswg.JPEG.hellohappypet/1.jpg?type=w800',
        dogFollwerCnt: '333', // 이 강아지를 팔로우 하는 수
      },
      {
        dogId: '115',
        userId: '12414',
        dogName: '초코',
        dogGender: 'male', // female, male
        dogType: '푸들',
        dogAge: '100', // 개월수
        dogWeight: '5.4',
        dogNeutered: true, // 중성화 되어 있음
        dogCharacter1: 'dependent', // 독립적
        dogCharacter2: 'inactive', // 활동적
        description: '사나워요',
        dogProfile: 'https://pbs.twimg.com/media/DWC_IZ0V4AA8KmH.jpg',
        dogFollwerCnt: '200', // 이 강아지를 팔로우 하는 수
      },
    ],
    isFollow: 'True', // 피드 주인을 내가 팔로우했는지 여부
    followCnt: '300', // 피드 주인의 팔로우 수 (내 피드일 때만)
  };

  const navigate = useNavigate();
  const dogs = data.dogs;
  let currentDog = dogs[0];
  let neutered = currentDog.dogNeutered ? '중성화' : '중성화 X';
  let character1 = currentDog.dogCharacter1 === 'independent' ? '독립적' : '순종적';
  let character2 = currentDog.dogCharacter2 === 'active' ? '활동적' : '비활동적';
  let ageMonth = currentDog.dogAge;
  let ageYear = ageMonth >= 12 ? `${Math.floor(ageMonth / 12)}살` : `${ageMonth}개월`;

  let subDogs = [];
  if (dogs.length > 1) {
    dogs.map((dog) => {
      if (dog.dogId !== currentDog.dogId) {
        subDogs.push(dog);
      }
    });
  }

  return (
    <>
      {/* 프로필 상단 */}
      <FeedProfileTop>
        <MainDogImg src={currentDog.dogProfile}></MainDogImg>
        <div className='dog-info-box'>
          <div>{currentDog.dogName}</div>
          <div className='dog-info'>
            {`${currentDog.dogType} / ${ageYear}`}
            {currentDog.dogGender === 'male' ? (
              <img src={Boy} className='dog-gender' />
            ) : (
              <img src={Girl} className='dog-gender' />
            )}
          </div>
        </div>
        <div className='sub-dogs'>
          {subDogs.map((subdog) => (
            <SubDogImg src={subdog.dogProfile} key={subdog.dogId} />
          ))}
          {dogs.length === 3 ? null : <PlusBtn onClick={() => navigate('/dogregister')}>+</PlusBtn>}
        </div>
        <div className='profile-etc-wrapper'>
          <img src={MenuIcon} className='menu-icon' onClick={() => setMenuBtnClick(true)} />
          <div className='follow-info flex-column'>
            <div>
              <span className='follow-text'>팔로워</span>
              {currentDog.dogFollwerCnt}
            </div>
            <div>
              <span className='follow-text'>팔로잉</span>
              {data.followCnt}
            </div>
          </div>
        </div>
      </FeedProfileTop>
      {/* 특이사항, 성격 들어가는 부분 */}
      <FeedProfileBottom>
        <div className='special-text'>{currentDog.description}</div>
        <div className='characters-box'>
          <OrangeCharacterBtn text={`#${neutered}`} />
          <YellowCharacterBtn text={`#${character1}`} />
          <YellowCharacterBtn text={`#${character2}`} />
        </div>
      </FeedProfileBottom>
    </>
  );
};

export default FeedProfile;
