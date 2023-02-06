import { FollowBtnOff, FollowBtnOn } from "../styles/BtnsEmotion";

const FollowBtn = ({ followStatus, setFollowStatus }) => {
  return (
    <div>
      {followStatus ? (
        <FollowBtnOff
          onClick={() => {
            setFollowStatus(!followStatus);
          }}>
          팔로잉
        </FollowBtnOff>
      ) : (
        <FollowBtnOn
          onClick={() => {
            setFollowStatus(!followStatus);
          }}>
          팔로우
        </FollowBtnOn>
      )}
    </div>
  );
};

export default FollowBtn;
