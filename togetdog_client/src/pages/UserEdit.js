import { useEffect, useState } from "react";
import axios from "axios";

import { BACKEND_URL, DUMMY_URL } from '../config';


import { BlackBtn, MainShortBtn, GreyColorShortBtn } from '../styles/BtnsEmotion';
import OptionBtn from '../components/OptionBtn';
import { SignupContainer, SignupWrapper, InputWrapper } from '../styles/SignupEmotion';
import DaumKakaoAddress from '../components/DaumKakaoAddress';

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

const nicknameKorRegexp = /^[가-힣]{1,8}$/; // 한글 1~8자
const nicknameEngRegexp = /^[a-zA-Z]{2,16}$/; // 영문 2~16자

function UserEdit() {

  const userId = 10
  const [userData, setUserData] = useState();
  const birthYear = new Date().getFullYear() - userData.userAge;



  useEffect(() => {
    axios
    .get(`https://togetdog.site/dummy/user/${userId}`)
    .then((res) => {
      setUserData(res.data)
      console.log(res.data)
      console.log(userData.nickName)
    })
    .catch((err) => {
      console.log(err)
    });
  }, [])



  const [inputs, setInputs] = useState({
    nickname: '',
    gender: 1, // 성별 default 값 '남자'로 설정
    birth: '',
    address: '',
    sigunguCode: '',
  });

  const {
    nickname,
    gender,
    birth,
    address,
    sigunguCode,
  } = inputs;


  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState('');
  const [birthError, setBirthError] = useState(false);
  const [birthErrorMsg, setBirthErrorMsg] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [addressErrorMsg, setAddressErrorMsg] = useState('');


  const onChange = (e) => {
    const { name, value } = e.target; // e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 닉네임 핸들러 메소드
  const handleNickname = async (e) => {
    const nickname = e.target.value;
    console.log(nickname);
    if (!nicknameKorRegexp.test(nickname) && !nicknameEngRegexp.test(nickname)) {
      console.log('닉네임 형식에 맞지 않음');
      setNicknameError(false);
      setNicknameErrorMsg('닉네임은 한글 1~8자 혹은 영문 2~16자');
      return;
    }
    await axios
      .get(`${BACKEND_URL}/user/nickname`, { params: { nickname } })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp);
          console.log('사용 가능한 닉네임');
          setNicknameError(true);
          setNicknameErrorMsg('사용 가능한 닉네임입니다.');
        }
      })
      .catch((err) => {
        // 409 에러일 경우로 코드 리팩토링 필요
        console.log('사용 불가능한 닉네임');
        setNicknameError(false);
        setNicknameErrorMsg('중복된 닉네임입니다.');
      });

    onChange(e);
  };

  // 성별 선택 메소드
  const handleClickGender = (gender) => {
    setInputs({
      ...inputs,
      gender: gender, // 1: 남자, 2: 여자, 3: 기타
    });
  };

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

  const [popup, setPopup] = useState(false);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleEdit = () => {
    console.log('회원정보 변경!')
  }

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

    if (nicknameError && birthError && addressError) {
      console.log('회원 정보 변경을 시도합니다.');
      handleEdit();
    } else {
      console.log('아직 입력되지 않은 값 있음.');
      return;
    }
  };

  return (
    <>
    <SignupContainer>
      <SignupWrapper>
        {/* 닉네임 선택 wrapper */}
        <InputWrapper>
        <div className='input-title'>
          닉네임<span className='red-dot'>*</span>
        </div>
        <div className='horizontal-flex'>
          <div className='input-box general-input-box'>
            <input
              name='nickname'
              className='email-input'
              placeholder={userData.nickName}
              onChange={(e) => handleNickname(e)}
            />
          </div>
        </div>
        <div className={nicknameError ? 'success' : 'error'}>{nicknameErrorMsg}</div>
        </InputWrapper>
        {/* 성별 선택 wrapper */}
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
        {/* 출생연도 선택 wrapper */}
        <InputWrapper>
          <div className='input-title'>
            출생연도
            <span className='red-dot'>*</span>
          </div>
          <div className='horizontal-flex'>
            <div className='number-input-box'>
              <input 
                className='number-input' 
                name='birth' 
                onChange={(e) => handleBirth(e)} 
                placeholder={birthYear} 
              />
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
              <input 
                className='email-input' 
                value={address} name='address' 
                placeholder={userData.address} 
                disabled 
              />
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
        <div className='two-btns-wrapper'>
            <GreyColorShortBtn onClick={checkOthers}>돌아가기</GreyColorShortBtn>
            <MainShortBtn onClick={checkOthers}>변경하기</MainShortBtn>
        </div>
        <div className='edit-bottom-wrapper'>
          <div className='edit-bottom-text'>회원탈퇴</div>
        </div>
      </SignupWrapper>
    </SignupContainer>
    </>
  );
};

export default UserEdit;