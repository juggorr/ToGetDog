import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 이페이지에서 Params에 토큰이 들어옴

function Oauth() {

  const socialToken = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(socialToken)
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