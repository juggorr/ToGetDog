import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { BACKEND_URL } from '../config';
import { authAtom, userState } from '../recoil';

function Oauth() {
  const navigate = useNavigate();

  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);

  const [token, setToken] = useState('');
  const [userInfos, setUserInfos] = useState({
    email: '',
    userId: '',
    nickName: '',
    address: '',
  })

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const params = decodeURIComponent(location.search);

  // 문자열 조작
  useEffect(() => {
    console.log(params);

    let [token, user] = params.split('&');
    console.log(token);
    console.log(user);
    token = token.slice(14, token.length);
    setToken(token);

    let [email, id, nickname, address] = user.slice(28 ,user.length - 1).split(', ');
    id = Number(id.slice(7, id.length));
    nickname = nickname.slice(9, nickname.length);
    address = address.slice(8, address.length);
    setUserInfos({
      email: email,
      userId: id,
      nickName: nickname,
      address: address,
    });
  }, []);

// 유저 정보가 입력되면 로컬스토리지에 유저 정보 저장
useEffect(() => {
  function setLocalStore() {
    console.log(userInfos);
    setUser(userInfos);
  
    localStorage.setItem('user', JSON.stringify(token));
    setAuth(token);
    setIsLoading(false);
  }

  function logIn() {
    navigate('/');
  }

  setLocalStore();
  if (!isLoading) {
    logIn();
  }

}, [userInfos]);

// 위 코드가 실행된 후에 navigate되도록 해야함
  return(
    <>
    {isLoading ? (
      <div>소셜 로그인 중입니다...</div>
    ) :(
      <div>
        소셜 로그인 성공!
      </div>
    )}
    </>
  );
}

export default Oauth;