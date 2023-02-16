import { useState, useEffect, useRef } from 'react';

import UserIcon from '../UserIcon';
import { ConfirmModalWrapper, ConfirmModalBody } from '../../styles/ModalEmotion';
import YellowCharacterBtn from '../YellowCharacterBtn';
import { MainColorShortBtn } from '../../styles/BtnsEmotion';
import emotion1 from '../../assets/emotion1.png';
import emotion2 from '../../assets/emotion2.png';
import emotion3 from '../../assets/emotion3.png';
import emotion4 from '../../assets/emotion4.png';
import emotion5 from '../../assets/emotion5.png';

function UserInfoModal({ userInfoModal, setUserInfoModal, feedUserData }) {
  const outSection = useRef();

  const [age, setAge] = useState(0);
  const [dong, setDong] = useState('');
  const [gender, setGender] = useState('');
  const [rate, setRate] = useState('');

  useEffect(() => {
    setAge(Math.floor(feedUserData.userAge / 10) * 10);
    setRate(feedUserData.rating);
    setDong(feedUserData.address.substring(feedUserData.address.lastIndexOf(' ') + 1));
    setGender(feedUserData.userGender === 'male' ? '남성' : '여성');
  }, []);

  const onClick = () => {
    setUserInfoModal(false);
  };

  return (
    <>
      {userInfoModal === true ? (
        <ConfirmModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              setUserInfoModal(false);
            }
          }}
        >
          <ConfirmModalBody>
            <UserIcon text={feedUserData.nickname}></UserIcon>
            <div className='user-nickname'>{feedUserData.nickname}</div>
            <div className='rating-box'>
              {rate < 1 ? (
                <img className='rate-img' src={emotion5} alt='최저' />
              ) : rate < 2 ? (
                <img className='rate-img' src={emotion4} alt='저' />
              ) : rate < 3 ? (
                <img className='rate-img' src={emotion3} alt='중' />
              ) : rate < 4 ? (
                <img className='rate-img' src={emotion2} alt='고' />
              ) : (
                <img className='rate-img' src={emotion1} alt='최고' />
              )}
              <p className='rate'>{rate}</p>
            </div>
            <div className='characters-box'>
              <YellowCharacterBtn text={`# ${dong}`} />
              <YellowCharacterBtn text={`# ${age}대`} />
              <YellowCharacterBtn text={`# ${gender}`} />
            </div>
            <div className='two-btns-wrapper'>
              <MainColorShortBtn onClick={onClick}>닫기</MainColorShortBtn>
            </div>
          </ConfirmModalBody>
        </ConfirmModalWrapper>
      ) : null}
    </>
  );
}

export default UserInfoModal;
