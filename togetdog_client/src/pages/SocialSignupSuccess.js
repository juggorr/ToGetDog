import { ErrorWrapper, ErrorImg } from "../styles/ErrorEmotion";
import { HomeTextBtn } from "../styles/BtnsEmotion";
import { useLocation, useNavigate } from "react-router-dom";

import Dog1 from "../assets/dog1.jpg";
import { useEffect } from "react";


function OauthError() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      alert('허용되지 않은 접근입니다.');
      navigate(-1);
      return;
    }
  })


  return(
    <ErrorWrapper>
      <ErrorImg src={Dog1} />
        <div className="errorDesc">소셜 회원가입에 성공했습니다!</div>
        <HomeTextBtn
          onClick={() => {
            navigate('/login');
          }}
        >
          홈으로 이동
        </HomeTextBtn>
    </ErrorWrapper>
  );
}

export default OauthError;