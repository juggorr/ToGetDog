import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { BACKEND_URL, DUMMY_URL } from "../config";
import {
  WalkListWrapper,
  TabList,
  MeetingWrapper,
  SingleMeetingWrapper,
} from "../styles/WalkEmotion";
import { LightColorLongBtn } from "../styles/BtnsEmotion.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleMeeting = ({ meeting }) => {
  const dogNameList = () => {
    const nameList = [];
    for (let i = 0; i < meeting.partnerDogs.length; i++) {
      nameList.push(meeting.partnerDogs[i].dogName);
      if (i + 1 !== meeting.partnerDogs.length) {
        nameList.push(", ");
      }
    }
    return nameList;
  };

  const convertHours = (timeStr) => {
    const getTime = parseInt(timeStr.substring(0, 2));
    if (getTime === 0) {
      return "12:" + timeStr.substring(3, 5) + " AM";
    } else if (getTime < 12) {
      return timeStr.substring(0, 5) + " AM";
    } else if (getTime === 12) {
      return timeStr.substring(0, 5) + " PM";
    } else {
      return getTime - 12 + ":" + timeStr.substring(3, 5) + " PM";
    }
  };

  const dayOfWeek = () => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const weekStr = meeting.date.split("T");
    const dayOfTheWeek = week[new Date(weekStr[0]).getDay()];
    weekStr[0] = weekStr[0].replaceAll("-", "/");

    const dateResult =
      "   " +
      weekStr[0] +
      " (" +
      dayOfTheWeek +
      ")     " +
      convertHours(weekStr[1]);
    return dateResult;
  };

  return (
    <SingleMeetingWrapper>
      <div className="singleWrapper">
        <div className="appointmentLine"></div>
        <p className="appointmentDate">• {dayOfWeek()}</p>
        <div className="appointmentWrapper">
          <div className="nameWrapper">
            <span className="dogNames">{dogNameList()}</span>
            <span className="partnerName">
              <FontAwesomeIcon icon="user"></FontAwesomeIcon>{" "}
              {meeting.partnerName}
            </span>
          </div>
          <p className="appointmentDate">장소 : {meeting.place}</p>
        </div>
      </div>
      {meeting.partnerDogs.length === 1 ? (
        <div className="dogProfileImgWrapper">
          <img
            className="dogProfileImg"
            src={meeting.partnerDogs[0].image}
            alt="dogProfile"
          />
        </div>
      ) : (
        <div className="manyDog">
          <div className="manyDogProfileImgWrapper">
            <img
              className="manyDogProfileImg"
              src={meeting.partnerDogs[0].image}
              alt="dogProfile"
            />
          </div>
          <div className="tinyCircle"></div>
          <div className="tinyCircle"></div>
          <div className="manyDogProfileImgWrapper">
            <img
              className="manyDogProfileImg"
              src={meeting.partnerDogs[1].image}
              alt="dogProfile"
            />
          </div>
        </div>
      )}
    </SingleMeetingWrapper>
  );
};

const MeetingListWrapper = () => {
  const [user, setUser] = useRecoilState(userState);
  const [active, setActive] = useState(1);
  const [originalMeetings, setOriginalMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${DUMMY_URL}/meeting?userId=${user.userId}`;
    axios
      .get(url)
      .then(function (response) {
        // 데이터 들어오는 형태 확인 필요함
        setOriginalMeetings(response.data.meetingList);
      })
      .catch(function (error) {});
  }, [active]);

  const renderMeetings = () => {
    const meetings = [];

    for (let i = 0; i < originalMeetings.length; i++) {
      // 약속별로 구분하는 조건문 추가
      const singleMeet = (
        <SingleMeeting
          key={originalMeetings[i].appointmentId}
          meeting={originalMeetings[i]}
        ></SingleMeeting>
      );
      if (originalMeetings[i].status === "confirmed" && active === 1) {
        meetings.push(singleMeet);
      } else if (originalMeetings[i].status === "wait" && active === 2) {
        meetings.push(singleMeet);
      } else if (originalMeetings[i].status === "cancelled" && active === 3) {
        meetings.push(singleMeet);
      } else if (originalMeetings[i].status === "done" && active === 3) {
        meetings.push(singleMeet);
      }
    }
    return meetings;
  };

  return (
    <WalkListWrapper>
      <TabList>
        <div
          className={
            active === 1 ? "activeTab singleTab" : "disabledTab singleTab"
          }
          onClick={() => setActive(1)}
        >
          예정된 약속
        </div>
        <div
          className={
            active === 2 ? "activeTab singleTab" : "disabledTab singleTab"
          }
          onClick={() => setActive(2)}
        >
          대기 중 요청
        </div>
        <div
          className={
            active === 3 ? "activeTab singleTab" : "disabledTab singleTab"
          }
          onClick={() => setActive(3)}
        >
          종료된 약속
        </div>
      </TabList>
      <MeetingWrapper>
        <div className="walkList">
          {renderMeetings()}
          {renderMeetings().length === 0 && active === 1 ? (
            <div className="noMeeting">
              <div className="noMeetingTextWrapper">
                <p className="noMeetingText">예정된 산책 약속이 없어요.</p>
                <p className="noMeetingText">산책 친구를 찾아보세요!</p>
              </div>
              <LightColorLongBtn onClick={() => navigate("/recommend")}>
                새 친구 찾기
              </LightColorLongBtn>
            </div>
          ) : null}
          <div
            className="recommendBtn"
            onClick={() => {
              navigate("/recommend");
            }}
          >
            <FontAwesomeIcon icon="fa-plus"></FontAwesomeIcon>
          </div>
        </div>
      </MeetingWrapper>
    </WalkListWrapper>
  );
};

const Walk = () => {
  return <MeetingListWrapper />;
};

export default Walk;
