import { useEffect, useState } from 'react';
import {
  BoardCommentBox,
  BoardContainer,
  BoardContentBox,
  BoardPicBox,
  BoardUserInfo,
  BoardUserInfoBox,
  BoardUserPic,
} from '../styles/BoardEmotion';
import DogImg from '../assets/dog2.jpg';
import Boy from '../assets/boy.png';
import Girl from '../assets/girl.png';
import MenuIcon from '../assets/menu_icon.png';
import '../components/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, userState } from '../recoil';
import { useLocation, useNavigate } from 'react-router';
import { BACKEND_URL } from '../config';
import axios from 'axios';

const Board = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const location = useLocation();
  const boardId = location.pathname.split('/').reverse()[0];

  const [boardData, setBoardData] = useState();
  const [dogData, setDogData] = useState();
  const [menuBtnClick, setMenuBtnClick] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !localStorage.getItem('recoil-persist')) {
      navigate('/login');
      return;
    }

    axios
      .get(`${BACKEND_URL}/${boardId}`, {
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
        if (err.response.status === 500) navigate('/*');
        console.log('게시물 불러오기 실패');
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BoardContainer>
        <BoardUserInfoBox>
          <div className='board-info-box-left' onClick={() => navigate(`/feed/${boardData.userId}`)}>
            <BoardUserPic src={`https://i8a807.p.ssafy.io/image/dog/` + dogData.dogProfile}></BoardUserPic>
            <BoardUserInfo>
              <div className='dog-name'>
                {dogData.dogName}
                {dogData.dogGender === 'male' ? (
                  <img src={Boy} className='dog-gender' alt='boy' />
                ) : (
                  <img src={Girl} className='dog-gender' alt='girl' />
                )}
              </div>
              <div className='dog-info'>
                {`${dogData.dogType} / ${
                  dogData.dogAge >= 12 ? `${Math.floor(dogData.dogAge / 12)}살` : `${dogData.dogAge}개월`
                }`}
              </div>
            </BoardUserInfo>
          </div>
          {user.userId === boardData.userId ? (
            <div className='board-info-box-right'>
              <img src={MenuIcon} className='menu-icon' onClick={() => setMenuBtnClick(true)} alt='menu' />
            </div>
          ) : null}
        </BoardUserInfoBox>
        <BoardPicBox>
          <img src={`https://i8a807.p.ssafy.io/image/board/` + boardData.image} className='board-pic' alt='board_img' />
        </BoardPicBox>
        <BoardContentBox>
          <div className='like-box'>
            {likeStatus ? (
              <FontAwesomeIcon
                icon='fa-solid fa-heart'
                className='like-icon'
                onClick={() => setLikeStatus(!likeStatus)}
              />
            ) : (
              <FontAwesomeIcon
                icon='fa-regular fa-heart'
                className='like-icon'
                onClick={() => setLikeStatus(!likeStatus)}
              />
            )}
            <span className='like-txt'>{boardData.likeCnt}명이 이 게시물을 좋아합니다.</span>
          </div>
          <div className='board-content'>{boardData.content}</div>
        </BoardContentBox>
        <BoardCommentBox>
          <div className='comment-input-box'>
            <input className='comment-input' placeholder='댓글을 작성해 주세요.' />
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
      </BoardContainer>
    </>
  );
};

export default Board;
