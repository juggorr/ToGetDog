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
  HomeWrapper,
  RecommendBoxWrapper,
  SingleBoardWrapper,
  DogInfoWrapper,
  DogImgWrapper,
} from "../styles/HomeEmotion";
import Banner1 from "../assets/banner1.svg";
import Banner2 from "../assets/banner2.svg";
import Banner3 from "../assets/banner3.svg";
import Banner4 from "../assets/banner4.svg";
import Banner5 from "../assets/banner5.svg";
import Banner6 from "../assets/banner6.svg";
import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";

const BoardList = (boardList) => {
  const SingleBoard = ({ board }) => {
    const navigate = useNavigate();
    console.log("게시물 렌더링됨");
    return (
      <SingleBoardWrapper>
        <div className="contentLine"></div>
        <div className="profileWrapper">
          <DogImgWrapper>
            <div className="dogProfileCircle">
              <img
                className="dogProfileImg"
                src={
                  "https://i8a807.p.ssafy.io/image/dog/" + board.dog.dogProfile
                }
                alt={board.dog.dogName}
              />
            </div>
          </DogImgWrapper>
          <DogInfoWrapper>
            <div className="dogInfo">
              <div className="dogNameWrapper">{board.dog.dogName}</div>
              <div className="dogType">
                {board.dog.dogType} /{" "}
                {board.dog.dogAge < 12
                  ? board.dog.dogAge
                  : Math.floor(board.dog.dogAge / 12)}
                {board.dog.dogAge < 12 ? "개월" : "살"}
                <div className="genderWrapper">
                  <img
                    src={board.dog.dogGender === "male" ? Boy : Girl}
                    alt="gender"
                    className="genderImg"
                  />
                </div>
              </div>
            </div>
          </DogInfoWrapper>
        </div>
        <div
          className="contentWrapper"
          onClick={() => {
            navigate(`/board/${board.boardId}`);
          }}
        >
          <div className="imgWrapper">
            <img
              className="contentImg"
              src={"https://i8a807.p.ssafy.io/image/board/" + board.image}
              alt="content_img"
            />
          </div>
        </div>
        <div className="contentText">{board.content}</div>
      </SingleBoardWrapper>
    );
  };
  let tempBoardList = [];

  if (boardList) {
    for (let i = 0; i < boardList.length; i++) {
      tempBoardList.push(
        <SingleBoard key={i} board={boardList[i]}></SingleBoard>
      );
    }
  }

  return tempBoardList;
};

const RecommendWrapper = (dogs) => {
  let tempList = [];
  console.log("친구 목록 렌더링");

  if (dogs) {
    for (let i = 0; i < dogs.length; i++) {
      tempList.push(<DogRecommend dog={dogs[i]} key={i}></DogRecommend>);
    }
  }

  return tempList;
};

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  const [recommendList, setRecommendList] = useState([]);
  const [boardList, setBoardList] = useState([]);

  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  const pageNo = 1;
  const backgroundImages = [
    Banner1,
    Banner2,
    Banner3,
    Banner4,
    Banner5,
    Banner6,
  ];

  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const backgroundImg = backgroundImages[randomIndex];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuth(null);
    console.log("로그아웃이 정상적으로 처리되었습니다.");
    navigate("/login");
  };

  const getBoardList = async () => {
    await axios
      .get(`${BACKEND_URL}/home`, {
        params: {
          pageNo: pageNo,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setBoardList([...boardList, ...response.data.boardList]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          navigate("/*");
        } else if (error.response.status === 401) {
          alert("토큰이 만료되어 자동 로그아웃되었습니다.");
          handleLogout();
        }
      });
  };

  const getFriendList = async () => {
    await axios
      .get(`${BACKEND_URL}/meeting/all`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setRecommendList(response.data.dogs);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          navigate("/*");
        } else if (error.response.status === 401) {
          alert("토큰이 만료되어 자동 로그아웃되었습니다.");
          handleLogout();
        }
      });
  };

  useEffect(() => {
    getBoardList();
    getFriendList();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <HomeWrapper>
      <HomeContainer>
        <div className="container">
          <img
            className="backgroundImg"
            src={backgroundImg}
            alt="banner_img"
          ></img>
          <div className="typedOutContainer">
            <div className="typed-out">안녕하세요, {user.nickName}님!</div>
          </div>
          <div className="btnContainer">
            <button className="walk-btn" onClick={() => navigate("/recommend")}>
              산책 친구 찾기
            </button>
          </div>
        </div>
      </HomeContainer>
      <RecommendBoxWrapper>
        <div className="recommend-txt-box">
          <FontAwesomeIcon icon="fa-solid fa-paw" />
          <span className="recommend-txt">추천 댕댕이 친구들</span>
        </div>
        <div className="recommendBox">{RecommendWrapper(recommendList)}</div>
      </RecommendBoxWrapper>
      {BoardList(boardList)}
    </HomeWrapper>
  );
};

export default Home;
