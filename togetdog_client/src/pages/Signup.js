import { useEffect, useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../config";

import { BlackBtn, MainColorLongBtn } from "../styles/BtnsEmotion";
import OptionBtn from "../components/OptionBtn";
import {
  SignupContainer,
  SignupWrapper,
  InputWrapper,
} from "../styles/SignupEmotion";
import DaumKakaoAddress from "../components/DaumKakaoAddress";

const genderBtnList = [
  {
    btn_id: 1,
    text: "남자",
  },
  {
    btn_id: 2,
    text: "여자",
  },
  {
    btn_id: 3,
    text: "기타",
  },
];

const passwordRegexp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,16}$/;

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    emailCheck: false,
    password: "",
    passwordCheck: "",
    nickname: "",
    gender: 1, // 성별 default 값 '남자'로 설정
    birth: "",
    address: "",
    sigunguCode: "",
    emailError: false,
    emailErrorMsg: "",
  });

  const {
    email,
    emailCheck,
    password,
    passwordCheck,
    nickname,
    gender,
    birth,
    address,
    sigunguCode,
    emailError,
    emailErrorMsg,
  } = inputs;

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordCheckErrorMsg, setPasswordCheckErrorMsg] = useState("");
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");
  const [birthError, setBirthError] = useState(false);
  const [birthErrorMsg, setBirthErrorMsg] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [addressErrorMsg, setAddressErrorMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target; // e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleEmailCheck = async (e) => {
    await axios
      .get(`${BACKEND_URL}/user/email`, { params: { email } })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp);
          console.log("이메일 중복확인 success");
          setInputs({
            ...inputs,
            emailCheck: true,
            emailErrorMsg: "사용 가능한 이메일입니다.",
          });
        }
      })
      .catch((err) => {
        // 409 에러일 경우로 코드 리팩토링 필요
        setInputs({
          ...inputs,
          emailCheck: false,
          emailErrorMsg: "이미 가입된 이메일입니다.",
        });
        console.log("이메일 중복확인 실패");
      });
  };

  // 비밀번호 핸들러 메소드
  const handlePassword = (e) => {
    // 비밀번호 유효성 검사
    if (!passwordRegexp.test(e.target.value)) {
      setPasswordError(false);
      setPasswordErrorMsg("비밀번호는 영문, 숫자, 특수문자 포함 8~16자");
    } else {
      setPasswordError(true);
      setPasswordErrorMsg("사용 가능한 비밀번호입니다.");
    }
    onChange(e);
  };

  // 비밀번호 재확인 핸들러 메소드
  const handlePasswordCheck = (e) => {
    // 비밀번호 일치 여부 검사
    if (password === e.target.value && e.target.value !== "") {
      console.log("비밀번호 일치");
      setPasswordCheckError(true);
      setPasswordCheckErrorMsg("비밀번호가 일치합니다.");
    } else {
      console.log("비밀번호 불일치");
      setPasswordCheckError(false);
      setPasswordCheckErrorMsg("비밀번호가 일치하지 않습니다.");
    }

    onChange(e);
  };

  // 닉네임 핸들러 메소드
  const handleNickname = async (e) => {
    const nickname = e.target.value;
    await axios
      .get(`${BACKEND_URL}/user/nickname`, { params: { nickname } })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp);
          console.log("사용 가능한 닉네임");
          setNicknameError(true);
          setNicknameErrorMsg("사용 가능한 닉네임입니다.");
        }
      })
      .catch((err) => {
        // 409 에러일 경우로 코드 리팩토링 필요
        console.log("사용 불가능한 닉네임");
        setNicknameError(false);
        setNicknameErrorMsg("중복된 닉네임입니다.");
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
    if (birthYear.length === 4) {
      setBirthError(true);
      setBirthErrorMsg("");
    } else {
      setBirthError(false);
      setBirthErrorMsg("출생연도를 입력해주세요.");
    }
    onChange(e);
  };

  const [popup, setPopup] = useState(false);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleSignup = async () => {
    let genderStr = "";
    switch (gender) {
      case 1:
        genderStr = "male";
        break;
      case 2:
        genderStr = "female";
        break;
      case 3:
        genderStr = "none";
        break;
      default:
        genderStr = "male";
    }

    // const data = {
    //   email: email,
    //   password: password,
    //   nickname: nickname,
    //   gender: genderStr,
    //   birth: birth,
    //   address: address,
    //   regionCode: sigunguCode,
    // };

    await axios
      .post(
        `${BACKEND_URL}/user`,
        {
          email: email,
          password: password,
          nickname: nickname,
          gender: genderStr,
          birth: birth,
          address: address,
          regionCode: sigunguCode,
        }
        // { headers: { "Content-Type": "application/json" } },
      )
      .then((resp) => {
        console.log("회원가입 성공!");
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
        console.log("회원가입 실패");
      });
  };

  const checkOthers = () => {
    if (!birthError) {
      setBirthError(false);
      setBirthErrorMsg("출생연도를 입력해주세요.");
    }
    if (!addressError) {
      setAddressError(false);
      setAddressErrorMsg("주소를 입력해주세요.");
    } else {
      setAddressError(true);
      setAddressErrorMsg("");
    }

    if (
      emailCheck &&
      passwordError &&
      passwordCheckError &&
      nicknameError &&
      birthError &&
      addressError
    ) {
      console.log("회원가입을 시도합니다.");
      handleSignup();
    } else {
      console.log("아직 입력되지 않은 값 있음.");
      return;
    }
  };

  return (
    <>
      <SignupContainer>
        <SignupWrapper>
          <div className="signup-title">
            Create a <span className="togetdog">ToGetDog</span> Account!
          </div>
          {/* 이메일 wrapper */}
          <InputWrapper>
            <div className="input-title">
              이메일<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box email-box">
                <input
                  name="email"
                  className="email-input"
                  placeholder="이메일을 입력해주세요."
                  onChange={onChange}
                />
              </div>
              <BlackBtn onClick={handleEmailCheck}>중복 확인</BlackBtn>
            </div>
            <div className={emailCheck ? "success" : "error"}>
              {emailErrorMsg}
            </div>
          </InputWrapper>
          {/* 비밀번호 wrapper */}
          <InputWrapper>
            <div className="input-title">
              비밀번호<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box general-input-box">
                <input
                  name="password"
                  className="email-input"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={(e) => handlePassword(e)}
                />
              </div>
            </div>
            <div className={passwordError ? "success" : "error"}>
              {passwordErrorMsg}
            </div>
          </InputWrapper>
          {/* 비밀번호 확인 wrapper */}
          <InputWrapper>
            <div className="input-title">
              비밀번호 확인<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box general-input-box">
                <input
                  name="passwordCheck"
                  className="email-input"
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해 주세요."
                  onChange={(e) => handlePasswordCheck(e)}
                />
              </div>
            </div>
            <div className={passwordCheckError ? "success" : "error"}>
              {passwordCheckErrorMsg}
            </div>
          </InputWrapper>
          {/* 닉네임 선택 wrapper */}
          <InputWrapper>
            <div className="input-title">
              닉네임<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box general-input-box">
                <input
                  name="nickname"
                  className="email-input"
                  placeholder="닉네임을 입력해 주세요."
                  onChange={(e) => handleNickname(e)}
                />
              </div>
            </div>
            <div className={nicknameError ? "success" : "error"}>
              {nicknameErrorMsg}
            </div>
          </InputWrapper>
          {/* 성별 선택 wrapper */}
          <InputWrapper>
            <div className="input-title">
              성별
              <span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex btn-list">
              {genderBtnList.map((it) => (
                <OptionBtn
                  key={it.btn_id}
                  {...it}
                  onClick={handleClickGender}
                  isSelected={it.btn_id === gender}
                />
              ))}
            </div>
          </InputWrapper>
          {/* 출생연도 선택 wrapper */}
          <InputWrapper>
            <div className="input-title">
              출생연도
              <span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="number-input-box">
                <input
                  className="number-input"
                  name="birth"
                  onChange={(e) => handleBirth(e)}
                  placeholder="2000"
                />
              </div>
              <div className="year">년</div>
            </div>
            <div className="error">{birthErrorMsg}</div>
          </InputWrapper>
          {/* 주소 입력 wrapper */}
          <InputWrapper>
            <div className="input-title">
              주소<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box address-box">
                <input
                  className="email-input"
                  value={address}
                  name="address"
                  placeholder="역삼동"
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
                  setPopup={setPopup}></DaumKakaoAddress>
              )}
            </div>
            <div className="error">{addressErrorMsg}</div>
          </InputWrapper>
          <div className="signup-desc">* 표시는 필수 입력 값입니다.</div>
          <div className="btn-wrapper">
            <MainColorLongBtn onClick={checkOthers}>회원가입</MainColorLongBtn>
          </div>
        </SignupWrapper>
      </SignupContainer>
    </>
  );
};

export default Signup;
