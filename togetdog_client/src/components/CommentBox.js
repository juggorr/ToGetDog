import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardCommentBox } from '../styles/BoardEmotion';

const CommentBox = ({ boardData }) => {
  const navigate = useNavigate();

  const [comment, setComment] = useState();

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <BoardCommentBox>
        <div className='comment-input-box'>
          <input className='comment-input' onChange={onChangeComment} placeholder='댓글을 작성해 주세요.' />
          <button className='comment-btn'>등록</button>
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
