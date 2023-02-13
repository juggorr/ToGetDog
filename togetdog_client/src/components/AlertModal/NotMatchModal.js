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
          <span>기존 비밀번호와 일치하지 않아요</span>
          <MainColorShortBtn 
            onClick={onClick}
          >
            확인
          </MainColorShortBtn>
        </ConfirmModalBody>
      </ConfirmModalWrapper>
      ) : null}
    </>
  )
}

export default NotMatchModal;