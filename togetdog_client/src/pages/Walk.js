import { useState } from "react";
import {
  WalkListWrapper,
  TabList,
  MeetingWrapper,
  SingleMeetingWrapper,
} from "../styles/WalkEmotion";
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
      return timeStr + " AM";
    } else if (getTime === 12) {
      return timeStr + " PM";
    } else {
      return getTime - 12 + ":" + timeStr.substring(3, 5) + " PM";
    }
  };

  const dayOfWeek = () => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const weekStr = meeting.date.split(" ");
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
      <div className="dogProfileImgWrapper">
        <img
          className="dogProfileImg"
          src={meeting.partnerDogs[0].image}
          alt="dogProfile"
        />
      </div>
    </SingleMeetingWrapper>
  );
};

const MeetingList = ({ menu }) => {
  // api로 받아온 약속 리스트 담기
  const originalMeetings = [
    {
      partnerName: "커피중독자",
      rating: "4.7",
      appointmentId: "12345",
      place: "은행나무공원",
      date: "2023-01-19 12:00",
      myDogs: [
        {
          image:
            "https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg",
          dogName: "뽀삐",
        },
        {
          image: "choco.png",
          dogName: "choco",
        },
        {
          image: "choco.png",
          dogName: "choco",
        },
      ],
      partnerDogs: [
        {
          image:
            "https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110__480.jpg",
          dogName: "뽀삐",
          dogCharacter1: "independence",
          dogCharacter2: "active",
          dogNeutered: "True",
        },
        // {
        //   image: "choco.png",
        //   dogName: "choco",
        //   dogCharacter1: "independence",
        //   dogCharacter2: "active",
        //   dogNeutered: "True",
        // },
        // {
        //   image: "choco.png",
        //   dogName: "choco",
        //   dogCharacter1: "independence",
        //   dogCharacter2: "active",
        //   dogNeutered: "True",
        // },
      ],
      status: "confirmed", // confirmed, sent, received, cancelled, done
      isRated: "False", // True, False
    },
    {
      partnerName: "답이없음",
      rating: "4.7",
      appointmentId: "12345",
      place: "개나리공원",
      date: "2023-01-19 15:00",
      myDogs: [
        {
          image: "choco.png",
          dogName: "우리개",
        },
        {
          image: "choco.png",
          dogName: "우리집개",
        },
        {
          image: "choco.png",
          dogName: "내개",
        },
      ],
      partnerDogs: [
        {
          image:
            "https://mblogthumb-phinf.pstatic.net/20160805_32/zz0507_14703621080076bLSz_JPEG/image_2019898671470361783593.jpg?type=w800",
          dogName: "설이",
          dogCharacter1: "independence",
          dogCharacter2: "active",
          dogNeutered: "True",
        },
        {
          image:
            "https://i.pinimg.com/236x/d7/d7/5b/d7d75b636897d5d256d79b611460f640.jpg",
          dogName: "보리",
          dogCharacter1: "independence",
          dogCharacter2: "active",
          dogNeutered: "True",
        },
        {
          image:
            "https://mblogthumb-phinf.pstatic.net/MjAxNzAyMDhfMjkw/MDAxNDg2NTMxMDEzMTk2.Qzgag3njAg2rm9_uDI9l8_MCDZN_A0w9TcVdlNMQsjkg.bUqo2sYtJdCEPpzHrJUwkv_yT_xwH2fR7rXxb59--NAg.JPEG.fly5885/1_%EA%B7%80%EC%97%AC%EC%9A%B4%EA%B0%95%EC%95%84%EC%A7%80_%284%29.jpg?type=w800",
          dogName: "해피",
          dogCharacter1: "independence",
          dogCharacter2: "active",
          dogNeutered: "True",
        },
      ],
      status: "confirmed", // confirmed, sent, received, cancelled, done
      isRated: "True", // True, False
    },
  ];

  const renderMeetings = () => {
    const meetings = [];

    for (let i = 0; i < originalMeetings.length; i++) {
      // 약속별로 구분하는 조건문 추가
      if (originalMeetings[i].status === "confirmed" && menu === 1) {
        meetings.push(
          <SingleMeeting meeting={originalMeetings[i]}></SingleMeeting>
        );
      } else if (originalMeetings[i].status === "sent" && menu === 2) {
        meetings.push(
          <SingleMeeting meeting={originalMeetings[i]}></SingleMeeting>
        );
      } else if (originalMeetings[i].status === "recieved" && menu === 2) {
        meetings.push(
          <SingleMeeting meeting={originalMeetings[i]}></SingleMeeting>
        );
      } else if (originalMeetings[i].status === "cancelled" && menu === 3) {
        meetings.push(
          <SingleMeeting meeting={originalMeetings[i]}></SingleMeeting>
        );
      } else if (originalMeetings[i].status === "done" && menu === 3) {
        meetings.push(
          <SingleMeeting meeting={originalMeetings[i]}></SingleMeeting>
        );
      }
    }

    return meetings;
  };

  return (
    <MeetingWrapper>
      {/* meetingList 비었을 경우 처리해야함 */}
      <div className="walkList">{renderMeetings()}</div>
    </MeetingWrapper>
  );
};

const MeetingListWrapper = () => {
  const [active, setActive] = useState(1);

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
      <MeetingList menu={active}></MeetingList>
    </WalkListWrapper>
  );
};

const Walk = () => {
  return <MeetingListWrapper />;
};

export default Walk;
