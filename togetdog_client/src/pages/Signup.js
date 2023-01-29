import { useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../config";

import { BlackBtn, MainColorLongBtn } from "../styles/BtnsEmotion";
import OptionBtn from "../components/OptionBtn";
import {
  SignupContainer,
  SignupWrapper,
  InputWrapper,
} from "../styles/SignupEmotion";

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

const passwordRegexp = /^(?=.[a-zA-Z])(?=.[!@#$%^+=-])(?=.[0-9]).{8,16}$/;

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    emailCheck: false,
    password: "",
    passwordCheck: "",
    nickname: "",
    gender: 1, // 성별 default 값 '남자'로 설정
    birth: null, // 출생연도 default값 null로 설정
    address: "",
    emailError: false,
    passwordError: false,
    passwordCheckError: false,
    nicknameError: false,
    birthError: false,
    addressError: false,
    emailErrorMsg: "",
    passwordErrorMsg: "",
    passwordCheckErrorMsg: "",
    nicknameErrorMsg: "",
    birthErrorMsg: "",
    addressErrorMsg: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordCheck, setPasswordCheck] = useState("");
  // const [nickname, setNickname] = useState("");
  // const [gender, setGender] = useState(1); // 성별 default 값 '남자'로 설정
  // const [birth, setbirth] = useState(null); // 출생연도 default값 null로 설정

  const {
    email,
    emailCheck,
    password,
    passwordCheck,
    nickname,
    gender,
    birth,
    address,
    emailError,
    passwordError,
    passwordCheckError,
    nicknameError,
    birthError,
    addressError,
    emailErrorMsg,
    passwordErrorMsg,
    passwordCheckErrorMsg,
    nicknameErrorMsg,
    birthErrorMsg,
    addressErrorMsg,
  } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs,
      [name]: value,
    });

    if (name === "password") {
      checkPassword();
    }
  };

  const checkPassword = () => {
    if (!passwordRegexp.test(password)) {
      console.log(password);
      console.log("유효성");

      setInputs({
        ...inputs,
        passwordError: false,
        passwordErrorMsg: "비밀번호는 영문, 숫자, 특수문자 포함 8~16자",
      });
    } else {
      setInputs({
        ...inputs,
        passwordError: true,
        passwordErrorMsg: "사용 가능한 비밀번호입니다.",
      });
    }
  };

  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [passwordCheckError, setPasswordCheckError] = useState("");

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

  // 성별 선택 메소드
  const handleClickGender = (gender) => {
    setInputs({
      ...inputs,
      gender: gender, // 1: 남자, 2: 여자, 3: 기타
    });
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
            <div className={`message ${emailCheck ? "success" : "error"}`}>
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
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="success">{passwordError}</div>
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
                  onChange={onChange}
                />
              </div>
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
                  onChange={onChange}
                />
              </div>
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
                <input className="number-input" placeholder="2000" />
              </div>
              <div className="year">년</div>
            </div>
          </InputWrapper>
          {/* 주소 입력 wrapper */}
          <InputWrapper>
            <div className="input-title">
              주소<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box address-box">
                <input className="email-input" placeholder="역삼동" disabled />
              </div>
              <BlackBtn>주소 찾기</BlackBtn>
            </div>
          </InputWrapper>
          <div className="signup-desc">* 표시는 필수 입력 값입니다.</div>
          <div className="btn-wrapper">
            <MainColorLongBtn>회원가입</MainColorLongBtn>
          </div>
        </SignupWrapper>
      </SignupContainer>
    </>
  );
};

export default Signup;
