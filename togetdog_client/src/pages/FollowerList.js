import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';


import FollowersList from "../components/FollowersList";
import { 
  ListContainer, 
  ListWrapper } from "../styles/FollowerList";

// 강아지 ID 받아야함
function FollowerList() {

  // navigate로 넘어온 강아지Id 받기
  const location = useLocation();
  const dogId = location.state.dogId;

  // followers arr채우기
  const [followers, setFollowers] = useState([]);

  // GET 요청 보내서 팔로워 리스트 받기
  useEffect(() => {
    const fetchFollowers = async () => {
      const res = await axios.get(`http://i8a807.p.ssafy.io:8081/dummy/follow/follower?dogId=${dogId}`, {})
      setFollowers(res.data.users);
    };
    
    fetchFollowers();
  }, [dogId]);


  return (
    <ListContainer>
      <ListWrapper>
        팔로워 {followers.length}명
      </ListWrapper>
      <ListWrapper>
        <FollowersList followers={followers}/>
      </ListWrapper>
    </ListContainer>
  );
}

export default FollowerList;