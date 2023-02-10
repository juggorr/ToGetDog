import { ErrorWrapper, ErrorImg } from "../styles/ErrorEmotion";
import { HomeTextBtn } from "../styles/BtnsEmotion";
import { useNavigate } from "react-router-dom";

import Snoopy from "../assets/snoopy.jpg";


function OauthError() {
  const navigate = useNavigate();


  return(
    <ErrorWrapper>
      <ErrorImg src={Snoopy} />
        <div className="errorDesc">이미 가입된 이메일 입니다.</div>
        <HomeTextBtn
          onClick={() => {
            navigate('/');
          }}
        >
          홈으로 이동
        </HomeTextBtn>
    </ErrorWrapper>
  );
}

export default OauthError;