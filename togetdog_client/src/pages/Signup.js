import { useState } from "react";
import OptionBtn from "../components/OptionBtn";
import { BlackBtn, MainColorLongBtn } from "../styles/BtnsEmotion";
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

const Signup = () => {
  const [gender, setGender] = useState(1);

  const handleClickGender = (gender) => {
    setGender(gender);
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
                  className="email-input"
                  placeholder="이메일을 입력해주세요."
                />
              </div>
              <BlackBtn>중복 확인</BlackBtn>
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
                  className="email-input"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                />
              </div>
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
                  className="email-input"
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해 주세요."
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
                  className="email-input"
                  placeholder="닉네임을 입력해 주세요."
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
