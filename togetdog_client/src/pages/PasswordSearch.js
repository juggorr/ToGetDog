import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { BACKEND_URL } from "../config";
import {
  InputWrapper,
  LoginContainer,
  LoginWrapper,
  LogoWrapper,
} from "../styles/LoginEmotion";
import { BlackLongBtn } from "../styles/BtnsEmotion";
import ReissueModal from "../components/AlertModal/ReissueAlertModal";
import ToGetDog from "../assets/togetdog.png";
import { authAtom } from "../recoil";

const emailRegexp =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

function PasswordSearch() {
  // 로그인 상태 유저는 접근하지 못하도록
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState(false);
  const emailError = useRef(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  // 비밀번호 발급 성공 모달
  const [reissueModal, setReissueModal] = useState(false);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmail = async (e) => {
    if (!emailRegexp.test(email)) {
      emailError.current = false;
      setEmailErrorMsg("이메일 형식에 맞지 않습니다.");
      return;
    }
    await axios
      .get(`${BACKEND_URL}/user/email`, { params: { email } })
      .then((res) => {
        if (res.status === 200) {
          emailError.current = false;
          setEmailErrorMsg("가입되지 않은 이메일입니다.");
        }
      })
      .catch((err) => {
        emailError.current = true;
        setEmailErrorMsg("잠시만 기다려 주세요...!");
      });

    await sendEmail();
  };

  const sendEmail = async () => {
    if (!emailError.current) {
      return;
    }

    await axios
      .get(
        `${BACKEND_URL}/user/password`,
        { params: { email } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setReissueModal(true);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert("소셜 회원은 비밀번호를 변경할 수 없습니다.");
          navigate("/login");
          return;
        }
      });
  };

  return (
    <LoginContainer>
      <ReissueModal
        reissueModal={reissueModal}
        setReissueModal={setReissueModal}
      />
      <LoginWrapper>
        <LogoWrapper>
          <img src={ToGetDog} alt="togetdog" className="logo-img" />
        </LogoWrapper>
        <InputWrapper>
          <div className="input-title">
            이메일<span className="red-dot">*</span>
          </div>
          <div className="input-wrapper">
            <input
              className="search-input"
              placeholder="가입 시 입력한 이메일을 입력해 주세요"
              onChange={onChange}
            />
          </div>
          <div className={emailError.current ? "success" : "error"}>
            {emailErrorMsg}
          </div>
        </InputWrapper>
        <BlackLongBtn onClick={handleEmail}>임시 비밀번호 발급</BlackLongBtn>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default PasswordSearch;
