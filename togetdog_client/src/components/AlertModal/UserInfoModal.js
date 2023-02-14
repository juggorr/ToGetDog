import { useState, useEffect, useRef } from "react";
// import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import axios from "axios";

import { authAtom, userState } from "../../recoil";

import WalkIcon from "../../assets/walking_with_dog.png";
import UserIcon from "../UserIcon";
import { BACKEND_URL } from "../../config";
import {
  ConfirmModalWrapper,
  ConfirmModalBody,
  ConfirmModalImage,
} from "../../styles/ModalEmotion";
import YellowCharacterBtn from "../YellowCharacterBtn";
import { MainColorShortBtn } from "../../styles/BtnsEmotion";
import emotion1 from "../../assets/emotion1.png";
import emotion2 from "../../assets/emotion2.png";
import emotion3 from "../../assets/emotion3.png";
import emotion4 from "../../assets/emotion4.png";
import emotion5 from "../../assets/emotion5.png";

function UserInfoModal({
  userInfoModal,
  setUserInfoModal,
  setMenuBtnClick,
  feedUserData,
}) {
  const user = useRecoilValue(userState);
  const auth = useRecoilValue(authAtom);
  const outSection = useRef();

  const [brithYear, setBirthYear] = useState("");
  const [dong, setDong] = useState("");
  const [gender, setGender] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    console.log(feedUserData);
    axios
      .get(`${BACKEND_URL}/user/${feedUserData.userId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRate(res.data.user.rating);

        const dongData = res.data.user.address.split(" ");
        setDong(dongData[dongData.length - 1]);

        const thisYear = new Date().getFullYear();
        setBirthYear(
          Math.floor((thisYear - res.data.user.birth + 1) / 10) * 10
        );

        if (res.data.user.userGender === "male") {
          setGender("남성");
        } else if (res.data.user.userGender === "female") {
          setGender("여성");
        } else {
          setGender("기타");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClick = () => {
    setUserInfoModal(false);
  };

  return (
    <>
      {userInfoModal === true ? (
        <ConfirmModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              setUserInfoModal(false);
            }
          }}>
          <ConfirmModalBody>
            <UserIcon text={feedUserData.nickname}></UserIcon>
            <div className="user-nickname">{feedUserData.nickname}</div>
            <div className="rating-box">
              {rate < 1 ? (
                <img className="rate-img" src={emotion5} alt="최저" />
              ) : rate < 2 ? (
                <img className="rate-img" src={emotion4} alt="저" />
              ) : rate < 3 ? (
                <img className="rate-img" src={emotion3} alt="중" />
              ) : rate < 4 ? (
                <img className="rate-img" src={emotion2} alt="고" />
              ) : (
                <img className="rate-img" src={emotion1} alt="최고" />
              )}
              <p className="rate">{rate}</p>
            </div>
            <div className="characters-box">
              <YellowCharacterBtn text={`# ${dong}`} />
              <YellowCharacterBtn text={`# ${brithYear}대`} />
              <YellowCharacterBtn text={`# ${gender}`} />
            </div>
            <div className="two-btns-wrapper">
              <MainColorShortBtn onClick={onClick}>닫기</MainColorShortBtn>
            </div>
          </ConfirmModalBody>
        </ConfirmModalWrapper>
      ) : null}
    </>
  );
}

export default UserInfoModal;
