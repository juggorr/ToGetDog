import { BoardContentBox, BoardPicBox, BoardUserInfo, BoardUserInfoBox, BoardUserPic } from '../styles/BoardEmotion';

import MenuIcon from '../assets/menu_icon.png';
import Boy from '../assets/boy.png';
import Girl from '../assets/girl.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil';
import { useState } from 'react';

import '../components/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoardBox = ({ boardData, dogData, likeStatus, setLikeStatus }) => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const [menuBtnClick, setMenuBtnClick] = useState(false);

  return (
    <>
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
    </>
  );
};

export default BoardBox;
