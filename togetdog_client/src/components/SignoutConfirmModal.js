import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';


import { authAtom } from '../recoil';
import Emotion5 from '../assets/emotion5.png'
import { BACKEND_URL } from '../config';
import { ConfirmModalWrapper, ConfirmModalBody, ConfirmModalImage } from '../styles/ModalEmotion';
import { SkyColorShortBtn, RedColorShortBtn } from '../styles/BtnsEmotion';

function SignoutConfirmModal({ signoutBtnClick, setSignoutBtnClick }) {

  // const setAuth = useSetRecoilState(authAtom);
  // const user = useRecoilValue(userState);
  const auth = useRecoilValue(authAtom);
  const outSection = useRef();

  const notSignout = () => {
    setSignoutBtnClick(false);
  }

  const signout = async () => {
    // console.log('xx')
    try {
      await axios.delete(`${BACKEND_URL}/user`, {
          headers: {
            Authorization: auth,
          }
    })} catch(err) {
        console.log(err)
    };
  };


  return (
    <>
      {signoutBtnClick === true ? (
        <ConfirmModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              setSignoutBtnClick(false);
            } 
          }}
        >
          <ConfirmModalBody>
            <ConfirmModalImage src={Emotion5} />
            <h3>알림</h3>
            <span>회원 탈퇴시 모든 정보가 삭제돼요.</span>
            <span>그래도 탈퇴하시겠어요?</span>
            <div className="two-btns-wrapper">
              <RedColorShortBtn
                onClick={notSignout}
              >
                아니오
              </RedColorShortBtn>
              <SkyColorShortBtn
                onClick={signout}
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

export default SignoutConfirmModal;