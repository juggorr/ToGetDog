import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import UserInfoModal from "../components/AlertModal/UserInfoModal";
import ConfirmModal from "../components/ConfirmModal";
import NoDogAlertModal from "../components/AlertModal/NoDogAlertModal";
import MenuModal from "../components/MenuModal";
import OrangeCharacterBtn from "../components/OrangeCharacterBtn";
import YellowCharacterBtn from "../components/YellowCharacterBtn";
import { BACKEND_URL } from "../config";
import { authAtom, userState } from "../recoil";
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
import Loading from "../assets/loading.gif";
import FollowBtn from "../components/FollowBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Feed = () => {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const menuLists = [
    {
      menu_id: 1,
      text: "내 정보 보기",
      link: "/profile",
    },
    {
      menu_id: 2,
      text: "프로필 수정",
      link: "/useredit",
    },
    {
      menu_id: 3,
      text: "강아지 프로필 수정",
      link: "/dogedit",
    },
    {
      menu_id: 4,
      text: "강아지 프로필 삭제",
      link: "/dogdelete",
    },
    {
      menu_id: 5,
      text: "계정 비밀번호 변경",
      link: "/passwordedit",
    },
    {
      menu_id: 6,
      text: "로그아웃",
      link: "/logout",
    },
  ];

  // 유저 정보 모달 띄우기
  const [userInfoModal, setUserInfoModal] = useState(false);

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
  const feedUserId = location.pathname.split("/").reverse()[0];
  // pageNo
  const pageNo = 1;

  const swapMainDog = async (targetDogId) => {
    setLoading(true);
    let tmpSubDogs = [];
    for (let dog of feedDogData) {
      if (dog.dogId === targetDogId) {
        setCurrentDog(dog);
        setFollowStatus(dog.following);
      } else {
        tmpSubDogs.push(dog);
      }
    }
    await setSubDogs(tmpSubDogs);
    await axios
      .get(`${BACKEND_URL}/board/list/${targetDogId}`, {
        params: {
          pageNo: pageNo,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        setFeedPhotoData(resp.data.boardList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          alert("토큰이 만료되어 자동 로그아웃되었습니다.");
          handleLogout();
        }
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuth(null);
    console.log("로그아웃이 정상적으로 처리되었습니다.");
    navigate("/login");
  };

  useEffect(() => {
    if (!auth || !localStorage.getItem("recoil-persist")) {
      navigate("/login");
      return;
    }

    axios
      .get(`${BACKEND_URL}/feed/${feedUserId}?pageNo=${pageNo}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        setFeedData(resp.data.feed);
        setFeedUserData(resp.data.user);
        if (resp.data.user.dogs) {
          setFeedDogData(resp.data.user.dogs);
          setCurrentDog(resp.data.user.dogs[0]);
          if (resp.data.user.dogs.toString() !== [].toString()) {
            setFollowStatus(resp.data.user.dogs[0].following);
          }
        }
        let tmpSubDogs = [];

        if (resp.data.user.dogs) {
          resp.data.user.dogs.map((dog) => {
            if (dog.dogId !== resp.data.user.dogs[0].dogId) {
              tmpSubDogs.push(dog);
            }
          });
        }
        setSubDogs(tmpSubDogs);
        setFeedPhotoData(resp.data.feed);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          navigate("/*");
        } else if (err.response.status === 401) {
          alert("토큰이 만료되어 자동 로그아웃되었습니다.");
          handleLogout();
        }
        console.log("피드 데이터 불러오기 실패");
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={Loading} alt="loading..." />
      </div>
    );
  }

  return (
    <>
      <FeedContainer>
        {currentDog ? (
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
        <UserInfoModal
          userInfoModal={userInfoModal}
          setUserInfoModal={setUserInfoModal}
          setMenuBtnClick={setMenuBtnClick}
          feedUserData={feedUserData}
        />
        <MenuModal
          menuLists={menuLists}
          menuBtnClick={menuBtnClick}
          setMenuBtnClick={setMenuBtnClick}
          setConfirmBtnClick={setConfirmBtnClick}
          setNoDogBtnClick={setNoDogBtnClick}
          setUserInfoModal={setUserInfoModal}
          feedDogData={feedDogData}
          dogId={currentDog?.dogId}
        />
        <FeedProfileWrapper>
          {/* 프로필 상단 */}
          <FeedProfileTop>
            {!currentDog ? (
              <MainDogImg src="https://media.istockphoto.com/id/509962049/vector/cute-puppy-sits.jpg?s=612x612&w=0&k=20&c=hm9wNYwzB2sXwrySGNi83WzH5B7ubDMk1NKJw73W7tg=" />
            ) : (
              <MainDogImg
                src={
                  `https://i8a807.p.ssafy.io/image/dog/` + currentDog.dogProfile
                }
              />
            )}
            {!feedDogData ? (
              <div className="no-dog-info-box">
                <div className="no-dogs-txt">{"등록된 강아지가 없습니다."}</div>
              </div>
            ) : currentDog ? (
              <div className="dog-info-box">
                <div className="dog-name">
                  {currentDog.dogName}
                  {currentDog.dogGender === "male" ? (
                    <img src={Boy} className="dog-gender" />
                  ) : (
                    <img src={Girl} className="dog-gender" />
                  )}
                </div>
                <div className="dog-info">
                  {`${currentDog.dogType} / ${
                    currentDog.dogAge >= 12
                      ? `${Math.floor(currentDog.dogAge / 12)}살`
                      : `${currentDog.dogAge}개월`
                  }`}
                </div>
              </div>
            ) : (
              <div className="dog-info-box">
                <div>{"등록된 강아지가 없습니다."}</div>
              </div>
            )}

            <div className="sub-dogs">
              {subDogs
                ? subDogs.map((subdog) => (
                    <SubDogImg
                      src={
                        `https://i8a807.p.ssafy.io/image/dog/` +
                        subdog.dogProfile
                      }
                      key={subdog.dogId}
                      onClick={() => swapMainDog(subdog.dogId)}
                    />
                  ))
                : null}
              {feedDogData.length === 3 ||
              feedUserData.userId !== user.userId ? null : (
                <PlusBtn onClick={() => navigate("/dogregister")}>+</PlusBtn>
              )}
            </div>
            {feedUserData.userId === user.userId ? (
              <div className="profile-etc-wrapper">
                <img
                  src={MenuIcon}
                  className="menu-icon"
                  onClick={() => setMenuBtnClick(true)}
                  alt="menu"
                />
                <div className="follow-info flex-column">
                  {currentDog ? (
                    <div
                      className="follow-box"
                      onClick={() =>
                        navigate(`/followerlist/${currentDog.dogId}`, {
                          state: { dogId: currentDog.dogId },
                        })
                      }>
                      <div className="follow-text">팔로워</div>
                      <div>{currentDog.dogFollowerCnt}</div>
                    </div>
                  ) : null}
                  <div
                    onClick={() =>
                      navigate(`/followinglist/${user.userId}`, {
                        state: { userId: user.userId },
                      })
                    }>
                    <div className="follow-text">팔로잉</div>
                    <div>{feedUserData.followCnt}</div>
                  </div>
                </div>
              </div>
            ) : currentDog ? (
              <div className="other-user-btns">
                <FollowBtn
                  dogId={currentDog.dogId}
                  followStatus={followStatus}
                  setFollowStatus={setFollowStatus}
                />
                <div className="feed-btn-box">
                  <div
                    className="dm-btn"
                    onClick={() => navigate(`/chat/${feedUserData.userId}`)}>
                    <FontAwesomeIcon icon="fa-solid fa-message" />
                  </div>
                  <div
                    className="make-appointment-btn"
                    onClick={() =>
                      navigate("/createAppointment", {
                        state: {
                          partnerId: feedUserData.userId,
                        },
                      })
                    }>
                    <FontAwesomeIcon icon="fa-calendar" />
                  </div>
                </div>
              </div>
            ) : null}
          </FeedProfileTop>
          {/* 특이사항, 성격 들어가는 부분 */}
          {currentDog ? (
            <FeedProfileBottom>
              <div
                className={`${
                  feedUserData.userId === user.userId
                    ? "dog-user-mine"
                    : "dog-user-not-mine"
                }`}
                onClick={() => setUserInfoModal(!userInfoModal)}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                <span className="dog-user-nickname">
                  {feedUserData.nickname}
                </span>
              </div>
              <div className="special-text">{currentDog.description}</div>
              <div className="characters-box">
                <OrangeCharacterBtn
                  text={`#${currentDog.dogNeutered ? "중성화" : "중성화 X"}`}
                />
                <YellowCharacterBtn
                  text={`#${
                    currentDog.dogCharacter1 === "obedient"
                      ? "온순함"
                      : "사나움"
                  }`}
                />
                <YellowCharacterBtn
                  text={`#${
                    currentDog.dogCharacter2 === "active"
                      ? "활동적"
                      : "비활동적"
                  }`}
                />
              </div>
            </FeedProfileBottom>
          ) : (
            <FeedProfileBottom>
              <div
                className={`${
                  feedUserData.userId === user.userId
                    ? "dog-user-mine"
                    : "dog-user-not-mine"
                }`}
                onClick={() => setUserInfoModal(!userInfoModal)}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                <span className="dog-user-nickname">
                  {feedUserData.nickname}
                </span>
              </div>
            </FeedProfileBottom>
          )}
        </FeedProfileWrapper>
        {!feedPhotoData ? (
          <div className="no-photo">등록된 사진이 없습니다.</div>
        ) : (
          <FeedPhotoWrapper>
            {feedPhotoData.map((feedPhoto) => (
              <FeedPhoto
                key={feedPhoto.boardId}
                onClick={() => navigate(`/board/${feedPhoto.boardId}`)}
                src={`https://i8a807.p.ssafy.io/image/board/` + feedPhoto.image}
              />
            ))}
          </FeedPhotoWrapper>
        )}
      </FeedContainer>
    </>
  );
};

export default Feed;
