import UserIcon from "./UserIcon";
import { useNavigate } from "react-router-dom";

import { DogImgWrapper } from "../styles/CreateAppointmentEmotion";
import { UserName } from "../styles/FollowerListEmotion";


function UserFollow({ user }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/feed/${user.userId}`);
  };

  
  return(
    <>
    <DogImgWrapper>
      <div className="userFollowCircle">
        <UserIcon
          text={user.nickname}
          idx={user.userId}
        />
      </div>
    </DogImgWrapper>
    <UserName onClick={onClick}>
        {user.nickname}
    </UserName>
    </>
  );
}

export default UserFollow;