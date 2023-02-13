import { useRef } from "react";

import Emotion4 from '../../assets/emotion4.png'
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from "../../styles/ModalEmotion";
import { MainColorShortBtn } from "../../styles/BtnsEmotion";

function NoEssentialsModal({ noEssentialsModal, setNoEssentialsModal }) {

  const outSection = useRef();

  const onClick = () => {
    setNoEssentialsModal(false);
  }

  return (
    <>
      {noEssentialsModal === true? (
      <ConfirmModalWrapper
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            setNoEssentialsModal(false);
          }
        }}
      >
        <ConfirmModalBody>
          <ConfirmModalImage src={Emotion4} />
          <span>필수 값을 입력하지 않았어요.</span>
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

export default NoEssentialsModal;