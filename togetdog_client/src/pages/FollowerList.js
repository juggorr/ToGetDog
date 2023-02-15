import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from 'axios';


import { authAtom } from "../recoil";
import { BACKEND_URL } from "../config";
import FollowersList from "../components/FollowersList";
import { 
  ListContainer, 
  ListWrapper } from "../styles/FollowerListEmotion";
import Loading from "../assets/loading.gif"

// 강아지 ID 받아야함
function FollowerList() {

  const auth = useRecoilValue(authAtom);

  const [isLoading, setIsLoading] = useState(true);
  // navigate로 넘어온 강아지Id 받기
  const location = useLocation();
  const dogId = location.state.dogId;

  // followers arr채우기
  const [followers, setFollowers] = useState([]);

  // GET 요청 보내서 팔로워 리스트 받기
  useEffect(() => {
    const fetchFollowers = async () => {
      axios
        .get(`${BACKEND_URL}/follow/follower?dogId=${dogId}`, {
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.users);
          setFollowers(res.data.users);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err)
        });
    };
    
    fetchFollowers();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={Loading} alt='loading...'/>
      </div>
    )
  }

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