import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

import axios from "axios";
import { BACKEND_URL, DUMMY_URL } from "../config";
import { HeaderWrapper } from "../styles/MainHeaderEmotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Notifications = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [notifications, setNotifications] = useState([]);
  const [canceled, setCanceled] = useState(false);
  const meetingCnt = useRef(0);

  useEffect(() => {
    const getNotifications = async () => {
      await axios
        .get(`${DUMMY_URL}/notify`, {})
        .then((response) => {
          setNotifications(response.data.notifyInfo.notice);
          setCanceled(response.data.notifyInfo.meetingCancel);
          meetingCnt.current = response.data.notifyInfo.meetingCnt;
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
      {notifications.map((item) => (
        <p>{item.type}</p>
      ))}
    </div>
  );
};

export default Notifications;
