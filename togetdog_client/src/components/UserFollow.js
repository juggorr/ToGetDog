import UserIcon from "./UserIcon";
import { useNavigate } from "react-router-dom";

import { UserName } from "../styles/FollowerListEmotion";


function UserFollow({ user }) {
  const navigate = useNavigate();

  // 사진, 이름 클릭시 해당 인물 피드로 이동
  const onClick = () => {
    navigate('/', {
      state: {
        userId: user.userId,
      }
    });
  };

  
  return(
    <>
      <UserIcon 
        text={user.nickName}
        idx={user.userId}
      />
      <UserName onClick={onClick}>
          {user.nickName}
      </UserName>
    </>
  );
}

export default UserFollow;