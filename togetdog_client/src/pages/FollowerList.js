import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from 'axios';


import { authAtom, userState } from "../recoil";
import { BACKEND_URL } from "../config";
import FollowersList from "../components/FollowersList";
import { 
  ListContainer, 
  ListWrapper } from "../styles/FollowerListEmotion";
import Loading from "../assets/loading.gif"

// 강아지 ID 받아야함
function FollowerList() {

  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userState);


  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // followers arr채우기
  const [followers, setFollowers] = useState([]);
  
  // GET 요청 보내서 팔로워 리스트 받기
  useEffect(() => {
    // 로그인 하지 않은 유저라면 접근하지 못하도록
    if (!auth || !user) {
      navigate('/login');
      return;
    }

    // 로그인한 유저가 url로 바로 접근한다면
    if (!location.state) {
      alert('허용되지 않은 접근입니다.');
      navigate(-1);
      return;
    }
      
    // 정상적인 경로로 접근했다면 
    // navigate로 넘어온 강아지Id 받기
    const dogId = location.state.dogId;
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