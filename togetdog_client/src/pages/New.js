import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom, userState } from "../recoil";
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
  const auth = useRecoilValue(authAtom);

  const [user, setUser] = useRecoilState(userState);

  const [userData, setUserData] = useState({});
  const [selectedDog, setSelectedDog] = useState();
  const [imgURL, setImgURL] = useState(null);

  const imgRef = useRef();
  const contentText = useRef(null);

  useEffect(() => {
    axios
      .get(`${DUMMY_URL}/user/includesDog/${user.userId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        setUserData(response.data.user);
        setSelectedDog(response.data.user.dogs[0].dogId);
      })
      .catch((error) => {
        console.log(error);
        // 오류발생시 실행
      });
  }, []);

  const DogImages = (item) => {
    return (
      <DogImgWrapper key={item.dogs.dogId}>
        <div
          className={
            selectedDog === item.dogs.dogId
              ? "dogProfileCircle"
              : "dogProfileCircle disabled"
          }
          onClick={() => {
            setSelectedDog(item.dogs.dogId);
          }}
        >
          <img
            className="dogProfileImg"
            src={item.dogs.dogProfile}
            alt={item.dogs.dogName}
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

  const checkValid = async () => {
    if (selectedDog && imgRef.current.files[0]) {
      const formData = new FormData();
      const boardContent = { dogId: selectedDog, content: contentText.current };
      formData.append("file", imgRef.current.files[0]);
      formData.append(
        "boardContent",
        new Blob([JSON.stringify(boardContent)], { type: "application/json" })
      );
      await axios
        .post(`${DUMMY_URL}/board`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
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
          {userData.dogs &&
            userData.dogs.map((item, idx) => (
              <DogImages dogs={item} key={item.dogId} idx={idx}></DogImages>
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
