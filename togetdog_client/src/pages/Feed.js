import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import MenuModal from "../components/MenuModal";
import OrangeCharacterBtn from "../components/OrangeCharacterBtn";
import YellowCharacterBtn from "../components/YellowCharacterBtn";
import { BACKEND_URL, DUMMY_URL } from "../config";
import { userState } from "../recoil";
import { PlusBtn } from "../styles/BtnsEmotion";
import {
  FeedContainer,
  FeedPhoto,
  FeedPhotoWrapper,
  FeedProfileBottom,
  FeedProfileTop,
  FeedProfileWrapper,
  MainDogImg,
  SubDogImg,
} from "../styles/FeedEmotion";
import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";
import MenuIcon from "../assets/menu_icon.png";
import FollowBtn from "../components/FollowBtn";

const Feed = () => {
  const [user, setUser] = useRecoilState(userState);

  const menuLists = [
    {
      menu_id: 1,
      text: "내 정보 보기",
      link: "/",
    },
    {
      menu_id: 2,
      text: "프로필 수정",
      link: "/",
    },
    {
      menu_id: 3,
      text: "강아지 프로필 수정",
      link: "/",
    },
    {
      menu_id: 4,
      text: "강아지 프로필 삭제",
      link: "/",
    },
    {
      menu_id: 5,
      text: "계정 비밀번호 변경",
      link: "/",
    },
    {
      menu_id: 6,
      text: "로그아웃",
      link: "/logout",
    },
  ];

  const [menuBtnClick, setMenuBtnClick] = useState(false);
  const [feedData, setFeedData] = useState({
    result: "success",
    feed: [
      {
        dog: {
          dogId: 114,
          dogName: "뽀삐",
          userId: 123,
          nickName: null,
          address: null,
          dogGender: "female",
          dogType: "말티즈",
          dogAge: 72,
          dogWeight: 3.4,
          dogNeutered: true,
          dogCharacter1: "obedient",
          dogCharacter2: "active",
          description: "활동적이고 순해요",
          dogProfile:
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MDhfMTQ2/MDAxNTU3MzAxNzQ4NDIw.MWkemnXiB57Tbm2kNMrDNj4uVImaujgUayV8GSKWA9Mg._lcDUVLNrYzYR9M36qGCdD1Kp0qLNxoZaqqkj-5-tswg.JPEG.hellohappypet/1.jpg?type=w800",
          followCnt: 214,
        },
        boardId: 123,
        image:
          "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MDhfMTQ2/MDAxNTU3MzAxNzQ4NDIw.MWkemnXiB57Tbm2kNMrDNj4uVImaujgUayV8GSKWA9Mg._lcDUVLNrYzYR9M36qGCdD1Kp0qLNxoZaqqkj-5-tswg.JPEG.hellohappypet/1.jpg?type=w800",
      },
    ],
    user: {
      userId: 3,
      nickName: "뽀삐엄마",
      userAge: 28,
      userGender: null,
      address: "서울시 동작구 흑석동",
      regionCode: "11455",
      social: "naver",
      rating: 3.41,
      dogs: [
        {
          dogId: 114,
          dogName: "뽀삐",
          userId: 123,
          nickName: null,
          address: null,
          dogGender: "female",
          dogType: "말티즈",
          dogAge: 72,
          dogWeight: 3.4,
          dogNeutered: true,
          dogCharacter1: "obedient",
          dogCharacter2: "active",
          description: "활동적이고 순해요",
          dogProfile:
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MDhfMTQ2/MDAxNTU3MzAxNzQ4NDIw.MWkemnXiB57Tbm2kNMrDNj4uVImaujgUayV8GSKWA9Mg._lcDUVLNrYzYR9M36qGCdD1Kp0qLNxoZaqqkj-5-tswg.JPEG.hellohappypet/1.jpg?type=w800",
          followCnt: 214,
        },
        {
          dogId: 115,
          dogName: "초코",
          userId: 123,
          nickName: null,
          address: null,
          dogGender: "male",
          dogType: "비숑",
          dogAge: 84,
          dogWeight: 4.5,
          dogNeutered: false,
          dogCharacter1: "disobedient",
          dogCharacter2: "active",
          description: "활동적이고 순해요",
          dogProfile:
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA1MDhfMTQ2/MDAxNTU3MzAxNzQ4NDIw.MWkemnXiB57Tbm2kNMrDNj4uVImaujgUayV8GSKWA9Mg._lcDUVLNrYzYR9M36qGCdD1Kp0qLNxoZaqqkj-5-tswg.JPEG.hellohappypet/1.jpg?type=w800",
          followCnt: 333,
        },
      ],
      followCnt: 300,
      follow: true,
    },
  });
  const [feedUserData, setFeedUserData] = useState(feedData.user);
  const [feedDogData, setFeedDogData] = useState(feedUserData.dogs);
  const [feedPhotoData, setFeedPhotoData] = useState(feedData.feed);
  const [currentDog, setCurrentDog] = useState(feedDogData[0]);
  let tmpSubDogs = [];
  if (feedDogData.length > 1) {
    feedDogData.map((dog) => {
      if (dog.dogId !== currentDog.dogId) {
        tmpSubDogs.push(dog);
      }
    });
  }
  const [subDogs, setSubDogs] = useState(tmpSubDogs);
  const [isLoading, setLoading] = useState(true);
  const [followStatus, setFollowStatus] = useState(feedUserData.follow);

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://i8a807.p.ssafy.io/dummy/feed/${user.userId}`,
  //       { params: { pageNo: 1 } },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       setFeedData(resp.data);
  //       setFeedUserData(feedData.user);
  //       setFeedDogData(feedUserData.dogs);
  //       setFeedPhotoData(feedData.feed);
  //       setCurrentDog(setFeedDogData[0]);
  //       let tmpSubDogs = [];
  //       if (feedDogData.length > 1) {
  //         feedDogData.map((dog) => {
  //           if (dog.dogId !== currentDog.dogId) {
  //             tmpSubDogs.push(dog);
  //           }
  //         });
  //       }
  //       setSubDogs(tmpSubDogs);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("피드 데이터 불러오기 실패");
  //     });
  //   console.log(JSON.stringify(feedData));
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <FeedContainer>
        <MenuModal
          menuLists={menuLists}
          menuBtnClick={menuBtnClick}
          setMenuBtnClick={setMenuBtnClick}
        />
        <FeedProfileWrapper>
          {/* 프로필 상단 */}
          <FeedProfileTop>
            <MainDogImg src={currentDog.dogProfile}></MainDogImg>
            <div className="dog-info-box">
              <div>{currentDog.dogName}</div>
              <div className="dog-info">
                {`${currentDog.dogType} / ${
                  currentDog.dogAge >= 12
                    ? `${Math.floor(currentDog.dogAge / 12)}살`
                    : `${currentDog.dogAge}개월`
                }`}
                {currentDog.dogGender === "male" ? (
                  <img src={Boy} className="dog-gender" />
                ) : (
                  <img src={Girl} className="dog-gender" />
                )}
              </div>
            </div>
            <div className="sub-dogs">
              {subDogs.map((subdog) => (
                <SubDogImg src={subdog.dogProfile} key={subdog.dogId} />
              ))}
              {feedDogData.length === 3 ? null : (
                <PlusBtn onClick={() => navigate("/dogregister")}>+</PlusBtn>
              )}
            </div>
            {feedUserData.userId === user.userId ? (
              <div className="profile-etc-wrapper">
                <img
                  src={MenuIcon}
                  className="menu-icon"
                  onClick={() => setMenuBtnClick(true)}
                />
                <div className="follow-info flex-column">
                  <div>
                    <span className="follow-text">팔로워</span>
                    {currentDog.followCnt}
                  </div>
                  <div>
                    <span className="follow-text">팔로잉</span>
                    {feedUserData.followCnt}
                  </div>
                </div>
              </div>
            ) : (
              <FollowBtn
                followStatus={followStatus}
                setFollowStatus={setFollowStatus}
              />
            )}
          </FeedProfileTop>
          {/* 특이사항, 성격 들어가는 부분 */}
          <FeedProfileBottom>
            <div className="special-text">{currentDog.description}</div>
            <div className="characters-box">
              <OrangeCharacterBtn
                text={`#${currentDog.dogNeutered ? "중성화" : "중성화 X"}`}
              />
              <YellowCharacterBtn
                text={`#${
                  currentDog.dogCharacter1 === "obedient"
                    ? "순종적"
                    : "비순종적"
                }`}
              />
              <YellowCharacterBtn
                text={`#${
                  currentDog.dogCharacter2 === "active" ? "활동적" : "비활동적"
                }`}
              />
            </div>
          </FeedProfileBottom>
        </FeedProfileWrapper>
        <FeedPhotoWrapper>
          <FeedPhoto src="https://mblogthumb-phinf.pstatic.net/MjAxODA0MTVfMjY2/MDAxNTIzNzgzNTMyMTk5.XluZh00E4Hzkl1Oif19d5UPPXJqzFisXFa_3BT6sTJgg.dOueWfo5LscEpJSYAi56N7p91H_PJLM4IjOvVSexYzYg.JPEG.jjingjjing92/20180410_215717.jpg?type=w800" />
          <FeedPhoto src="https://mypetlife.co.kr/9989/kakaotalk_20180720_165306084/" />
          <FeedPhoto src="https://t1.daumcdn.net/cfile/tistory/9952D14D5ACEAB8831" />
          <FeedPhoto src="https://cdn.imweb.me/thumbnail/20220105/8042079a902c2.jpg" />
          <FeedPhoto src="https://cdn.imweb.me/thumbnail/20210512/392868a89e970.jpg" />
          <FeedPhoto src="https://www.zooseyo.com/dog_sale/photo_free/202212/1671631945_03712600.jpg" />
          <FeedPhoto src="https://joubebe.com/wys2/swf_upload/2017/09/27/15064845361006.png" />
          <FeedPhoto src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLeBn4MEtb_AqR0cj2JjQIFicoJy-tZLBdA&usqp=CAU" />
          <FeedPhoto src="https://cdn.imweb.me/upload/S201806265b31e9f9b9a03/59074608a6b12.jpg" />
          <FeedPhoto src="https://mblogthumb-phinf.pstatic.net/MjAxODA0MTVfMjY2/MDAxNTIzNzgzNTMyMTk5.XluZh00E4Hzkl1Oif19d5UPPXJqzFisXFa_3BT6sTJgg.dOueWfo5LscEpJSYAi56N7p91H_PJLM4IjOvVSexYzYg.JPEG.jjingjjing92/20180410_215717.jpg?type=w800" />
          <FeedPhoto src="https://mypetlife.co.kr/9989/kakaotalk_20180720_165306084/" />
          <FeedPhoto src="https://t1.daumcdn.net/cfile/tistory/9952D14D5ACEAB8831" />
          <FeedPhoto src="https://cdn.imweb.me/thumbnail/20220105/8042079a902c2.jpg" />
          <FeedPhoto src="https://cdn.imweb.me/thumbnail/20210512/392868a89e970.jpg" />
          <FeedPhoto src="https://www.zooseyo.com/dog_sale/photo_free/202212/1671631945_03712600.jpg" />
          <FeedPhoto src="https://joubebe.com/wys2/swf_upload/2017/09/27/15064845361006.png" />
          <FeedPhoto src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLeBn4MEtb_AqR0cj2JjQIFicoJy-tZLBdA&usqp=CAU" />
          <FeedPhoto src="https://cdn.imweb.me/upload/S201806265b31e9f9b9a03/59074608a6b12.jpg" />
        </FeedPhotoWrapper>
      </FeedContainer>
    </>
  );
};

export default Feed;
