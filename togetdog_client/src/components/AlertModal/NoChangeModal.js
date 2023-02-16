import { useRef } from "react";

import Emotion4 from '../../assets/emotion4.png'
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from "../../styles/ModalEmotion";
import { MainColorShortBtn } from "../../styles/BtnsEmotion";

function NoChangeModal({ noChangeModalClick, setNoChangeModalClick, setMenuBtnClick }) {

  const outSection = useRef();

  const onClick = () => {
    setNoChangeModalClick(false);
    setMenuBtnClick(true);
  }

  return (
    <>
      {noChangeModalClick === true? (
      <ConfirmModalWrapper
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            setNoChangeModalClick(false);
          }
        }}
      >
        <ConfirmModalBody>
          <ConfirmModalImage src={Emotion4} />
          <span className="modal-msg">소셜 회원은 비밀번호를 변경할 수 없어요</span>
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

export default NoChangeModal;