import { useNavigate } from 'react-router-dom';
import { DogName, DogProfile, DogRecommendWrapper } from '../styles/HomeEmotion';

const DogRecommend = ({ dog }) => {
  const navigate = useNavigate();

  return (
    <>
      <DogRecommendWrapper onClick={() => navigate(`/feed/${dog.userId}`, { state: { dogId: dog.dogId } })}>
        <DogProfile src={'https://togetdog.site/image/dog/' + dog.dogProfile} />
        <DogName>{dog.dogName}</DogName>
      </DogRecommendWrapper>
    </>
  );
};

export default DogRecommend;
