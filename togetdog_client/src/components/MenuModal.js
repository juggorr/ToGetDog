import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authAtom, userState } from '../recoil';
import { MenuModalWrapper, MenuModalBody } from '../styles/ModalEmotion';

// menuList에는 menu_id, text, link가 담겨있음
// dog delete 모달 추가

const MenuModal = ({
  menuLists,
  menuBtnClick,
  setMenuBtnClick,
  feedDogData,
  feedUserData,
  setConfirmBtnClick,
  setNoDogBtnClick,
  setNoChangeModalClick,
  dogId,
}) => {
  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);

  const outSection = useRef();
  const navigate = useNavigate();

  const handleDogDelete = () => {
    setMenuBtnClick(false);
    setConfirmBtnClick(true);
  };

  const handleNoDog = () => {
    setMenuBtnClick(false);
    setNoDogBtnClick(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAuth(null);
    console.log('로그아웃이 정상적으로 처리되었습니다.');
    navigate('/login');
  };

  const handleNoChange = () => {
    setMenuBtnClick(false);
    setNoChangeModalClick(true);
  }

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
            {menuLists.map((it) => (
              <div
                key={it.menu_id}
                className='single-menu'
                onClick={() => {
                  if (it.link === '/logout') {
                    return handleLogout();
                  } else if (it.link === '/dogdelete') {
                    if (feedDogData.length > 0) {
                      console.log(feedDogData.length);
                      return handleDogDelete();
                    } else {
                      // console.log('없서');
                      return handleNoDog();
                    }
                  } else if (it.link === '/dogedit' && feedDogData.length > 0) {
                    navigate(it.link, { state: dogId });
                  } else if (it.link === '/dogedit' && feedDogData.length === 0) {
                    return handleNoDog();
                  } else if (it.link === '/passwordedit') {
                    if (feedUserData.social === 'origin') {
                      navigate(it.link);
                    } else {
                      console.log('소셜 회원은 비밀번호 변경 불가')
                      return handleNoChange();
                      // alert('소셜 회원은 비밀번호를 변경할 수 없습니다.')
                    }
                  } else {
                    navigate(it.link);
                  }
                }}
              >
                {it.text}
              </div>
            ))}
          </MenuModalBody>
        </MenuModalWrapper>
      ) : null}
    </>
  );
};

export default MenuModal;
