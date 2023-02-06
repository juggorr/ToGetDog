import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';


import { MenuModalWrapper, MenuModalBody } from '../styles/ModalEmotion';
import { SkyColorShortBtn, RedColorShortBtn } from '../styles/BtnsEmotion';

function DeleteModal() {

  const navigate = useNavigate();

  const notDeleteDog = () => {
    navigate('/');
  }
  
  const location = useLocation();
  const dogId = location.state.dogId;

  const deleteDog = async () => {
    
    try {
      await axios.delete(`http://i8a807.p.ssafy.io:8081/dummy/dog?dogId=${dogId}`)
      console.log(`${dogId}was deleted`)
    } catch(err) {
      console.log(err)
    }
  };



  return (
    <MenuModalWrapper>
      <MenuModalBody>
        <h1>알림</h1>
        <p>삭제한 프로필은 복구할 수 없어요.</p>
        <p>그래도 삭제하시겠어요?</p>
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
      </MenuModalBody>
    </MenuModalWrapper>
  )
}

export default DeleteModal;