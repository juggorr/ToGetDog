import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { BACKEND_URL } from "../config";
import { authAtom, userState } from "../recoil";

const ttoken =
  "?access-token=eyJ0eXBlIjoiSldUIiwicmVnRGF0ZSI6MTY3NjIzMTMwMDkzMCwiYWxnIjoiSFMyNTYifQ.eyJleHAiOjE2NzYzMTc3MDAsInN1YiI6InRvZ2V0RG9nIiwidXNlcklkIjozNn0.IN6oxswilEPeoteOYIgJkgFu9VyugXnc1U142WsQa18";
const uuser =
  "user=UserLoginRespDTO(email=henry0304@naver.com, userId=36, nickName=네이버시도, address=경기 성남시 분당구 판교동)";

function OauthTemp() {
  const navigate = useNavigate();

  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);

  const [token, setToken] = useState("");
  const [userInfos, setUserInfos] = useState({
    email: "",
    userId: "",
    nickName: "",
    address: "",
  });

  const canNavigate = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tmpToken = ttoken.slice(14, ttoken.length);
    setToken(tmpToken);
    let [email, id, nickname, address] = uuser
      .slice(28, uuser.length - 1)
      .split(", ");

    id = id.slice(7, id.length);
    nickname = nickname.slice(9, nickname.length);
    address = address.slice(8, address.length);
    setUserInfos({
      email: email,
      userId: id,
      nickName: nickname,
      address: address,
    });
  }, []);

  // 유저 정보가 입력되면 로컬스토리지에 유저 정보, 토큰 저장
  useEffect(() => {
    function setLocalStore() {
      setUser(userInfos);

      localStorage.setItem("user", JSON.stringify(token));
      setAuth(token);

      canNavigate.current = true;
      setIsLoading(false);
    }

    function logIn() {
      navigate("/");
    }

    setLocalStore();
    if (!isLoading) {
      logIn();
    }
  }, [userInfos]);

  return <>{isLoading ? <div>로그인 중...</div> : <div>로그인 성공!</div>}</>;
}

export default OauthTemp;
