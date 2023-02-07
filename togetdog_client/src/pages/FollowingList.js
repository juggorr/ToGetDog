import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

import FollowingsList from "../components/FollowingsList";
import { 
  ListContainer, 
  ListWrapper } from "../styles/FollowerListEmotion";



function FollowingList() {

  // navigate로 넘어온 유저Id 받기
  // useEffect에 넣어야할 것 같기도함
  const location = useLocation();
  const userId = location.state.userId;

  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const fetchFollowings = async () => {
      const res = await axios.get(`http://i8a807.p.ssafy.io:8081/dummy/follow/following?userId=${userId}`)
      setFollowings(res.data.dogs)
    };

    fetchFollowings();
  }, [userId])

  
  return(
    <ListContainer>
      <ListWrapper>
        팔로잉 {followings.length}마리
      </ListWrapper>
      <ListWrapper>
        <FollowingsList followings={followings} />
      </ListWrapper>
    </ListContainer>
  );
}

export default FollowingList;