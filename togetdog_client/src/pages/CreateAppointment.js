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
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

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
  const [dateResult, setDateResult] = useState(new Date());

  const [placeInput, setPlaceInput] = useState();

  const myDogError = useRef(false);
  const partnerDogError = useRef(false);

  useEffect(() => {
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
    //   })
    //   .catch(function (error) {
    //     // 오류발생시 실행
    //   });

    setPartnerData({
      userId: 2,
      nickName: "뽀삐엄마",
      userAge: 28,
      userGender: null,
      address: "서울시 동작구 흑석동",
      regionCode: "11455",
      social: "naver",
      rating: 3.41,
      dog: [
        {
          dogId: 244,
          dogName: "보리",
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
            "https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174-1024x739.jpg",
        },
        {
          dogId: 234,
          dogName: "솜솜",
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
            "https://media.istockphoto.com/id/1007262234/ko/%EC%82%AC%EC%A7%84/%EA%B7%80%EC%97%AC%EC%9A%B4-%ED%9D%B0%EC%83%89-pomeranian-%EA%B0%95%EC%95%84%EC%A7%80-%EC%8A%A4-%ED%94%BC-%EC%B8%A0.jpg?b=1&s=612x612&w=0&k=20&c=itpd3ey8UxyKIh2WJ2DqdYWO7sBxH1aoXSTkyrhz2T0=",
        },
      ],
      followCnt: 0,
      follow: false,
    });
    // axios
    //   .get(`${DUMMY_URL}/user/includesDog/${partnerId}`, {})
    //   .then(function (response) {
    //     setPartnerData(response.data);
    //   })
    //   .catch(function (error) {
    //     // 오류발생시 실행
    //   });
  }, [userId, partnerId]);

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

  const isValid = (e) => {
    if (myDogError.current === true || partnerDogError.current === true) {
      console.log("강아지가 없어용");
    } else if (placeInput === "") {
      console.log("장소가 없어요");
    } else {
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
      .post(`${DUMMY_URL}/meeting`, {
        userId: userData.userId,
        myDogs: myDogList,
        partnerDogs: partnerDogList,
        date: dateResult,
        place: placeInput,
      })
      .then((resp) => {
        console.log("요청 성공");
        navigate(-1);
      })
      .catch((err) => {
        console.log("요청 실패");
      });
  };

  return (
    <CreateAppointmentWrapper>
      <div className="appointmentHeader">산책 요청하기</div>
      <WalkRequest>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-user-group" />
          {"   "}나의 강아지를 선택해주세요.
        </p>
        <div className="dogImageWrapper">
          {userData.dog &&
            userData.dog.map((item, idx) => (
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
          {partnerData.dog &&
            partnerData.dog.map((item, idx) => (
              <DogImages
                dog={item}
                userKey={2}
                idx={idx}
                key={item.dogId}
              ></DogImages>
            ))}
        </div>
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
        <MainColorShortBtn onClick={isValid}>요청하기</MainColorShortBtn>
      </div>
    </CreateAppointmentWrapper>
  );
};

export default CreateAppointment;
