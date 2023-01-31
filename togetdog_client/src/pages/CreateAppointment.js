import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { BACKEND_URL, DUMMY_URL, LOCAL_SERVER } from "../config";
import {
  CreateAppointmentWrapper,
  WalkRequest,
  DogImgWrapper,
} from "../styles/CreateAppointmentEmotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateAppointment = () => {
  // 임시 아이디값, 나중에 바꿔줘야함
  const userId = 1;
  const partnerId = 1;

  const [userData, setUserData] = useState({});
  const [partnerData, setPartnerData] = useState({});
  const [myActiveDogs, setMyActiveDogs] = useState([]);
  const [partnerActiveDogs, setPartnerActiveDogs] = useState([]);

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

  const DogImages = (item, idx) => {
    const [activeDog, setActiveDog] = useState([true, item.dog.dogId]);

    useEffect(() => {
      if (item.userKey === 1) {
        setMyActiveDogs([...myActiveDogs, [activeDog, item.dog.dogId]]);
      } else if (item.userKey === 2) {
        setPartnerActiveDogs([
          ...partnerActiveDogs,
          [activeDog, item.dog.dogId],
        ]);
      }
    }, []);

    useEffect(() => {
      if (item.userKey === 1) {
        let tempActiveDogs = myActiveDogs;
        tempActiveDogs[idx] = [activeDog, item.dog.dogId];
        setMyActiveDogs(tempActiveDogs);
      } else if (item.userKey === 2) {
        let tempActiveDogs = partnerActiveDogs;
        tempActiveDogs[idx] = [activeDog, item.dog.dogId];
        setPartnerActiveDogs(tempActiveDogs);
      }
    }, [activeDog]);

    return (
      <DogImgWrapper key={item.dogId}>
        <div
          className={
            activeDog ? "dogProfileCircle" : "dogProfileCircle disabled"
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

  return (
    <CreateAppointmentWrapper>
      <div className="appointmentHeader">산책 요청하기</div>
      <WalkRequest>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"   "}나의 강아지를 선택해주세요.
        </p>
        {userData.dog &&
          userData.dog.map((item, idx) => (
            <DogImages
              dog={item}
              userKey={1}
              key={userData.dog.dogId}
            ></DogImages>
          ))}
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"   "}상대방의 강아지를 선택해주세요.
        </p>
        {partnerData.dog &&
          partnerData.dog.map((item, idx) => (
            <DogImages
              dog={item}
              userKey={2}
              key={partnerData.dog.dogId}
            ></DogImages>
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
