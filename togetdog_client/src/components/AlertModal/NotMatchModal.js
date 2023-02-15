import { useRef } from "react";

import Emotion4 from '../../assets/emotion4.png'
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from "../../styles/ModalEmotion";
import { MainColorShortBtn } from "../../styles/BtnsEmotion";

function NotMatchModal({ notMatchModal, setNotMatchModal }) {

  const outSection = useRef();

  const onClick = () => {
    setNotMatchModal(false);
  }

  return (
    <>
      {notMatchModal === true? (
      <ConfirmModalWrapper
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            setNotMatchModal(false);
          }
        }}
      >
        <ConfirmModalBody>
          <ConfirmModalImage src={Emotion4} />
          <span className="modal-msg">기존 비밀번호와 일치하지 않아요</span>
          <div className="two-btns-wrapper">
            <MainColorShortBtn 
              onClick={onClick}
            >
              확인
            </MainColorShortBtn>
          </div>
        </ConfirmModalBody>
      </ConfirmModalWrapper>
      ) : null}
    </>
  )
}

export default NotMatchModal;