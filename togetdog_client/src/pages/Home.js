import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import DogRecommend from "../components/DogRecommend";
import UserFollow from "../components/UserFollow";
import { BACKEND_URL } from "../config";
import { authAtom, userState } from "../recoil";
import {
  HomeContainer,
  HomeWelcomeBox,
  RecommendBox,
} from "../styles/HomeEmotion";

const Home = () => {
  const [user, setUser] = useRecoilState(userState);

  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuth(null);
    console.log("로그아웃이 정상적으로 처리되었습니다.");
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/home`, {
        params: {
          pageNo: 1,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        console.log("추천 친구를 불러왔습니다.");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log("추천 친구 불러오기 실패");
        if (err.response.status === 404) {
          navigate("/*");
        } else if (err.response.status === 401) {
          alert("토큰이 만료되어 자동 로그아웃되었습니다.");
          handleLogout();
        }
      });
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <HomeContainer>
        <div className="container">
          <div className="typed-out">안녕하세요 {user.nickName}님</div>
        </div>
        <button className="walk-btn" onClick={() => navigate("/recommend")}>
          산책 친구 찾기
        </button>
        <HomeWelcomeBox src="https://image.utoimage.com/preview/cp872722/2021/08/202108022949_500.jpg" />
        <div className="recommend-txt-box">
          <FontAwesomeIcon icon="fa-solid fa-paw" />
          <span className="recommend-txt">추천 댕댕이 친구들</span>
        </div>
        <RecommendBox>
          <DogRecommend />
          <DogRecommend />
          <DogRecommend />
          <DogRecommend />
          <DogRecommend />
          <DogRecommend />
          <DogRecommend />
          <DogRecommend />
        </RecommendBox>
      </HomeContainer>
    </>
  );
};

export default Home;
