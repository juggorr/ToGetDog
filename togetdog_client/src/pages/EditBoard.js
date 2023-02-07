import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, userState } from "../recoil";
import axios from "axios";
import {
  CreateBoardWrapper,
  BoardContentWrapper,
  ContentImgWrapper,
} from "../styles/NewEmotion";
import { MainColorLongBtn, MainColorShortBtn } from "../styles/BtnsEmotion";

import { BACKEND_URL, DUMMY_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentEditImg } from "../styles/BoardEmotion";

const EditBoard = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);

  const [user, setUser] = useRecoilState(userState);

  const [boardData, setBoardData] = useState();
  const [dogId, setDogId] = useState();
  const [content, setContent] = useState();
  const [contentErrorMsg, setContentErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(true);

  const location = useLocation();
  const boardId = location.pathname.split("/").reverse()[0];

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
        setContent(resp.data.board.content);
        setDogId(resp.data.board.dog.dogId);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          alert("토큰이 만료되어 자동 로그아웃되었습니다.");
          handleLogout();
        }
      });
  }, []);

  const onClickEdit = () => {
    if (!content) {
      setContentErrorMsg("* 내용 본문은 반드시 1글자 이상이어야 합니다.");
      return;
    }
    console.log(content);
    axios
      .put(
        `${BACKEND_URL}/board?boardId=${boardId}`,
        { content },
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        console.log("게시물 수정이 완료되었습니다.");
        alert("게시물 수정이 완료되었습니다.");
        navigate(`/board/${boardId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
    if (e.target.value) setContentErrorMsg("");
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <CreateBoardWrapper>
      <div className="boardHeader">게시글 수정</div>
      <BoardContentWrapper>
        <div className="flex space-around photo-desc">
          <div className="queryStr">
            <FontAwesomeIcon icon="fa-image" />
            {"  "}사진
          </div>
          <div className="edit-info">
            <span className="red-dot">*</span>사진은 수정할 수 없습니다.
          </div>
        </div>
        <ContentImgWrapper>
          <ContentEditImg
            src={`https://i8a807.p.ssafy.io/image/dog/` + boardData.image}
          />
        </ContentImgWrapper>

        <p className="queryStr">
          <FontAwesomeIcon icon="fa-pen" />
          {"  "}내용
        </p>
        <div className="textInputWrapper">
          <textarea
            className="textInput"
            onChange={onChangeContent}
            defaultValue={content}
          />
        </div>
        <div className="error-msg">{contentErrorMsg}</div>
      </BoardContentWrapper>
      <div className="btnWrapper">
        <MainColorShortBtn
          onClick={() => {
            navigate(`/board/${boardId}`);
          }}>
          취소
        </MainColorShortBtn>
        <MainColorShortBtn onClick={onClickEdit}>수정</MainColorShortBtn>
      </div>
    </CreateBoardWrapper>
  );
};

export default EditBoard;
