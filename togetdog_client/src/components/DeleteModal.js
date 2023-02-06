import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { MenuModalWrapper, MenuModalBody } from '../styles/ModalEmotion';
import { SkyColorShortBtn, RedColorShortBtn } from '../styles/BtnsEmotion';

function DeleteModal() {

  return (
    <MenuModalWrapper>
      <MenuModalBody>
        <h1>알림</h1>
        <p>삭제한 프로필은 복구할 수 없어요.</p>
        <p>그래도 삭제하시겠어요?</p>
        <div className="two-btns-wrapper">
          <RedColorShortBtn>
            아니오
          </RedColorShortBtn>
          <SkyColorShortBtn>
            예
          </SkyColorShortBtn>
        </div>
      </MenuModalBody>
    </MenuModalWrapper>
  )
}

export default DeleteModal;