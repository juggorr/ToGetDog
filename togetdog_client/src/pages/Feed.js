import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ConfirmModal from '../components/ConfirmModal';
import NoDogAlertModal from '../components/NoDogAlertModal';
import MenuModal from '../components/MenuModal';
import OrangeCharacterBtn from '../components/OrangeCharacterBtn';
import YellowCharacterBtn from '../components/YellowCharacterBtn';
import { BACKEND_URL, DUMMY_URL } from '../config';
import { authAtom, dogState, userState } from '../recoil';
import { PlusBtn } from '../styles/BtnsEmotion';
import {
  FeedContainer,
  FeedPhoto,
  FeedPhotoWrapper,
  FeedProfileBottom,
  FeedProfileTop,
  FeedProfileWrapper,
  MainDogImg,
  SubDogImg,
} from '../styles/FeedEmotion';
import Boy from '../assets/boy.png';
import Girl from '../assets/girl.png';
import MenuIcon from '../assets/menu_icon.png';
import FollowBtn from '../components/FollowBtn';

const Feed = () => {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);

  // const [nowDog, setNowDog] = useState(null);

  const navigate = useNavigate();

  const menuLists = [
    {
      menu_id: 1,
      text: '내 정보 보기',
      link: '/',
    },
    {
      menu_id: 2,
      text: '프로필 수정',
      link: '/',
    },
    {
      menu_id: 3,
      text: '강아지 프로필 수정',
      link: '/',
    },
    {
      menu_id: 4,
      text: '강아지 프로필 삭제',
      link: '/dogdelete',
    },
    {
      menu_id: 5,
      text: '계정 비밀번호 변경',
      link: '/',
    },
    {
      menu_id: 6,
      text: '로그아웃',
      link: '/logout',
    },
  ];

  // 강아지 정보 삭제 모달 띄우기
  const [confirmBtnClick, setConfirmBtnClick] = useState(false);
  // 등록된 강아지 없으면 등록된 강아지가 없다는 경고 모달 띄우기
  const [noDogBtnClick, setNoDogBtnClick] = useState(false);

  const [menuBtnClick, setMenuBtnClick] = useState(false);
  const [feedData, setFeedData] = useState();

  const [feedUserData, setFeedUserData] = useState();
  const [feedDogData, setFeedDogData] = useState();
  const [feedPhotoData, setFeedPhotoData] = useState();
  const [filteredPhotoData, setFilteredPhotoData] = useState();
  const [currentDog, setCurrentDog] = useState();

  const [subDogs, setSubDogs] = useState();
  const [isLoading, setLoading] = useState(true);
  const [followStatus, setFollowStatus] = useState(false);

  const location = useLocation();
  const feedUserId = location.pathname.split('/').reverse()[0];
  // const pageNo = location.state.pageNo;
  const pageNo = 1;

  const swapMainDog = (targetDogId) => {
    let tmpSubDogs = [];
    for (let dog of feedDogData) {
      if (dog.dogId === targetDogId) {
        setCurrentDog(dog);
      } else {
        tmpSubDogs.push(dog);
      }
    }
    setSubDogs(tmpSubDogs);
  };

  useEffect(() => {
    if (!auth || !localStorage.getItem('recoil-persist')) {
      navigate('/login');
      return;
    }

    axios
      .get(`https://togetdog.site/api/feed/${feedUserId}?pageNo=${pageNo}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        setFeedData(resp.data);
        setFeedUserData(resp.data.user);
        setFeedDogData(resp.data.user.dogs);
        setCurrentDog(resp.data.user.dogs[0]);
        setFollowStatus(resp.data.user.dogs);
        let tmpSubDogs = [];

        if (resp.data.user.dogs.length > 1) {
          resp.data.user.dogs.map((dog) => {
            if (dog.dogId !== resp.data.user.dogs[0].dogId) {
              tmpSubDogs.push(dog);
            }
          });
        }
        setSubDogs(tmpSubDogs);
        setFeedPhotoData(resp.data.feed);
        let filteredPhotos = resp.data.feed.filter((feedPhoto) => feedPhoto.dogId === resp.data.user.dogs[0].dogId);
        setFilteredPhotoData(filteredPhotos);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log('피드 데이터 불러오기 실패');
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FeedContainer>
        {feedDogData.length > 0 ? (
          <ConfirmModal
            confirmBtnClick={confirmBtnClick}
            setConfirmBtnClick={setConfirmBtnClick}
            setMenuBtnClick={setMenuBtnClick}
            dogId={currentDog.dogId}
          />
        ) : (
          <NoDogAlertModal
            noDogBtnClick={noDogBtnClick}
            setNoDogBtnClick={setNoDogBtnClick}
            setMenuBtnClick={setMenuBtnClick}
          />
        )}
        <MenuModal
          menuLists={menuLists}
          menuBtnClick={menuBtnClick}
          setMenuBtnClick={setMenuBtnClick}
          setConfirmBtnClick={setConfirmBtnClick}
          setNoDogBtnClick={setNoDogBtnClick}
          feedDogData={feedDogData}
        />
        <FeedProfileWrapper>
          {/* 프로필 상단 */}
          <FeedProfileTop>
            {feedDogData.length === 0 ? (
              <MainDogImg src='https://media.istockphoto.com/id/509962049/vector/cute-puppy-sits.jpg?s=612x612&w=0&k=20&c=hm9wNYwzB2sXwrySGNi83WzH5B7ubDMk1NKJw73W7tg=' />
            ) : (
              <MainDogImg src={`https://i8a807.p.ssafy.io/image/dog/` + currentDog.dogProfile} />
            )}
            {feedDogData.length === 0 ? (
              <div className='no-dog-info-box'>
                <div className='no-dogs-txt'>{'등록된 강아지가 없습니다.'}</div>
              </div>
            ) : (
              <div className='dog-info-box'>
                <div>
                  {currentDog.dogName}
                  {currentDog.dogGender === 'male' ? (
                    <img src={Boy} className='dog-gender' />
                  ) : (
                    <img src={Girl} className='dog-gender' />
                  )}
                </div>
                <div className='dog-info'>
                  {`${currentDog.dogType} / ${
                    currentDog.dogAge >= 12 ? `${Math.floor(currentDog.dogAge / 12)}살` : `${currentDog.dogAge}개월`
                  }`}
                </div>
              </div>
            )}

            <div className='sub-dogs'>
              {subDogs.map((subdog) => (
                <SubDogImg
                  src={`https://i8a807.p.ssafy.io/image/dog/` + subdog.dogProfile}
                  key={subdog.dogId}
                  onClick={() => swapMainDog(subdog.dogId)}
                />
              ))}
              {feedDogData.length === 3 || feedUserData.userId !== user.userId ? null : (
                <PlusBtn onClick={() => navigate('/dogregister')}>+</PlusBtn>
              )}
            </div>
            {feedUserData.userId === user.userId ? (
              <div className='profile-etc-wrapper'>
                <img src={MenuIcon} className='menu-icon' onClick={() => setMenuBtnClick(true)} alt='menu' />
                <div className='follow-info flex-column'>
                  {currentDog ? (
                    <div
                      onClick={() =>
                        navigate(`/followerlist/${currentDog.dogId}`, { state: { dogId: currentDog.dogId } })
                      }
                    >
                      <span className='follow-text'>팔로워</span>
                      {currentDog.dogFollowerCnt}
                    </div>
                  ) : null}
                  <div onClick={() => navigate(`/followinglist/${user.userId}`, { state: { userId: user.userId } })}>
                    <span className='follow-text'>팔로잉</span>
                    {feedUserData.followCnt}
                  </div>
                </div>
              </div>
            ) : currentDog ? (
              <FollowBtn followStatus={followStatus} setFollowStatus={setFollowStatus} />
            ) : null}
          </FeedProfileTop>
          {/* 특이사항, 성격 들어가는 부분 */}
          {currentDog ? (
            <FeedProfileBottom>
              <div className='special-text'>{currentDog.description}</div>
              <div className='characters-box'>
                <OrangeCharacterBtn text={`#${currentDog.dogNeutered ? '중성화' : '중성화 X'}`} />
                <YellowCharacterBtn text={`#${currentDog.dogCharacter1 === 'obedient' ? '온순함' : '공격적'}`} />
                <YellowCharacterBtn text={`#${currentDog.dogCharacter2 === 'active' ? '활동적' : '비활동적'}`} />
              </div>
            </FeedProfileBottom>
          ) : (
            <div className='margin-bottom'></div>
          )}
        </FeedProfileWrapper>
        {filteredPhotoData.length === 0 ? (
          <div className='no-photo'>등록된 사진이 없습니다.</div>
        ) : (
          <div className='photo-center'>
            <FeedPhotoWrapper>
              {filteredPhotoData.map((filteredPhoto) => (
                <FeedPhoto
                  key={filteredPhoto.boardId}
                  onClick={() => navigate(`/board/${filteredPhoto.boardId}`)}
                  src={`https://i8a807.p.ssafy.io/image/board/` + filteredPhoto.image}
                />
              ))}
            </FeedPhotoWrapper>
          </div>
        )}
      </FeedContainer>
    </>
  );
};

export default Feed;
