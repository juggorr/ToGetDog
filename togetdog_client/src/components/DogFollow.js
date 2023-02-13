import DogIcon from "./DogIcon";
import { DogImgWrapper } from "../styles/CreateAppointmentEmotion";

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
      <DogImgWrapper>
        <div className="dogProfileCircle">
          <img 
            src={"https://i8a807.p.ssafy.io/image/dog/" + dog.dogProfile}
            alt="dog_img"
            className="dogProfileImg"
          />
        </div>
      </DogImgWrapper>
      {/* <DogIcon 
        img={dog.dogProfile}
        idx={dog.dogId}
        userId={dog.userId}
      /> */}
      <UserName onClick={onClick}>
          {dog.dogName}
      </UserName>
    </>
  );
}

export default DogFollow;