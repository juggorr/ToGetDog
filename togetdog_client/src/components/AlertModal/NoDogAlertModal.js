import { useRef } from "react";

import Emotion4 from '../../assets/emotion4.png'
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from "../../styles/ModalEmotion";
import { MainColorShortBtn } from "../../styles/BtnsEmotion";

function NoDogAlertModal({ noDogBtnClick, setNoDogBtnClick, setMenuBtnClick }) {

  const outSection = useRef();

  const onClick = () => {
    setNoDogBtnClick(false);
    setMenuBtnClick(true);
  }

  return (
    <>
      {noDogBtnClick === true? (
      <ConfirmModalWrapper
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            setNoDogBtnClick(false);
          }
        }}
      >
        <ConfirmModalBody>
          <ConfirmModalImage src={Emotion4} />
          <span className="modal-msg">등록된 강아지가 없어요.</span>
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

export default NoDogAlertModal;