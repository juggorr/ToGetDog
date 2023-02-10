import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// 이페이지에서 Params에 토큰이 들어옴
// location params에서 토큰짤라서 들고잇기
// useSetRecoilState 이용해서 토큰 설정해주기
// 

// 로그인에 사용되는 코드
// 
// setUser(resp.data.user);
// // 로그인 토큰 설정 (추후에 주석 해제 예정)
// const userToken = resp.data['access-token'];
// localStorage.setItem('user', JSON.stringify(userToken));
// setAuth(userToken);
// navigate('/');

function Oauth() {

  const location = useLocation();


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(location);
  }, [])
  
  return(
    <>
    {isLoading ? (
      <div>소셜 로그인 중입니다...</div>
    ) :(
      <div>소셜 로그인 성공!</div>
    )}
    </>
  );
}

export default Oauth;