import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { authAtom, userState } from "../recoil";
import { BACKEND_URL } from "../config";
import FollowingsList from "../components/FollowingsList";
import { ListContainer, ListWrapper } from "../styles/FollowerListEmotion";
import Loading from "../assets/loading.gif";

function FollowingList() {
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userState);

  const [isLoading, setIsLoading] = useState(true);
  // navigate로 넘어온 유저Id 받기
  // useEffect에 넣어야할 것 같기도함
  const navigate = useNavigate();
  const location = useLocation();
  const userId = user.userId;

  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    // 로그인 하지 않은 유저라면 접근하지 못하도록
    if (!auth || !user) {
      navigate("/login");
      return;
    }

    // 로그인한 유저가 url로 바로 접근한다면
    if (!location.state) {
      alert("허용되지 않은 접근입니다.");
      navigate(-1);
      return;
    }

    // 정상적인 경로로 접근했다면
    // navigate로 넘어온 userId 받기
    const fetchFollowings = async () => {
      axios
        .get(`${BACKEND_URL}/follow/following?userId=${userId}`, {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => {
          setFollowings(res.data.dogs);
          setIsLoading(false);
        })
        .catch((err) => {});
    };

    fetchFollowings();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={Loading} alt="loading..." />
      </div>
    );
  }

  return (
    <ListContainer>
      <ListWrapper>팔로잉 {followings.length}마리</ListWrapper>
      <ListWrapper>
        <FollowingsList followings={followings} />
      </ListWrapper>
    </ListContainer>
  );
}

export default FollowingList;
