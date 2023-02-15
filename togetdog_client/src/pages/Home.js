import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
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
  NoFriendsWrapper,
} from "../styles/HomeEmotion";
import Banner1 from "../assets/banner1.svg";
import Banner2 from "../assets/banner2.svg";
import Banner3 from "../assets/banner3.svg";
import Banner4 from "../assets/banner4.svg";
import Banner5 from "../assets/banner5.svg";
import Banner6 from "../assets/banner6.svg";
import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";
import Loading from "../assets/loading.gif";
import { useInView } from "react-intersection-observer";

const SingleBoard = ({ board }) => {
  const navigate = useNavigate();

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
const BoardList = (boardList) => {
  let tempBoardList = [];

  if (boardList.length) {
    for (let i = 0; i < boardList.length; i++) {
      tempBoardList.push(
        <SingleBoard key={i} board={boardList[i]}></SingleBoard>
      );
    }
  } else {
    tempBoardList.push(
      <NoFriendsWrapper key={0}>조회할 게시글이 없어요.</NoFriendsWrapper>
    );
  }

  return tempBoardList;
};

const RecommendWrapper = (dogs) => {
  let tempList = [];

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
  const [hasNextPage, setHasNextPage] = useState(true);
  const [ref, inView] = useInView();

  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [tinyLoading, setTinyLoading] = useState(true);

  const pageNo = useRef(1);
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

  const getBoardList = useCallback(async () => {
    if (!auth || !localStorage.getItem("recoil-persist")) {
      navigate("/login");
      return;
    }
    if (!boardList) {
      setLoading(true);
    } else {
      setTinyLoading(true);
    }
    await axios
      .get(`${BACKEND_URL}/home`, {
        params: {
          pageNo: pageNo.current,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        // console.log(pageNo.current);
        // console.log(response.data.boardList);
        setBoardList((boardList) => [...boardList, ...response.data.boardList]);
        setLoading(false);
        setTinyLoading(false);
        setHasNextPage(response.data.boardList.length === 9);
        if (response.data.boardList.length) {
          pageNo.current += 1;
        }
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
  });

  const getFriendList = async () => {
    await axios
      .get(`${BACKEND_URL}/meeting/all`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.dogs);
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

  useEffect(() => {
    if (inView && hasNextPage) {
      getBoardList();
    }
  }, [inView]);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={Loading} alt="loading..."></img>
      </div>
    );
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
      {recommendList.length ? (
        <RecommendBoxWrapper>
          <div className="recommend-txt-box">
            <FontAwesomeIcon icon="fa-solid fa-paw" />
            <span className="recommend-txt">추천 댕댕이 친구들</span>
          </div>
          <div className="recommendBox">{RecommendWrapper(recommendList)}</div>
        </RecommendBoxWrapper>
      ) : (
        <RecommendBoxWrapper>
          <div className="recommend-txt-box">
            <FontAwesomeIcon icon="fa-solid fa-paw" />
            <span className="recommend-txt">추천 댕댕이 친구들</span>
          </div>
          <p className="noFriends">팔로우할 만한 강아지가 없어요.</p>
        </RecommendBoxWrapper>
      )}
      {BoardList(boardList)}
      {tinyLoading ? (
        <div className="tinyLoading">
          <img src={Loading} alt="loading..."></img>
        </div>
      ) : null}
      <div ref={ref} className="scrollHandler" />
    </HomeWrapper>
  );
};

export default Home;
