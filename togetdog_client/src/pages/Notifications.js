import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

import axios from "axios";
import { BACKEND_URL, DUMMY_URL } from "../config";
import { NotificationsWrapper } from "../styles/NotificationsEmotion";
import { HeaderWrapper } from "../styles/MainHeaderEmotion";
import UserIcon from "../components/UserIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WalkingWithDog from "../assets/walking_with_dog.png";
import CancelEvent from "../assets/cancel-event.png";

const NotificationsHeader = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <div className="icon-box">
        <div className="header-icon" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon="fa-arrow-left" />
        </div>
      </div>
    </HeaderWrapper>
  );
};

const SingleNotification = (data) => {
  const navigate = useNavigate();

  return (
    <div>
      <UserIcon text={data.item.nickName} idx={data.type}></UserIcon>

      {/* {data.type ? <div>11</div> : <div>2</div>} */}
    </div>
  );
};

const Notifications = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [notifications, setNotifications] = useState([]);
  const [canceled, setCanceled] = useState(false);
  const [meetingCnt, setMeetingCnt] = useState();

  useEffect(() => {
    const getNotifications = async () => {
      await axios
        .get(`${DUMMY_URL}/notify`, {})
        .then((response) => {
          setNotifications([
            ...response.data.notifyInfo.notice,
            ...response.data.notifyInfo.notice,
          ]);
          setCanceled(response.data.notifyInfo.meetingCancel);
          setMeetingCnt(response.data.notifyInfo.meetingCnt);

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getNotifications();
  }, []);

  return (
    <div>
      <NotificationsHeader></NotificationsHeader>
      <NotificationsWrapper>
        <div className="walkRequestWrapper">
          <div className="walkRequest">
            <div className="imgWrapper">
              <img className="walkIcon" src={WalkingWithDog} alt="walkIcon" />
            </div>
            <p>산책 요청 {meetingCnt}개</p>
          </div>
          <div className="toRequests">
            {meetingCnt === 0 ? null : <div className="notiCircle"></div>}
            <FontAwesomeIcon icon="fa-chevron-right" />
          </div>
        </div>
        {canceled ? (
          <div className="cancelWrapper">
            <div className="walkRequest">
              <div className="imgWrapper">
                <img className="walkIcon" src={CancelEvent} alt="walkIcon" />
              </div>
              <p>취소된 산책 약속이 있습니다.</p>
            </div>
            <div className="toRequests">
              <FontAwesomeIcon icon="fa-chevron-right" />
            </div>
          </div>
        ) : null}
        {notifications.map((item, idx) => (
          <SingleNotification
            item={item}
            type={idx}
            key={idx}
          ></SingleNotification>
        ))}
      </NotificationsWrapper>
    </div>
  );
};

export default Notifications;
