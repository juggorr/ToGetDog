import { ErrorWrapper, ErrorImg } from '../styles/ErrorEmotion';
import { HomeTextBtn } from '../styles/BtnsEmotion';
import { useNavigate } from 'react-router-dom';

import Snoopy from '../assets/snoopy.jpg';

const InternalServer = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper>
      <ErrorImg src={Snoopy} />
      <div className='error'>Connection Error</div>
      <div className='errorDesc'>
        통신이 원활하지 않습니다.
        <br />
        다시 시도해주세요.
      </div>
      <HomeTextBtn
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로 이동
      </HomeTextBtn>
    </ErrorWrapper>
  );
};

export default InternalServer;
