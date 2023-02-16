import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Emotion1 from '../../assets/emotion1.png'
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from "../../styles/ModalEmotion";
import { MainColorShortBtn } from "../../styles/BtnsEmotion";

function ReissueModal({ reissueModal, setReissueModal }) {

  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  }

  return (
    <>
      {reissueModal === true? (
      <ConfirmModalWrapper>
        <ConfirmModalBody>
          <ConfirmModalImage src={Emotion1} />
          <span>임시 비밀번호를 이메일로 발급했습니다!</span>
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

export default ReissueModal;