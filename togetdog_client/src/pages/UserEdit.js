import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import { BACKEND_URL, DUMMY_URL } from "../config";

import SignoutConfirmModal from "../components/SignoutConfirmModal";
import {
  BlackBtn,
  MainColorShortBtn,
  GreyColorShortBtn,
} from "../styles/BtnsEmotion";
import OptionBtn from "../components/OptionBtn";
import {
  SignupContainer,
  SignupWrapper,
  InputWrapper,
} from "../styles/SignupEmotion";
import DaumKakaoEditAddress from "../components/DaumKakaoEditAddress";
import { authAtom, userState } from "../recoil";

const genderBtnList = [
  {
    btn_id: "male",
    text: "남자",
  },
  {
    btn_id: "female",
    text: "여자",
  },
  {
    btn_id: "none",
    text: "기타",
  },
];

const nicknameKorRegexp = /^[가-힣]{1,8}$/; // 한글 1~8자
const nicknameEngRegexp = /^[a-zA-Z]{2,16}$/; // 영문 2~16자

function UserEdit() {
  const navigate = useNavigate();

  const [signoutBtnClick, setSignoutBtnClick] = useState(false);

  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);

  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    if (!auth || !localStorage.getItem("recoil-persist")) {
      navigate("/login");
      return;
    }

    axios
      .get(`${BACKEND_URL}/user/${user.userId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        setUserInfos(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect로 동기처리해버리기~
  // placeholder값 주기
  useEffect(() => {
    setInputs({
      nickname: userInfos.nickName,
      gender: userInfos.userGender,
      birth: userInfos.birth,
      address: userInfos.address,
      sigunguCode: userInfos.regionCode,
    });
    setNicknameHold(userInfos.nickName);
    setBirthHold(userInfos.birth);
    setAddressHold(userInfos.address);
  }, [userInfos]);

  // placeholder값들 정의
  const [nicknameHold, setNicknameHold] = useState("");
  const [birthHold, setBirthHold] = useState("");
  const [addressHold, setAddressHold] = useState("");

  const [inputs, setInputs] = useState({
    nickname: "",
    gender: "", // 성별 default 값 '남자'로 설정
    birth: "",
    address: "",
    sigunguCode: "",
  });

  const { nickname, gender, birth, address, sigunguCode } = inputs;

  // const [nicknameError, setNicknameError] = useState(false);
  const nicknameError = useRef(false);
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");
  // const [birthError, setBirthError] = useState(false);
  const birthError = useRef(false);
  const [birthErrorMsg, setBirthErrorMsg] = useState("");
  // const [addressError, setAddressError] = useState(false);
  const addressError = useRef(false);
  const [addressErrorMsg, setAddressErrorMsg] = useState("");

  // addressError current값 바꿔주는 함수
  const addressErrorChange = () => {
    addressError.current = true;
  };

  const onChange = (e) => {
    const { name, value } = e.target; // e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 닉네임 핸들러 메소드
  const handleNickname = async (e) => {
    setNicknameHold("");
    const nickname = e.target.value;
    if (
      !nicknameKorRegexp.test(nickname) &&
      !nicknameEngRegexp.test(nickname)
    ) {
      console.log("닉네임 형식에 맞지 않음");
      nicknameError.current = false;
      setNicknameErrorMsg("닉네임은 한글 1~8자 혹은 영문 2~16자");
      return;
    }
    await axios
      .get(`${BACKEND_URL}/user/nickname`, { params: { nickname } })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp);
          console.log("사용 가능한 닉네임");
          nicknameError.current = true;
          setNicknameErrorMsg("사용 가능한 닉네임입니다.");
        }
      })
      .catch((err) => {
        // 409 에러일 경우로 코드 리팩토링 필요
        console.log("사용 불가능한 닉네임");
        nicknameError.current = false;
        setNicknameErrorMsg("중복된 닉네임입니다.");
      });

    onChange(e);
  };

  // 성별 선택 메소드
  const handleClickGender = (gender) => {
    setInputs({
      ...inputs,
      gender: gender,
    });
  };

  // 출생년도 메소드
  const handleBirth = (e) => {
    setBirthHold("");
    const birthYear = e.target.value;
    if (birthYear >= 1900 && birthYear <= new Date().getFullYear()) {
      // setBirthError(true);
      birthError.current = true;
      setBirthErrorMsg("");
    } else {
      // setBirthError(false);
      birthError.current = false;
      setBirthErrorMsg("출생연도를 입력해주세요.");
    }
    onChange(e);
  };

  const [popup, setPopup] = useState(false);

  const handlePopup = () => {
    setAddressHold("");
    setPopup(!popup);
  };

  // 돌아가기 클릭 시
  const handleNotEdit = () => {
    navigate(`/feed/${user.userId}`);
  };

  // PUT 요청 보내기
  const handleEdit = async () => {
    console.log("회원정보 변경!");

    await axios
      .put(
        `${BACKEND_URL}/user`,
        {
          nickName: nickname,
          gender: gender,
          birth: birth,
          address: address,
          regionCode: sigunguCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate(`/feed/${user.userId}`);
  };

  // 값을 변경하지 않으면 placeholder를 기본값으로 설정
  const checkHolders = () => {
    if (nicknameHold) {
      setInputs({
        ...inputs,
        nickname: nicknameHold,
      });
      nicknameError.current = true;
    }
    if (birthHold) {
      setInputs({
        ...inputs,
        birth: birthHold,
      });
      // setBirthError(true);
      birthError.current = true;
    }
    if (addressHold) {
      setInputs({
        ...inputs,
        address: addressHold,
      });
      // setAddressError(true);
      addressError.current = true;
    }
    return;
    // console.log('바꿔')
  };

  const checkOthers = () => {
    if (!birthError.current) {
      // setBirthError(false);
      birthError.current = false;
      setBirthErrorMsg("출생연도를 입력해주세요.");
    }
    if (!addressError.current) {
      // setAddressError(false);
      addressError.current = false;
      setAddressErrorMsg("주소를 입력해주세요.");
    } else {
      // setAddressError(true);
      addressError.current = true;
      setAddressErrorMsg("");
    }

    if (nicknameError.current && birthError.current && addressError.current) {
      console.log("회원 정보 변경을 시도합니다.");
      handleEdit();
    } else {
      console.log("아직 입력되지 않은 값 있음.");
      return;
    }
  };

  const checkEdit = () => {
    checkHolders();
    checkOthers();
  };

  const handleSignout = () => {
    setSignoutBtnClick(true);
  };

  return (
    <>
      <SignupContainer>
        <SignoutConfirmModal
          signoutBtnClick={signoutBtnClick}
          setSignoutBtnClick={setSignoutBtnClick}
        />
        <SignupWrapper>
          {/* 닉네임 선택 wrapper */}
          <InputWrapper>
            <div className="boardHeader">회원 정보 수정</div>
            <div className="input-title">
              닉네임<span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box general-input-box">
                <input
                  name="nickname"
                  className="email-input"
                  placeholder={nicknameHold}
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
                  placeholder={birthHold}
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
                  placeholder={addressHold}
                  disabled
                />
              </div>
              <BlackBtn onClick={handlePopup}>주소 찾기</BlackBtn>
              {popup && (
                <DaumKakaoEditAddress
                  data={inputs}
                  setData={setInputs}
                  error={addressError}
                  setError={addressErrorChange}
                  errorMsg={addressErrorMsg}
                  setErrorMsg={setAddressErrorMsg}
                  popup={popup}
                  setPopup={setPopup}></DaumKakaoEditAddress>
              )}
            </div>
            <div className="error">{addressErrorMsg}</div>
          </InputWrapper>
          <div className="signup-desc">* 표시는 필수 입력 값입니다.</div>
          <div className="two-btns-wrapper">
            <GreyColorShortBtn onClick={handleNotEdit}>
              돌아가기
            </GreyColorShortBtn>
            <MainColorShortBtn onClick={checkEdit}>변경하기</MainColorShortBtn>
          </div>
          <div className="edit-bottom-wrapper">
            <div className="edit-bottom-text" onClick={handleSignout}>
              회원탈퇴
            </div>
          </div>
        </SignupWrapper>
      </SignupContainer>
    </>
  );
}

export default UserEdit;
