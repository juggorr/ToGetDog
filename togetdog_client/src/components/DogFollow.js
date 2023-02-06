import DogIcon from "./DogIcon";
import { useNavigate } from "react-router-dom";

import { UserName } from "../styles/FollowerListEmotion";


function DogFollow({ dog }) {
  const navigate = useNavigate();

  // 사진, 이름 클릭시 해당 인물 피드로 이동
  const onClick = () => {
    navigate('/', {
      state: {
        dogId: dog.dogId,
        userId: dog.userId,
      }
    });
  };

  
  return(
    <>
      <DogIcon 
        img={dog.dogProfile}
        idx={dog.dogId}
        userId={dog.userId}
      />
      <UserName onClick={onClick}>
          {dog.dogName}
      </UserName>
    </>
  );
}

export default DogFollow;