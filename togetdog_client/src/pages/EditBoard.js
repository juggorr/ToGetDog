import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import axios from "axios";
import {
  CreateBoardWrapper,
  BoardContentWrapper,
  ContentImgWrapper,
} from "../styles/NewEmotion";
import { MainColorShortBtn } from "../styles/BtnsEmotion";

import { BACKEND_URL, DUMMY_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditBoard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [board, setBoard] = useState();

  // const { boardId, pageNo } = useLocation();
  const boardId = 1;
  const pageNo = 1;
  // 다른 파일에서 useNavigate 쓸때 이런식으로
  // const handleClick = (e) => {
  //     const navigate = useNavigate();
  //     navigate('/edit', { boardId: e.target.value, pageNo: e.target.value });
  // }

  const [contentText, setContentText] = useState();

  useEffect(() => {
    axios
      .get(
        `${DUMMY_URL}/board/${boardId}?pageNo=${pageNo}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setBoard(response.data.board);
        setContentText(response.data.board.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const saveText = (e) => {
    setContentText(e.target.value);
  };

  const checkValid = async () => {
    await axios
      .put(
        `${DUMMY_URL}/board` +
          `?pageNo=${pageNo}&boardId=${boardId}&content=${contentText}`,
        {
          pageNo: pageNo,
          boardId: boardId,
          content: contentText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        navigate(`/board/${boardId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CreateBoardWrapper>
      <div className="boardHeader">게시글 수정</div>
      <BoardContentWrapper>
        <p className="queryStr">
          <FontAwesomeIcon icon="fa-image" />
          {"  "}사진
        </p>
        <ContentImgWrapper>
          <div className="contentImg">
            {board ? <img src={board.boardImage} alt="content_img" /> : null}
          </div>
        </ContentImgWrapper>

        <p className="queryStr">
          <FontAwesomeIcon icon="fa-pen" />
          {"  "}내용
        </p>
        <div className="textInputWrapper">
          <textarea
            className="textInput"
            onChange={saveText}
            value={contentText}
          >
            {contentText}
          </textarea>
        </div>
      </BoardContentWrapper>
      <div className="btnWrapper">
        <MainColorShortBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </MainColorShortBtn>
        <MainColorShortBtn onClick={checkValid}>수정</MainColorShortBtn>
      </div>
    </CreateBoardWrapper>
  );
};

export default EditBoard;
