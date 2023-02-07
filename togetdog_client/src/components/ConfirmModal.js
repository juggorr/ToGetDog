import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';

import WalkIcon from '../assets/walking_with_dog.png'
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from '../styles/ModalEmotion';
import { SkyColorShortBtn, RedColorShortBtn } from '../styles/BtnsEmotion';

function ConfirmModal() {

  const navigate = useNavigate();

  const notDeleteDog = () => {
    navigate('/');
  }
  
  // const location = useLocation();
  // const dogId = location.state.dogId;

  const dogId = 2

  const deleteDog = async () => {
    
    try {
      await axios.delete(`http://i8a807.p.ssafy.io:8081/dummy/dog?dogId=${dogId}`)
      console.log(`${dogId}was deleted`)
    } catch(err) {
      console.log(err)
    }
  };



  return (
    <ConfirmModalWrapper>
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
  )
}

export default ConfirmModal;