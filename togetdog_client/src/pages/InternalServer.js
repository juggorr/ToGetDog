import { ErrorWrapper, ErrorImg } from "../styles/ErrorEmotion";
import { HomeTextBtn } from "../styles/BtnsEmotion";
import { useNavigate } from "react-router-dom";

import Snoopy from "../assets/snoopy.jpg";

const InternalServer = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper>
      <ErrorImg src={Snoopy} />
      <div className="error">Internal Server Error</div>
      <div className="errorDesc">페이지가 작동하지 않습니다.</div>
      <HomeTextBtn
        onClick={() => {
          navigate("/");
        }}>
        홈으로 이동
      </HomeTextBtn>
    </ErrorWrapper>
  );
};

export default InternalServer;
