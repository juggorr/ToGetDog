import { ErrorWrapper, ErrorImg } from '../styles/ErrorEmotion'
import { HomeTextBtn } from '../styles/BtnsEmotion'
import { useNavigate } from 'react-router-dom'

const InternalServer = () => {
  const navigate = useNavigate()
  
  return (
    <ErrorWrapper>
      <ErrorImg src={process.env.PUBLIC_URL + '/assets/snoopy.jpg'} />
      <div className='error'>Internal Server Error</div>
      <div className='errorDesc'>페이지가 작동하지 않습니다.</div>
      <HomeTextBtn onClick={() => {
        navigate("/")
      }}>홈으로 이동</HomeTextBtn>
    </ErrorWrapper>
  )
}

export default InternalServer