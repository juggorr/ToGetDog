import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BACKEND_URL } from '../config';
import { authAtom, userState } from '../recoil';
import { BoardCommentBox } from '../styles/BoardEmotion';
import MenuIcon from '../assets/menu_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const deleteComment = ({ commentId }) => {
    const bool = window.confirm('댓글을 삭제하시겠습니까?');
    if (bool) {
      axios
        .delete(`${BACKEND_URL}/board/comment`, {
          params: {
            commentId: commentId,
          },
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log('댓글 삭제가 완료되었습니다.');
        })
        .catch((err) => {
          console.log(err);
        });
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
        document.querySelector('.comment-input').value = '';
        console.log(resp);
        console.log(resp.data.comments);
        setComments(resp.data.comments);
      })
      .catch((err) => {
        console.log('댓글 등록 실패');
      });
  };

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
          {comments.map((comment) => (
            <div className='comment-box' key={comment.commentId}>
              <div className='comment-content'>
                <div className='comment-user' onClick={() => navigate(`/feed/${comment.userId}`)}>
                  {comment.nickName}
                </div>
                <div>{comment.commentContent}</div>
              </div>
              {comment.userId === user.userId ? (
                <div className='comment-delete-btn' onClick={() => deleteComment(comment.commentId)}>
                  <FontAwesomeIcon icon='fa-solid fa-trash' />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </BoardCommentBox>
    </>
  );
};

export default CommentBox;
