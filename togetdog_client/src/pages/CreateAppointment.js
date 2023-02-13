import { useEffect, useState, forwardRef, useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom, userState } from "../recoil";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import { BACKEND_URL } from "../config";
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

  const auth = useRecoilValue(authAtom);
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation();
  const partnerId = location.state.partnerId;

  // 다른 파일에서 useNavigate 쓸때 이런식으로
  // const handleClick = (e) => {
  //     const navigate = useNavigate();
  //     navigate('/edit', { partnerId: e.target.value });
  // }

  const [userData, setUserData] = useState({});
  const [partnerData, setPartnerData] = useState({});
  const [myActiveDogs, setMyActiveDogs] = useState([]);
  const [partnerActiveDogs, setPartnerActiveDogs] = useState([]);
  const [requestError, setRequestError] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [dateResult, setDateResult] = useState(new Date());

  const placeInput = useRef(null);

  const myDogError = useRef(false);
  const partnerDogError = useRef(false);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user/includesDog/${user.userId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then(function (response) {
        setUserData(response.data.user);
      })
      .catch(function (error) {
        // 오류발생시 실행
      });

    axios
      .get(`${BACKEND_URL}/user/includesDog/${partnerId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then(function (response) {
        setPartnerData(response.data.user);
      })
      .catch(function (error) {
        // 오류발생시 실행
      });
  }, []);

  useEffect(() => {
    let tempResult = new Date(startDate);
    tempResult = setHours(tempResult, startTime.getHours());
    tempResult = setMinutes(tempResult, startTime.getMinutes());
    setDateResult(tempResult);
  }, [startDate, startTime]);

  const DogImages = (item) => {
    const [activeDog, setActiveDog] = useState(true);

    // 처음 강아지 상태 배열 만드는 부분
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

    // 클릭하면 상태 변경하는 코드
    useEffect(() => {
      if (item.userKey === 1) {
        let tempActiveDogs = myActiveDogs;
        let dogError = true;
        tempActiveDogs[item.idx] = [activeDog, item.dog.dogId];
        setMyActiveDogs(tempActiveDogs);

        for (let i = 0; i < tempActiveDogs.length; i++) {
          if (tempActiveDogs[i][0] === true) {
            dogError = false;
          }
        }
        // setMyDogError(dogError);
        myDogError.current = dogError;
      } else if (item.userKey === 2) {
        let tempActiveDogs = partnerActiveDogs;
        let dogError = true;
        tempActiveDogs[item.idx] = [activeDog, item.dog.dogId];
        setPartnerActiveDogs(tempActiveDogs);
        for (let i = 0; i < tempActiveDogs.length; i++) {
          if (tempActiveDogs[i][0] === true) {
            dogError = false;
          }
        }
        // setMyDogError(dogError);
        partnerDogError.current = dogError;
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
            src={`https://i8a807.p.ssafy.io/image/dog/` + item.dog.dogProfile}
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
      <TimeWrapper className="example-custom-input" ref={ref} onClick={onClick}>
        <div className="dateDiv">{value}</div>
        <div className="calendarDiv">
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
    placeInput.current = e.target.value;
  };

  const isValid = () => {
    if (myDogError.current === true || partnerDogError.current === true) {
      setRequestError(true);
    } else if (!placeInput.current) {
      setRequestError(true);
    } else {
      setRequestError(false);
      const myDogList = [];
      const partnerDogList = [];
      for (let i = 0; i < myActiveDogs.length; i++) {
        if (myActiveDogs[i][0] === true) {
          myDogList.push(myActiveDogs[i][1]);
        }
      }
      for (let i = 0; i < partnerActiveDogs.length; i++) {
        if (partnerActiveDogs[i][0] === true) {
          partnerDogList.push(partnerActiveDogs[i][1]);
        }
      }
      handleCreateAppointment(myDogList, partnerDogList);
    }
  };

  const handleCreateAppointment = async (myDogList, partnerDogList) => {
    await axios
      .post(
        `${BACKEND_URL}/meeting`,
        {
          dateTime: dateResult,
          sentUserId: user.userId,
          sentDogs: myDogList,
          senderRate: false,
          receivedUserId: partnerId,
          receivedDogs: partnerDogList,
          receiverRate: false,
          place: placeInput.current,
          status: "wait",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        }
      )
      .then((resp) => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CreateAppointmentWrapper>
      <div className="appointmentHeader">산책 요청하기</div>
      <WalkRequest>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-clock" />
          {"   "}언제 산책할까요?
        </p>
        <DateModalWrapper>
          <DateModal type="Date"></DateModal>
          <DateModal type="Time"></DateModal>
        </DateModalWrapper>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"   "}나의 강아지를 선택해주세요.
        </p>
        <div className="dogImageWrapper">
          {userData.dogs &&
            userData.dogs.map((item, idx) => (
              <DogImages
                dog={item}
                userKey={1}
                idx={idx}
                key={item.dogId}
              ></DogImages>
            ))}
        </div>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"   "}상대방의 강아지를 선택해주세요.
        </p>
        <div className="dogImageWrapper">
          {partnerData.dogs &&
            partnerData.dogs.map((item, idx) => (
              <DogImages
                dog={item}
                userKey={2}
                idx={idx}
                key={item.dogId}
              ></DogImages>
            ))}
        </div>

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
        {requestError ? (
          <p className="warningStr">입력값이 없는 항목이 있습니다.</p>
        ) : null}
      </WalkRequest>
      <div className="btnWrapper">
        <MainColorShortBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          취소하기
        </MainColorShortBtn>
        <MainColorShortBtn onClick={isValid}>요청하기</MainColorShortBtn>
      </div>
    </CreateAppointmentWrapper>
  );
};

export default CreateAppointment;
