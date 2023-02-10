import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { BACKEND_URL } from '../config';

import { BlackBtn, MainColorLongBtn } from '../styles/BtnsEmotion';
import OptionBtn from '../components/OptionBtn';
import { SignupContainer, SignupWrapper, InputWrapper } from '../styles/SignupEmotion';
import DaumKakaoAddress from '../components/DaumKakaoAddress';
import { useNavigate } from 'react-router-dom';
import EmailSent from '../components/EmailSent';

const genderBtnList = [
  {
    btn_id: 1,
    text: '남자',
  },
  {
    btn_id: 2,
    text: '여자',
  },
  {
    btn_id: 3,
    text: '기타',
  },
];

// navigate에 옵션으로 email, nickname, social 받아오기
// axios POST 활용해서
// user객체에 값들 추가해서 보내기
// 추가해야할 값들 = 성별, 출생연도, 주소 => 이 3개만 뜨는 페이지 만들기
function SocialSignup() {
  const navigate = useNavigate();
  const { socialUser } = useParams();
  

  useEffect(() => {
    console.log(socialUser.email);
    console.log(socialUser.data);
  })

  const [inputs, setInputs] = useState({
    gender: 1,
    birth: '',
    address: '',
    sigunguCode: '',
    });

  const {
    gender,
    birth,
    address,
    sigunguCode,
  } = inputs;

  const [birthError, setBirthError] = useState(false);
  const [birthErrorMsg, setBirthErrorMsg] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [addressErrorMsg, setAddressErrorMsg] = useState('');
  const [emailStatus, setEmailStatus] = useState(false);


  const onChange = (e) => {
    const { name, value } = e.target; // e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 성별 선택 메소드
  const handleClickGender = (gender) => {
    setInputs({
      ...inputs,
      gender: gender, // 1: 남자, 2: 여자, 3: 기타
    });
  };
  
  // 생일 입력 메소드
  const handleBirth = (e) => {
    const birthYear = e.target.value;
    if (birthYear >= 1900 && birthYear <= new Date().getFullYear()) {
      setBirthError(true);
      setBirthErrorMsg('');
    } else {
      setBirthError(false);
      setBirthErrorMsg('출생연도를 입력해주세요.');
    }
    onChange(e);
  };
  
  // 주소 팝업 메소드
  const [popup, setPopup] = useState(false);
  const handlePopup = () => {
    setPopup(!popup);
  }; 


  const handleSignup = async () => {
    let genderStr = '';
    switch (gender) {
      case 1:
        genderStr = 'male';
        break;
      case 2:
        genderStr = 'female';
        break;
      case 3:
        genderStr = 'none';
        break;
      default:
        genderStr = 'male';
    }

    await axios
      .post(
        `${BACKEND_URL}/user/social`, // 소셜 로그인 POST api 주소
        {
          email: socialUser.email,
          nickname: socialUser.nickname,
          gender: genderStr,
          birth: birth,
          address: address,
          regionCode: sigunguCode,
          social: socialUser.social,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        setEmailStatus(true);
        console.log('회원가입 성공!')
        console.log(res);
        navigate('/signup');
      })
      .catch((err) => {
        console.log(err);
        console.log('회원가입 실패');
      });
  };

  const checkOthers = () => {
    if (!birthError) {
      setBirthError(false);
      setBirthErrorMsg('출생연도를 입력해주세요.');
    }
    if (!addressError) {
      setAddressError(false);
      setAddressErrorMsg('주소를 입력해주세요.');
    } else {
      setAddressError(true);
      setAddressErrorMsg('');
    }

    if (birthError && addressError) {
      console.log('회원가입을 시도합니다.');
      handleSignup();
    } else {
      console.log('아직 입력되지 않은 값 있음.');
      return;
    }
  };
  
  return(
    <>
      <SignupContainer>
        {emailStatus ? (
          <EmailSent email="email" />
        ) : (
        <SignupWrapper>
          <div className='signup-title'>
            Create a <span className='togetdog'>ToGetDog</span> Account!
          </div>
          {/* 성별 선택 */}
          <InputWrapper>
            <div className='input-title'>
              성별
              <span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex btn-list'>
              {genderBtnList.map((it) => (
                <OptionBtn key={it.btn_id} {...it} onClick={handleClickGender} isSelected={it.btn_id === gender} />
              ))}
            </div>
          </InputWrapper>
          {/* 출생연도 선택 */}
          <InputWrapper>
            <div className='input-title'>
              출생연도
              <span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='number-input-box'>
                <input className='number-input' name='birth' onChange={(e) => handleBirth(e)} placeholder='2000' />
              </div>
              <div className='year'>년</div>
            </div>
            <div className='error'>{birthErrorMsg}</div>
          </InputWrapper>
          {/* 주소 입력 wrapper */}
          <InputWrapper>
            <div className='input-title'>
              주소<span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='input-box address-box'>
                <input className='email-input' value={address} name='address' placeholder='역삼동' disabled />
              </div>
              <BlackBtn onClick={handlePopup}>주소 찾기</BlackBtn>
              {popup && (
                <DaumKakaoAddress
                  data={inputs}
                  setData={setInputs}
                  error={addressError}
                  setError={setAddressError}
                  errorMsg={addressErrorMsg}
                  setErrorMsg={setAddressErrorMsg}
                  popup={popup}
                  setPopup={setPopup}
                ></DaumKakaoAddress>
              )}
            </div>
            <div className='error'>{addressErrorMsg}</div>
          </InputWrapper>
          <div className='signup-desc'>* 표시는 필수 입력 값입니다.</div>
          <div className='btn-wrapper'>
            <MainColorLongBtn onClick={checkOthers}>회원가입</MainColorLongBtn>
          </div>
        </SignupWrapper>

        )}
      </SignupContainer>
    </>
  );
}

export default SocialSignup;