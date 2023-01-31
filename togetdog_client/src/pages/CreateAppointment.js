import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import {
  CreateAppointmentWrapper,
  WalkRequest,
  DogImgWrapper,
} from "../styles/CreateAppointmentEmotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DogImages = (item) => {
  const [activeDog, setActiveDog] = useState(false);

  return (
    <DogImgWrapper key={item.dogId}>
      <div
        className={activeDog ? "dogProfileCircle" : "dogProfileCircle disabled"}
        onClick={() => setActiveDog(!activeDog)}
      >
        <img
          className="dogProfileImg"
          src={item.dogProfile}
          alt="dog_profile"
        />
      </div>
    </DogImgWrapper>
  );
};

const CreateAppointment = () => {
  // 임시 아이디값, 나중에 바꿔줘야함
  const userId = 1;
  const partnerId = 1;

  const [userData, setUserData] = useState({});
  const [partnerData, setPartnerData] = useState({});

  useEffect(() => {
    axios
      .get(`http://i8a807.p.ssafy.io:8081/dummy/user/includesDog/${userId}`, {})
      .then(function (response) {
        setUserData(response.data);
      })
      .catch(function (error) {
        // 오류발생시 실행
      });

    axios
      .get(
        `http://i8a807.p.ssafy.io:8081/dummy/user/includesDog/${partnerId}`,
        {}
      )
      .then(function (response) {
        setPartnerData(response.data);
      })
      .catch(function (error) {
        // 오류발생시 실행
      });
  }, [userId, partnerId]);

  return (
    <CreateAppointmentWrapper>
      <div className="appointmentHeader">산책 요청하기</div>
      <WalkRequest>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"   "}나의 강아지를 선택해주세요.
        </p>
        {userData.dog &&
          userData.dog.map((item) => (
            <DogImages dog={item} key={userData.dog.dogId}></DogImages>
          ))}
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"   "}상대방의 강아지를 선택해주세요.
        </p>
        {partnerData.dog &&
          partnerData.dog.map((item) => (
            <DogImages dog={item} key={partnerData.dog.dogId}></DogImages>
          ))}
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-clock" />
          {"   "}언제 산책할까요?
        </p>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-location-dot" />
          {"   "}어디서 산책할까요?
        </p>
      </WalkRequest>
    </CreateAppointmentWrapper>
  );
};

export default CreateAppointment;
