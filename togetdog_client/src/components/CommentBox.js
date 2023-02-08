import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BACKEND_URL } from '../config';
import { authAtom, userState } from '../recoil';
import { BoardCommentBox } from '../styles/BoardEmotion';

const CommentBox = ({ boardData, setBoardData }) => {
  const [user, setUser] = useRecoilState(userState);
  const auth = useRecoilValue(authAtom);

  const navigate = useNavigate();

  const [comments, setComments] = useState(boardData.comments);
  const [commentInput, setCommentInput] = useState();
  const commentRef = useRef();

  const onChangeComment = (e) => {
    setCommentInput(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickComment();
    }
  };

  const onClickComment = async () => {
    if (!commentInput) {
      alert('댓글은 반드시 1자 이상 입력해야 합니다.');
      commentRef.current.focus();
      return;
    }
    console.log(commentInput);
    await axios
      .post(`${BACKEND_URL}/board/comment`, null, {
        params: {
          boardId: boardData.boardId,
          commentContent: commentInput,
          nickName: user.nickName,
          userId: user.userId,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data.comments);
        setComments(resp.data.comments);
        window.location.reload();
      })
      .catch((err) => {
        console.log('댓글 등록 실패');
      });
  };

  // useEffect(() => {
  //   // setComments(boardData.comments);
  // }, [comments]);

  return (
    <>
      <BoardCommentBox>
        <div className='comment-input-box'>
          <input
            className='comment-input'
            onChange={onChangeComment}
            onKeyPress={onKeyPress}
            placeholder='댓글을 작성해 주세요.'
          />
          <button className='comment-btn' onClick={onClickComment}>
            등록
          </button>
        </div>
        <div className='comment-list-box'>
          {boardData.comments.map((comment) => (
            <div className='comment-box' key={comment.commentId}>
              <div className='comment-user' onClick={() => navigate(`/feed/${comment.userId}`)}>
                {comment.nickName}
              </div>
              <div className='comment-content'>{comment.commentContent}</div>
            </div>
          ))}
        </div>
      </BoardCommentBox>
    </>
  );
};

export default CommentBox;
