import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import { BACKEND_URL } from "../config";

import NotMatchModal from "../components/AlertModal/NotMatchModal";
import { MainColorShortBtn, GreyColorShortBtn } from "../styles/BtnsEmotion";
import {
  PasswordContainer,
  SignupWrapper,
  InputWrapper,
} from "../styles/SignupEmotion";
import NoEssentialsModal from "../components/AlertModal/NoEssentialsModal";
import { authAtom, userState } from "../recoil";

const passwordRegexp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,16}$/;

function PasswordEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const [noEssentialsModal, setNoEssentialsModal] = useState(false);

  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userState);
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    // 로그인 하지 않은 유저 접근 불가
    if (!auth || !user) {
      navigate("/login");
      return;
    }

    // 로그인 했어도 url로 접근 불가
    if (!location.state) {
      alert("허용되지 않은 접근입니다.");
      navigate(-1);
      return;
    }
    //
  });

  const [inputs, setInputs] = useState({
    oldPassword: "",
    password: "",
    passwordCheck: "",
  });

  const { oldPassword, password, passwordCheck } = inputs;

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordCheckErrorMsg, setPasswordCheckErrorMsg] = useState("");

  // 기존 비밀번호와 일치하지 않을 시 모달
  const [notMatchModal, setNotMatchModal] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target; // e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 기존 비밀번호 핸들러 메소드
  const handleOldPassword = (e) => {
    onChange(e);
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
      setPasswordCheckError(true);
      setPasswordCheckErrorMsg("비밀번호가 일치합니다.");
    } else {
      setPasswordCheckError(false);
      setPasswordCheckErrorMsg("비밀번호가 일치하지 않습니다.");
    }

    onChange(e);
  };

  // 비밀번호 바뀌었는지 확인 메소드 추가해야함? => 심화로..

  // 1. 기존 비밀번호가 틀렸을 경우 => 에러 메시지 확인
  // 2. 기존 비밀번호가 일치할 경우 => 정상적으로 비밀번호 변경
  const sendPut = async () => {
    await axios
      .put(
        `${BACKEND_URL}/user/password`,
        {
          password: oldPassword,
          newPassword: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        }
      )
      .then((res) => {
        navigate(`/feed/${user.userId}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setNotMatchModal(true);
        } else {
        }
      });
  };

  const handleNotEdit = () => {
    navigate(-1);
  };

  const checkOthers = () => {
    if (!oldPassword || !password || !passwordCheck) {
      setNoEssentialsModal(true);
      return;
    }

    sendPut();
  };

  return (
    <>
      <PasswordContainer>
        <NotMatchModal
          notMatchModal={notMatchModal}
          setNotMatchModal={setNotMatchModal}
        />
        <NoEssentialsModal
          noEssentialsModal={noEssentialsModal}
          setNoEssentialsModal={setNoEssentialsModal}
        />
        <SignupWrapper>
          {/* 기존 비밀번호 wrapper */}
          <InputWrapper>
            <div className="input-title">
              기존 비밀번호<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box general-input-box">
                <input
                  name="oldPassword"
                  className="email-input"
                  type="password"
                  placeholder="기존 비밀번호를 입력해 주세요."
                  onChange={(e) => handleOldPassword(e)}
                />
              </div>
            </div>
            <div className="error">
              본인확인을 위해 기존 비밀번호를 입력해 주세요.
            </div>
          </InputWrapper>
          {/* 비밀번호 wrapper */}
          <InputWrapper>
            <div className="input-title">
              변경할 비밀번호<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box general-input-box">
                <input
                  name="password"
                  className="email-input"
                  type="password"
                  placeholder="변경할 비밀번호를 입력해 주세요."
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
              변경할 비밀번호 확인<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box general-input-box">
                <input
                  name="passwordCheck"
                  className="email-input"
                  type="password"
                  placeholder="변경할 비밀번호를 다시 한번 입력해 주세요."
                  onChange={(e) => handlePasswordCheck(e)}
                />
              </div>
            </div>
            <div className={passwordCheckError ? "success" : "error"}>
              {passwordCheckErrorMsg}
            </div>
          </InputWrapper>
          <div className="signup-desc">* 표시는 필수 입력 값입니다.</div>
          <div className="two-btns-wrapper">
            <GreyColorShortBtn onClick={handleNotEdit}>
              돌아가기
            </GreyColorShortBtn>
            <MainColorShortBtn onClick={checkOthers}>
              변경하기
            </MainColorShortBtn>
          </div>
        </SignupWrapper>
      </PasswordContainer>
    </>
  );
}

export default PasswordEdit;
