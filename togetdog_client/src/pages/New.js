import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CreateBoardWrapper,
  BoardContentWrapper,
  DogImgWrapper,
  ContentImgWrapper,
} from "../styles/NewEmotion";
import { MainColorShortBtn } from "../styles/BtnsEmotion";

import { BACKEND_URL, DUMMY_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const New = () => {
  const navigate = useNavigate();

  // 임시 데이터
  const userId = 1;
  // const [user, setUser] = useRecoilState(userState);

  const [userData, setUserData] = useState({});
  const [currentDog, setCurrentDog] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    // 임시 데이터
    setUserData({
      userId: 1,
      nickName: "뽀삐엄마",
      userAge: 28,
      userGender: null,
      address: "서울시 동작구 흑석동",
      regionCode: "11455",
      social: "naver",
      rating: 3.41,
      dog: [
        {
          dogId: 114,
          dogName: "뽀삐",
          userId: 1,
          nickName: null,
          address: null,
          dogGender: "female",
          dogType: "말티즈",
          dogAge: 72,
          dogWeight: 3.4,
          dogNeutered: true,
          dogCharacter1: "independent",
          dogCharacter2: "active",
          description: "활동적이고 순해요",
          dogProfile:
            "https://yt3.googleusercontent.com/b_9EipIlhBtnwKayzvdjm8uUuRMte0qhUif5WpazM-EvmTmNEhR6u2UPvnRDjSwvw6-I1INO9Q=s900-c-k-c0x00ffffff-no-rj",
        },
        {
          dogId: 124,
          dogName: "뭉뭉",
          userId: 1,
          nickName: null,
          address: null,
          dogGender: "female",
          dogType: "말티즈",
          dogAge: 72,
          dogWeight: 3.4,
          dogNeutered: true,
          dogCharacter1: "independent",
          dogCharacter2: "active",
          description: "활동적이고 순해요",
          dogProfile:
            "https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg",
        },
      ],
      followCnt: 0,
      follow: false,
    });
    // axios
    //   .get(`${DUMMY_URL}/user/includesDog/${userId}`, {})
    //   .then(function (response) {
    //     setUserData(response.data);
    //     currentDog.current = response.data.dog[0].dogId;
    //   })
    //   .catch(function (error) {
    //     // 오류발생시 실행
    //   });

    if (userData.dog) {
      setCurrentDog(userData.dog[0].dogId);
      console.log(userData.dog);
      console.log(" 초기", currentDog);
    }
  }, []);

  const DogImages = (item) => {
    const [activeDog, setActiveDog] = useState(false);

    // 클릭하면 상태 변경하는 코드
    useEffect(() => {}, [activeDog]);

    return (
      <DogImgWrapper key={item.dog.dogId}>
        <div
          className={
            currentDog === item.dog.dogId
              ? "dogProfileCircle"
              : "dogProfileCircle disabled"
          }
          onClick={() => setActiveDog(!activeDog)}
        >
          <img
            className="dogProfileImg"
            src={item.dog.dogProfile}
            alt={item.dog.dogName}
          />
        </div>
      </DogImgWrapper>
    );
  };

  const ReadURL = (e) => {
    if (e.target.value && e.target.value[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("preview").src = e.target.result;
      };
      reader.readAsDataURL(e.target.value[0]);
      setImgURL(e.target.value[0]);
      console.log(imgURL);
    } else {
      document.getElementById("preview").src = "";
      setImgURL(null);
    }
  };

  return (
    <CreateBoardWrapper>
      <div className="boardHeader">게시글 작성</div>
      <BoardContentWrapper>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"  "}누구의 사진인가요?
        </p>
        <div className="dogImageWrapper">
          {userData.dog &&
            userData.dog.map((item) => (
              <DogImages dog={item} key={item.dogId}></DogImages>
            ))}
        </div>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-image" />
          {"  "}사진
        </p>
        <ContentImgWrapper>
          {/* <div className="contentImg">
            <input type="file" />
          </div> */}
          <div class="contentImg">
            <label for="file-input">
              <img id="preview" src="" alt="content_img" />
              {imgURL ? null : (
                <div className="iconWrapper">
                  <FontAwesomeIcon icon="fa-square-plus" />
                </div>
              )}
            </label>

            <input id="file-input" type="file" onChange={ReadURL} />
          </div>
        </ContentImgWrapper>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-pen" />
          {"  "}내용
        </p>
        <div className="textInputWrapper">
          <textarea className="textInput" />
        </div>
      </BoardContentWrapper>
      <div className="btnWrapper">
        <MainColorShortBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </MainColorShortBtn>
        <MainColorShortBtn>작성</MainColorShortBtn>
      </div>
    </CreateBoardWrapper>
  );
};

export default New;
