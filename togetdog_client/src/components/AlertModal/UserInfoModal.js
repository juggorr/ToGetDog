import { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import axios from 'axios';


import { authAtom, userState } from '../../recoil';

import WalkIcon from "../../assets/walking_with_dog.png";
import UserIcon from "../UserIcon";
import { BACKEND_URL } from '../../config';
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from '../../styles/ModalEmotion';
import YellowCharacterBtn from "../YellowCharacterBtn";
import { MainColorShortBtn } from '../../styles/BtnsEmotion';


function UserInfoModal({ userInfoModal, setUserInfoModal, setMenuBtnClick }) {

  const user = useRecoilValue(userState);
  const auth = useRecoilValue(authAtom);
  const outSection = useRef();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user/${user.userId}`, {
        headers: {
          Authorization: auth,
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const onClick = () => {
    setUserInfoModal(false);
    setMenuBtnClick(true);
  }


  return(
    <>
      {userInfoModal === true ? (
        <ConfirmModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              setUserInfoModal(false);
            }
          }}
        >
          <ConfirmModalBody>
            <ConfirmModalImage src={WalkIcon} />
            <h3>알림</h3>
            <span className="modal-msg">삭제한 프로필은 복구할 수 없어요.</span>
            <span className="modal-msg">그래도 삭제하시겠어요?</span>
            <div className="two-btns-wrapper">
              <MainColorShortBtn
                onClick={onClick}
              >
                닫기
              </MainColorShortBtn>
            </div>
          </ConfirmModalBody>
        </ConfirmModalWrapper>
      ) : null}
    </>
  );
}

export default UserInfoModal;