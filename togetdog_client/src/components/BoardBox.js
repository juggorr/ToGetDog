import { BoardContentBox, BoardPicBox, BoardUserInfo, BoardUserInfoBox, BoardUserPic } from '../styles/BoardEmotion';

import MenuIcon from '../assets/menu_icon.png';
import Boy from '../assets/boy.png';
import Girl from '../assets/girl.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, userState } from '../recoil';
import { useRef, useState } from 'react';

import '../components/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuModalBody, MenuModalWrapper } from '../styles/ModalEmotion';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const BoardBox = ({ boardData, dogData, likeStatus, setLikeStatus }) => {
  const auth = useRecoilValue(authAtom);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const [menuBtnClick, setMenuBtnClick] = useState(false);
  const [likeCnt, setLikeCnt] = useState(boardData.likeCnt);
  const outSection = useRef();

  const deleteBoard = async () => {
    await axios
      .delete(`${BACKEND_URL}/board`, {
        params: {
          boardId: boardData.boardId,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log('게시물 삭제가 완료되었습니다.');
        navigate(`/feed/${user.userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = () => {
    if (likeStatus) {
      // 기존에 좋아요 였다면
      axios
        .delete(`${BACKEND_URL}/board/like`, {
          params: {
            boardId: boardData.boardId,
            userId: user.userId,
          },
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setLikeCnt(res.data.likeCnt);
          console.log('좋아요 취소가 완료되었습니다.');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!likeStatus) {
      axios
        .post(`${BACKEND_URL}/board/like`, null, {
          params: { boardId: boardData.boardId, userId: user.userId },
          headers: {
            Authorization: auth,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setLikeCnt(res.data.likeCnt);
          console.log('좋아요가 완료되었습니다.');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLikeStatus(!likeStatus);
  };

  return (
    <>
      {menuBtnClick === true ? (
        <MenuModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              setMenuBtnClick(false);
            }
          }}
        >
          <MenuModalBody>
            <div className='single-menu' onClick={() => window.location.replace(`/editBoard/${boardData.boardId}`)}>
              게시물 수정
            </div>
            <div className='single-menu red-font' onClick={() => deleteBoard()}>
              게시물 삭제
            </div>
          </MenuModalBody>
        </MenuModalWrapper>
      ) : null}
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
            <FontAwesomeIcon icon='fa-solid fa-heart' className='like-icon' onClick={handleLike} />
          ) : (
            <FontAwesomeIcon icon='fa-regular fa-heart' className='like-icon' onClick={handleLike} />
          )}
          <span className='like-txt'>{likeCnt}명이 이 게시물을 좋아합니다.</span>
        </div>
        <div className='board-content'>{boardData.content}</div>
      </BoardContentBox>
    </>
  );
};

export default BoardBox;
