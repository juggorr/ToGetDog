import { useEffect, useState, useRef } from "react";
import axios from "axios";

// 달력 용도로 사용할 DatePicker
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

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

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    axios
      .get(`${DUMMY_URL}/user/includesDog/${userId}`, {})
      .then(function (response) {
        setUserData(response.data);
      })
      .catch(function (error) {
        // 오류발생시 실행
      });

    axios
      .get(`${DUMMY_URL}/user/includesDog/${partnerId}`, {})
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

  const DateModal = () => {
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        locale={ko}
        dateFormat="yyyy/MM/dd hh:mm"
        minDate={new Date()}
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
      />
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
        <DateModal></DateModal>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-location-dot" />
          {"   "}어디서 산책할까요?
        </p>
      </WalkRequest>
    </CreateAppointmentWrapper>
  );
};

export default CreateAppointment;
