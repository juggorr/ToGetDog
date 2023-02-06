import { useEffect, useState } from "react";
import {
  BoardCommentBox,
  BoardContainer,
  BoardContentBox,
  BoardPicBox,
  BoardUserInfo,
  BoardUserInfoBox,
  BoardUserPic,
} from "../styles/BoardEmotion";
import DogImg from "../assets/dog2.jpg";
import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";
import MenuIcon from "../assets/menu_icon.png";
import "../components/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil";
import { useNavigate } from "react-router";

const Board = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  const board = {
    likeStatus: true,
    likeCnt: 123,
    content: "콜라 오늘 미용하고 왔어요 ㅎㅎ",
    comments: [
      { commentUser: "요닝", commentContent: "콜라 미용한거 너무 귀엽당 ♥" },
      {
        commentUser: "해피맘",
        commentContent: "내일 산책할 때 미용한 모습 볼 수 있겠네 ㅎㅎ",
      },
    ],
  };
  const currentDog = {
    dogName: "콜라",
    dogType: "믹스견",
    dogAge: 25,
    dogGender: "male",
    dogImg:
      "https://yt3.googleusercontent.com/AexQl7InKoQKDSvVffy6OFcwTi4BFIcyTlzCjL8_CLuLRO9aDNtXRwq7t7bTPRcpk-hCEiv0q7E=s900-c-k-c0x00ffffff-no-rj",
  };

  const [menuBtnClick, setMenuBtnClick] = useState(false);
  const [likeStatus, setLikeStatus] = useState(board.likeStatus);

  useEffect(() => {
    if (!auth || !localStorage.getItem("recoil-persist")) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <>
      <BoardContainer>
        <BoardUserInfoBox>
          <div className="board-info-box-left">
            <BoardUserPic src={currentDog.dogImg}></BoardUserPic>
            <BoardUserInfo>
              <div className="dog-name">
                {currentDog.dogName}
                {currentDog.dogGender === "male" ? (
                  <img src={Boy} className="dog-gender" alt="boy" />
                ) : (
                  <img src={Girl} className="dog-gender" alt="girl" />
                )}
              </div>
              <div className="dog-info">
                {`${currentDog.dogType} / ${
                  currentDog.dogAge >= 12
                    ? `${Math.floor(currentDog.dogAge / 12)}살`
                    : `${currentDog.dogAge}개월`
                }`}
              </div>
            </BoardUserInfo>
          </div>
          <div className="board-info-box-right">
            <img
              src={MenuIcon}
              className="menu-icon"
              onClick={() => setMenuBtnClick(true)}
              alt="menu"
            />
          </div>
        </BoardUserInfoBox>
        <BoardPicBox>
          <img src={currentDog.dogImg} className="board-pic" alt="board_img" />
        </BoardPicBox>
        <BoardContentBox>
          <div className="like-box">
            {likeStatus ? (
              <FontAwesomeIcon
                icon="fa-solid fa-heart"
                className="like-icon"
                onClick={() => setLikeStatus(!likeStatus)}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-regular fa-heart"
                className="like-icon"
                onClick={() => setLikeStatus(!likeStatus)}
              />
            )}
            <span className="like-txt">
              x {board.likeCnt}명이 이 게시물을 좋아합니다.
            </span>
          </div>
          <div className="board-content">{board.content}</div>
        </BoardContentBox>
        <BoardCommentBox>
          <div className="comment-input-box">
            <input
              className="comment-input"
              placeholder="댓글을 작성해 주세요."
            />
            <button className="comment-btn">등록</button>
          </div>
          <div className="comment-list-box">
            {board.comments.map((comment) => (
              <div className="comment-box">
                <div className="comment-user">{comment.commentUser}</div>
                <div className="comment-content">{comment.commentContent}</div>
              </div>
            ))}
          </div>
        </BoardCommentBox>
      </BoardContainer>
    </>
  );
};

export default Board;
