import { useEffect, useState, forwardRef, useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

// 달력 용도로 사용할 DatePicker
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";

import { BACKEND_URL, DUMMY_URL, LOCAL_SERVER } from "../config";
import {
  CreateAppointmentWrapper,
  WalkRequest,
  DogImgWrapper,
  TimeWrapper,
  DatePickerWrapper,
  DateModalWrapper,
  DayWrapper,
} from "../styles/CreateAppointmentEmotion";
import { MainColorShortBtn } from "../styles/BtnsEmotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateAppointment = () => {
  const navigate = useNavigate();
  // 임시 아이디값, 나중에 바꿔줘야함
  const userId = 1;
  const partnerId = 1;
  // const [user, setUser] = useRecoilState(userState);
  // const { partnerId } = useLocation();

  // 다른 파일에서 useNavigate 쓸때 이런식으로
  // const handleClick = (e) => {
  //     const navigate = useNavigate();
  //     navigate('/edit', { partnerId: e.target.value });
  // }

  const [userData, setUserData] = useState({});
  const [partnerData, setPartnerData] = useState({});
  const [myActiveDogs, setMyActiveDogs] = useState([]);
  const [partnerActiveDogs, setPartnerActiveDogs] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [placeInput, setPlaceInput] = useState();

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

  const DateModal = ({ type }) => {
    const handleCalendarOpen = () => {
      document.addEventListener(
        "touchstart",
        (event) => {
          event.stopPropagation();
        },
        true
      );
    };

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
      <TimeWrapper className="example-custom-input" ref={ref}>
        <div className="dateDiv">{value}</div>
        <div className="calendarDiv" onClick={onClick}>
          <FontAwesomeIcon
            icon={type === "Date" ? "fa-calendar" : "fa-clock"}
          />
        </div>
      </TimeWrapper>
    ));

    const filterPassedTime = (time) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);

      if (currentDate.getTime() < startDate.getTime()) {
        return true;
      } else {
        return currentDate.getTime() < selectedDate.getTime();
      }
    };

    const renderDayContents = (day, date) => {
      return <DayWrapper>{getDate(date)}</DayWrapper>;
    };

    return type === "Date" ? (
      <DatePicker
        withPortal
        selected={startDate}
        shouldCloseOnSelect={false}
        onChange={(date) => setStartDate(date)}
        locale={ko}
        dateFormat="yyyy/MM/dd"
        minDate={new Date()}
        customInput={<CustomInput />}
        renderDayContents={renderDayContents}
        onCalendarOpen={handleCalendarOpen}
        renderCustomHeader={({
          date,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          decreaseMonth,
          increaseMonth,
        }) => (
          <DatePickerWrapper>
            <div
              className="btn_month btn_month-prev"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <FontAwesomeIcon icon="fa-chevron-left" />
            </div>
            <div className="calendarHeader">
              {getYear(date)}년 {getMonth(date) + 1}월
            </div>
            <div
              className="btn_month btn_month-next"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <FontAwesomeIcon icon="fa-chevron-right" />
            </div>
          </DatePickerWrapper>
        )}
      ></DatePicker>
    ) : (
      <DatePicker
        withPortal
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        showTimeSelect
        showTimeSelectOnly
        customInput={<CustomInput />}
        timeIntervals={30}
        timeCaption="시간"
        filterTime={filterPassedTime}
        dateFormat="h:mm aa"
      />
    );
  };

  const onChangeInput = (e) => {
    setPlaceInput(e.target.value);
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
            <DogImages dog={item} userKey={1} key={item.dogId}></DogImages>
          ))}
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"   "}상대방의 강아지를 선택해주세요.
        </p>
        {partnerData.dog &&
          partnerData.dog.map((item, idx) => (
            <DogImages dog={item} userKey={2} key={item.dogId}></DogImages>
          ))}
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-clock" />
          {"   "}언제 산책할까요?
        </p>
        <DateModalWrapper>
          <DateModal type="Date"></DateModal>
          <DateModal type="Time"></DateModal>
        </DateModalWrapper>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-location-dot" />
          {"   "}어디서 산책할까요?
        </p>
        <div className="inputWrapper">
          <input
            onChange={onChangeInput}
            className="textInput"
            placeholder="장소를 입력해주세요."
          />
        </div>
      </WalkRequest>
      <div className="btnWrapper">
        <MainColorShortBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          취소하기
        </MainColorShortBtn>
        <MainColorShortBtn>요청하기</MainColorShortBtn>
      </div>
    </CreateAppointmentWrapper>
  );
};

export default CreateAppointment;
