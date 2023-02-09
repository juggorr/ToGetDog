import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, userState } from "../recoil";
import { BACKEND_URL, DUMMY_URL } from "../config";
import {
  WalkListWrapper,
  TabList,
  MeetingWrapper,
  SingleMeetingWrapper,
  InfoModal,
} from "../styles/WalkEmotion";
import { SmallCharacterBtn } from "../styles/BtnsEmotion.js";
import { LightColorLongBtn } from "../styles/BtnsEmotion.js";
import { RedColorShortBtn, MainColorShortBtn } from "../styles/BtnsEmotion.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleMeeting = ({ meeting, auth }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const dogNameList = (dogs) => {
    const nameList = [];
    if (dogs) {
      for (let i = 0; i < dogs.length; i++) {
        nameList.push(dogs[i].dogName);
        if (i + 1 !== dogs.length) {
          nameList.push(", ");
        }
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

  const renderDogImg = (dogs) => {
    let result = null;

    if (dogs) {
      if (dogs.length === 1) {
        result = (
          <div className="dogProfileImgWrapper">
            <img
              className="dogProfileImg"
              src={"https://i8a807.p.ssafy.io/image/dog/" + dogs[0].dogProfile}
              alt="dogProfile"
            />
          </div>
        );
      } else if (dogs.length > 1) {
        result = (
          <div className="manyDog">
            <div className="manyDogProfileImgWrapper">
              <img
                className="manyDogProfileImg"
                src={
                  "https://i8a807.p.ssafy.io/image/dog/" + dogs[0].dogProfile
                }
                alt="dogProfile"
              />
            </div>
            <div className="tinyCircle"></div>
            <div className="tinyCircle"></div>
            <div className="manyDogProfileImgWrapper">
              <img
                className="manyDogProfileImg"
                src={
                  "https://i8a807.p.ssafy.io/image/dog/" + dogs[1].dogProfile
                }
                alt="dogProfile"
              />
            </div>
          </div>
        );
      }
    }
    return result;
  };

  const renderCharacter = (dogs) => {
    const characterList = [];
    if (dogs) {
      for (let i = 0; i < dogs.length; i++) {
        const singleCharacter = (
          <SmallCharacterBtn className="characters-box" key={i}>
            <button className="btn orange">{`#${
              dogs[i].dogNeutered ? "중성화" : "중성화 X"
            }`}</button>
            <button className="btn yellow">{`#${
              dogs[i].dogCharacter1 === "obedient" ? "온순함" : "사나움"
            }`}</button>
            <button className="btn yellow">{`#${
              dogs[i].dogCharacter2 === "active" ? "활동적" : "비활동적"
            }`}</button>
          </SmallCharacterBtn>
        );
        characterList.push(singleCharacter);
      }
    }

    return characterList;
  };

  const InformationModal = () => {
    const handleMeeting = async (status) => {
      console.log(status);
      let method = "";
      let url = `${BACKEND_URL}/meeting`;
      if (status === "cancel") {
        method = "put";
        url = url + "/cancel";
      } else if (status === "decline") {
        method = "delete";
      } else if (status === "accept") {
        method = "put";
        url = url + "/accept";
      }
      await axios({
        method: method,
        url: url,
        params: {
          appointmentId: meeting.roomId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      })
        .then(function (response) {
          // console.log(response);
          setModalOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const renderBtns = () => {
      const Btns = [];

      if (meeting.status === "confirmed") {
        Btns.push(
          <RedColorShortBtn onClick={() => handleMeeting("cancel")}>
            약속 취소
          </RedColorShortBtn>
        );
        Btns.push(
          <MainColorShortBtn onClick={() => setModalOpen(false)}>
            확인
          </MainColorShortBtn>
        );
      } else if (meeting.status === "wait") {
        if (meeting.received) {
          Btns.push(
            <RedColorShortBtn onClick={() => handleMeeting("decline")}>
              반려
            </RedColorShortBtn>
          );
          Btns.push(
            <MainColorShortBtn onClick={() => handleMeeting("accept")}>
              수락
            </MainColorShortBtn>
          );
        } else {
          Btns.push(
            <RedColorShortBtn onClick={() => handleMeeting("decline")}>
              요청 취소
            </RedColorShortBtn>
          );
          Btns.push(
            <MainColorShortBtn onClick={() => setModalOpen(false)}>
              확인
            </MainColorShortBtn>
          );
        }
      } else if (meeting.status === "done") {
        Btns.push(
          <MainColorShortBtn onClick={() => setModalOpen(false)}>
            확인
          </MainColorShortBtn>
        );
      } else if (meeting.status === "cancelled") {
        Btns.push(
          <MainColorShortBtn onClick={() => setModalOpen(false)}>
            확인
          </MainColorShortBtn>
        );
      }

      return <div className="btnContainer">{Btns}</div>;
    };

    return (
      <InfoModal>
        <div className="modalOutside" onClick={() => setModalOpen(false)}></div>
        <div className="modalInside">
          <p className="appointmentDate">• {dayOfWeek()}</p>
          <p className="infoText">상대방의 강아지</p>
          <div className="dogWrapper">
            {renderDogImg(meeting.partnerDogs)}
            <div className="dogInfo">
              <div>
                <span className="dogNames">
                  {dogNameList(meeting.partnerDogs)}
                </span>
                <span className="partnerName">
                  <FontAwesomeIcon icon="user"></FontAwesomeIcon>{" "}
                  {meeting.partnerName}
                </span>
              </div>
              <div className="characterWrapper">
                {renderCharacter(meeting.partnerDogs)}
              </div>
            </div>
          </div>
          <p className="infoText">나의 강아지</p>
          <div className="dogWrapper">
            {renderDogImg(meeting.myDogs)}
            <div className="dogInfo">
              <span className="dogNames">{dogNameList(meeting.myDogs)}</span>
            </div>
          </div>
          {renderBtns()}
        </div>
        <div className="modalOutside" onClick={() => setModalOpen(false)}></div>
      </InfoModal>
    );
  };

  return (
    <SingleMeetingWrapper>
      {modalOpen && (
        <InformationModal setModalOpen={setModalOpen} meeting={meeting} />
      )}
      <div className="appointmentContainer" onClick={() => setModalOpen(true)}>
        <div className="singleWrapper">
          <div className="appointmentLine"></div>
          <p className="appointmentDate">• {dayOfWeek()}</p>
          <div className="appointmentWrapper">
            <div className="nameWrapper">
              <span className="dogNames">
                {dogNameList(meeting.partnerDogs)}
              </span>
              <span className="partnerName">
                <FontAwesomeIcon icon="user"></FontAwesomeIcon>{" "}
                {meeting.partnerName}
              </span>
            </div>
            <p className="appointmentDate">장소 : {meeting.place}</p>
          </div>
        </div>
        {renderDogImg(meeting.partnerDogs)}
      </div>
    </SingleMeetingWrapper>
  );
};

const Walk = () => {
  const [user, setUser] = useRecoilState(userState);
  const [active, setActive] = useState(1);
  const [originalMeetings, setOriginalMeetings] = useState([]);
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/meeting`, {
        headers: {
          Authorization: auth,
        },
      })
      .then(function (response) {
        // 데이터 들어오는 형태 확인 필요함
        // userOne이 보낸 사람, userTwo가 받은 사람

        const appointments = [];
        if (response.data.appointment) {
          for (let i = 0; i < response.data.appointment.length; i++) {
            const singleAppointment = {
              status: response.data.appointment[i].status,
              roomId: response.data.appointment[i].roomId,
              place: response.data.appointment[i].place,
              date: response.data.appointment[i].dateTime,
              received: false,
            };
            if (response.data.appointment[i].userOneId === user.userId) {
              singleAppointment.myDogs =
                response.data.appointment[i].userOneDogs;
              singleAppointment.partnerDogs =
                response.data.appointment[i].userTwoDogs;
              singleAppointment.partnerName =
                response.data.appointment[i].userTwoNickname;
              singleAppointment.rated =
                response.data.appointment[i].userOneRated;
            } else {
              singleAppointment.partnerDogs =
                response.data.appointment[i].userOneDogs;
              singleAppointment.myDogs =
                response.data.appointment[i].userTwoDogs;
              singleAppointment.partnerName =
                response.data.appointment[i].userOneNickname;
              singleAppointment.rated =
                response.data.appointment[i].userTwoRated;
              singleAppointment.received = true;
            }
            appointments.push(singleAppointment);
          }
        }
        setOriginalMeetings(appointments);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [active]);

  const renderMeetings = () => {
    const meetings = [];

    for (let i = 0; i < originalMeetings.length; i++) {
      // 약속별로 구분하는 조건문 추가
      const singleMeet = (
        <SingleMeeting
          key={originalMeetings[i].roomId}
          meeting={originalMeetings[i]}
          auth={auth}
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

export default Walk;
