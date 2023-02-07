import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';


import { authAtom } from '../recoil';
import WalkIcon from '../assets/walking_with_dog.png'
import { BACKEND_URL } from '../config';
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from '../styles/ModalEmotion';
import { SkyColorShortBtn, RedColorShortBtn } from '../styles/BtnsEmotion';

function ConfirmModal({ confirmBtnClick, setMenuBtnClick, setConfirmBtnClick, dogId }) {

  // const setAuth = useSetRecoilState(authAtom);
  // const user = useRecoilValue(userState);
  const auth = useRecoilValue(authAtom);
  const outSection = useRef();

  const notDeleteDog = () => {
    setConfirmBtnClick(false);
    setMenuBtnClick(true);
  }

  const deleteDog = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/dog/${dogId}`, {
          headers: {
            Authorization: auth,
          }
    })} catch(err) {
        console.log(err)
    };
  };


  return (
    <>
      {confirmBtnClick === true ? (
        <ConfirmModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              setConfirmBtnClick(false);
            } 
          }}
        >
          <ConfirmModalBody>
            <ConfirmModalImage src={WalkIcon} />
            <h3>알림</h3>
            <span>삭제한 프로필은 복구할 수 없어요.</span>
            <span>그래도 삭제하시겠어요?</span>
            <div className="two-btns-wrapper">
              <RedColorShortBtn
                onClick={notDeleteDog}
              >
                아니오
              </RedColorShortBtn>
              <SkyColorShortBtn
                onClick={deleteDog}
              >
                예
              </SkyColorShortBtn>
            </div>
          </ConfirmModalBody>
        </ConfirmModalWrapper>
      ) : null}
    </>
  )
}

export default ConfirmModal;