import axios from "axios";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

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

const nicknameKorRegexp = /^[가-힣]{1,8}$/; // 한글 1~8자
const nicknameEngRegexp = /^[a-zA-Z]{2,16}$/; // 영문 2~16자

function SocialTemp() {
  
  const navigate = useNavigate();
  const params = "?user=UserSocialLoginRespDTO(email=pincelephant@gmail.com,%20nickName=이건없지용,%20social=K)"

  const [email, setEmail] = useState('');
  const [socialNickname, setSocialNickname] = useState('');
  const [social, setSocial] = useState('');

  useEffect(() => {

    let [email, nickname, social] = params.slice(35, params.length - 1).split(',%20');
    nickname = nickname.slice(9, nickname.length);    
    social = social.substring(social.length -1);

    setEmail(email);
    setSocialNickname(nickname);
    setSocial(social);
    console.log(email, nickname, social);
  }, [])

  // 닉네임을 설정하는 함수
  useEffect(() => {
    // console.log('여기요' + socialNickname);
    handleSocialNickname(socialNickname);
  }, [socialNickname])


  const [inputs, setInputs] = useState({
    nickname: '',
    gender: 1,
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

  const [socialNicknameErr, setSocialNicknameErr] = useState(true);

  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState('');
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

  // 소셜로 받아온 닉네임 핸들러 메소드
  const handleSocialNickname = async (val) => {
    console.log(val);
    if (!nicknameKorRegexp.test(val) && !nicknameEngRegexp.test(val)) {
      setInputs({
        ...inputs,
        nickname: socialNickname,
      })
      // console.log('통과실패');
      return;
    }
    // await axios
    //   .get(`${BACKEND_URL}/user/nickname`, { params: { val } })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log(res);
    //       setSocialNicknameErr(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     setSocialNicknameErr(false);
    //   });
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
    // console.log('회원가입 시도')
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

    // 소셜로그인 시 받은 닉네임이 유효하다면
    if (socialNicknameErr) {
      setInputs({
        ...inputs,
        nickname: socialNickname,
      });
    }

    // console.log(email)
    // console.log(social)
    // console.log(inputs)

    await axios
      .post(
        `${BACKEND_URL}/user/social`, // 소셜 로그인 POST api 주소
        {
          email: email,
          nickname: nickname,
          gender: genderStr,
          birth: birth,
          address: address,
          regionCode: sigunguCode,
          social: social,
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
          {/* 소셜 닉네임이 유효하지 않으면 닉네임 입력하기 활성화 */}
          {socialNicknameErr? (
          <InputWrapper>
              <div className='input-title'>
                닉네임<span className='red-dot'>*</span>
              </div>
              <div className='horizontal-flex'>
                <div className='input-box general-input-box'>
                  <input
                    name='nickname'
                    className='email-input'
                    placeholder='닉네임을 입력해 주세요.'
                    onChange={(e) => handleNickname(e)}
                  />
                </div>
              </div>
              <div className={nicknameError ? 'success' : 'error'}>{nicknameErrorMsg}</div>
            </InputWrapper>
          ) : null}
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

export default SocialTemp;