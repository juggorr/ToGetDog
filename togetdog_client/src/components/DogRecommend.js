import { useNavigate } from "react-router-dom";
import {
  DogName,
  DogProfile,
  DogRecommendWrapper,
} from "../styles/HomeEmotion";

const DogRecommend = ({ dog }) => {
  const navigate = useNavigate();

  return (
    <>
      <DogRecommendWrapper onClick={() => navigate(`/feed/${dog.userId}`)}>
        <DogProfile
          src={"https://i8a807.p.ssafy.io/image/dog/" + dog.dogProfile}
        />
        <DogName>{dog.dogName}</DogName>
      </DogRecommendWrapper>
    </>
  );
};

export default DogRecommend;
