import { ErrorWrapper, ErrorImg } from "../styles/ErrorEmotion";
import { HomeTextBtn } from "../styles/BtnsEmotion";
import { useNavigate } from "react-router-dom";

import Snoopy from "../assets/snoopy.jpg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper>
      <ErrorImg src={Snoopy} />
      <div className="error">404 error...</div>
      <div className="errorDesc">찾을 수 없는 페이지입니다.</div>
      <HomeTextBtn
        onClick={() => {
          navigate("/");
        }}>
        홈으로 이동
      </HomeTextBtn>
    </ErrorWrapper>
  );
};

export default NotFound;
