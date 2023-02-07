import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BACKEND_URL } from "../config";
import { authAtom, userState } from "../recoil";
import { BoardCommentBox } from "../styles/BoardEmotion";

const CommentBox = ({ boardData }) => {
  const [user, setUser] = useRecoilState(userState);
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);

  const navigate = useNavigate();

  const [comments, setComments] = useState(boardData.comments);
  const [commentInput, setCommentInput] = useState();
  const commentRef = useRef();

  const onChangeComment = (e) => {
    setCommentInput(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      onClickComment();
    }
  };

  const onClickComment = async () => {
    if (!commentInput) {
      alert("댓글은 반드시 1자 이상 입력해야 합니다.");
      return;
    }
    await axios
      .post(
        `${BACKEND_URL}/board/comment`,
        {
          boardId: boardData.boardId,
          commentContent: commentInput,
          userId: user.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log("댓글 등록 실패");
      });
  };

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
      .get(`${BACKEND_URL}/board/${boardData.boardId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        setComments(resp.data.board.comments);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          alert("토큰이 만료되어 자동 로그아웃되었습니다.");
          handleLogout();
        }
      });
  }, []);

  return (
    <>
      <BoardCommentBox>
        <div className="comment-input-box">
          <input
            className="comment-input"
            onChange={onChangeComment}
            onKeyPress={onKeyPress}
            placeholder="댓글을 작성해 주세요."
          />
          <button className="comment-btn" onClick={onClickComment}>
            등록
          </button>
        </div>
        <div className="comment-list-box">
          {boardData.comments.map((comment) => (
            <div className="comment-box" key={comment.commentId}>
              <div
                className="comment-user"
                onClick={() => navigate(`/feed/${comment.userId}`)}>
                {comment.nickName}
              </div>
              <div className="comment-content">{comment.commentContent}</div>
            </div>
          ))}
        </div>
      </BoardCommentBox>
    </>
  );
};

export default CommentBox;
