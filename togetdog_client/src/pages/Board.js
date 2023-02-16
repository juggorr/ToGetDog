import { useEffect, useState } from "react";
import { BoardContainer, CommentContainer } from "../styles/BoardEmotion";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, userState } from "../recoil";
import { useLocation, useNavigate } from "react-router";
import { BACKEND_URL } from "../config";
import axios from "axios";
import BoardBox from "../components/BoardBox";
import CommentBox from "../components/CommentBox";
import Loading from "../assets/loading.gif";

const Board = () => {
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const location = useLocation();
  const boardId = location.pathname.split("/").reverse()[0];

  const [boardData, setBoardData] = useState();
  const [dogData, setDogData] = useState();

  const [likeStatus, setLikeStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuth(null);
    console.log("로그아웃이 정상적으로 처리되었습니다.");
    navigate("/login");
  };

  useEffect(() => {
    if (!auth || !localStorage.getItem("recoil-persist")) {
      navigate("/login");
      return;
    }

    axios
      .get(`${BACKEND_URL}/board/${boardId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        setBoardData(resp.data.board);
        setDogData(resp.data.board.dog);
        setLikeStatus(resp.data.board.liked);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 500) {
          navigate("/*");
          console.log("존재하지 않는 게시물입니다.");
        } else if (err.response.status === 401) {
          alert("자동 로그아웃되었습니다.");
          handleLogout();
        }
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={Loading} alt="loading..." />
      </div>
    );
  }

  return (
    <>
      <BoardContainer>
        <BoardBox
          boardData={boardData}
          dogData={dogData}
          likeStatus={likeStatus}
          setLikeStatus={setLikeStatus}
        />
      </BoardContainer>
      <CommentContainer>
        <CommentBox boardData={boardData} setBoardData={setBoardData} />
      </CommentContainer>
    </>
  );
};

export default Board;
