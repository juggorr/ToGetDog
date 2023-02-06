import DogFollow from "./DogFollow";
import { FollowList } from "../styles/FollowerListEmotion";

const FollowingsList = ({ followings }) => {
  return followings.length > 0 ? (
    <div className="list-div">
      {followings.map((following) => (
        <FollowList key={following.dogId}>
          <DogFollow 
            dog={following}
          />
        </FollowList>
      ))}

    </div>
  ) : (
    <div>
      <p>
        팔로잉하는 강아지가 없어요 :(
      </p>
    </div>
  );
}

export default FollowingsList;