import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from 'axios';

import { authAtom } from "../recoil";
import { BACKEND_URL } from "../config";
import FollowingsList from "../components/FollowingsList";
import { 
  ListContainer, 
  ListWrapper } from "../styles/FollowerListEmotion";
  import Loading from "../assets/loading.gif"


function FollowingList() {

  const auth = useRecoilValue(authAtom);

  const [isLoading, setIsLoading] = useState(true);
  // navigate로 넘어온 유저Id 받기
  // useEffect에 넣어야할 것 같기도함
  const location = useLocation();
  const userId = location.state.userId;

  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const fetchFollowings = async () => {
      axios
        .get(`${BACKEND_URL}/follow/following?userId=${userId}`, {
          headers: {
            Authorization: auth,
          }
        })
        .then((res) => {
          console.log(res);
          setFollowings(res.data.dogs);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err)
        });
    };

    fetchFollowings();
  }, [userId])

  if (isLoading) {
    return (
      <div className="loading">
        <img src={Loading} alt='loading...'/>
      </div>
    )
  }
  
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