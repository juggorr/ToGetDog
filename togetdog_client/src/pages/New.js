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
  const [selectedDog, setSelectedDog] = useState();
  const [imgURL, setImgURL] = useState(null);

  const imgRef = useRef();
  const contentText = useRef(null);

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
    //   .then((response) => {
    //     setUserData(response.data);
    //     currentDog.current = response.data.dog[0].dogId;
    //     // setCurrentDog(userData.dog[0].dogId);
    //   })
    //   .catch((error) => {
    //     // 오류발생시 실행
    //   });

    // if (userData.dog) {
    //   setCurrentDog(userData.dog[0].dogId);
    //   console.log(userData.dog);
    //   console.log("초기", currentDog);
    // }
  }, []);

  const DogImages = (item) => {
    return (
      <DogImgWrapper key={item.dog.dogId}>
        <div
          className={
            selectedDog === item.dog.dogId
              ? "dogProfileCircle"
              : "dogProfileCircle disabled"
          }
          onClick={() => {
            setSelectedDog(item.dog.dogId);
          }}
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

  const saveImgFile = (e) => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgURL(reader.result);
      };
    }
  };

  const saveText = (e) => {
    contentText.current = e.target.value;
  };

  const checkValid = () => {
    if (selectedDog && imgRef.current.files[0]) {
      console.log("ok");
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
            userData.dog.map((item, idx) => (
              <DogImages dog={item} key={item.dogId} idx={idx}></DogImages>
            ))}
        </div>
        {selectedDog ? null : (
          <p className="warningStr">강아지를 선택해주세요.</p>
        )}
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-image" />
          {"  "}사진
        </p>
        <ContentImgWrapper>
          <div className="contentImg">
            <label htmlFor="file-input">
              {imgURL ? (
                <img src={imgURL} alt="content_img" />
              ) : (
                <div className="iconWrapper">
                  <FontAwesomeIcon icon="fa-square-plus" />
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={saveImgFile}
              ref={imgRef}
            />
          </div>
        </ContentImgWrapper>
        {imgURL ? null : <p className="warningStr">사진을 선택해주세요.</p>}
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-pen" />
          {"  "}내용
        </p>
        <div className="textInputWrapper">
          <textarea
            className="textInput"
            onChange={saveText}
            placeholder="내용을 입력하세요."
          />
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
        <MainColorShortBtn onClick={checkValid}>작성</MainColorShortBtn>
      </div>
    </CreateBoardWrapper>
  );
};

export default New;
