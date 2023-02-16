import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { BACKEND_URL } from "../config";
import { authAtom, userState } from "../recoil";
import { FollowBtnOff, FollowBtnOn } from "../styles/BtnsEmotion";

const FollowBtn = ({ dogId, followStatus, setFollowStatus }) => {
  const auth = useRecoilValue(authAtom);
  const [user, setUser] = useRecoilState(userState);

  const handleFollow = async () => {
    await axios
      .post(`${BACKEND_URL}/follow`, null, {
        params: { dogId: dogId, userId: user.userId },
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        setFollowStatus(!followStatus);
        console.log("팔로우 완료");
      })
      .catch((err) => {});
  };

  const handleUnfollow = async () => {
    await axios
      .delete(`${BACKEND_URL}/follow`, {
        params: {
          dogId: dogId,
          userId: user.userId,
        },
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        setFollowStatus(!followStatus);
        console.log("언팔로우가 완료되었습니다.");
      })
      .catch((err) => {});
  };

  return (
    <div>
      {followStatus ? (
        <FollowBtnOff onClick={handleUnfollow}>팔로잉</FollowBtnOff>
      ) : (
        <FollowBtnOn onClick={handleFollow}>팔로우</FollowBtnOn>
      )}
    </div>
  );
};

export default FollowBtn;
