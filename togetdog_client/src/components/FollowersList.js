import React from 'react';

import UserFollow from './UserFollow';
import { FollowList } from '../styles/FollowerListEmotion';

const FollowersList = ({ followers }) => {
  return followers.length > 0 ? (
    <div className="list-div">
      {followers.map((follower) => (
        <FollowList key={follower.userId}>
          <UserFollow 
            user={follower}
          />
        </FollowList>
      ))}
    </div>
  ) : (
    <div>
      <p>
        팔로워가 없어요 :(
      </p>
    </div>
  );
}

export default FollowersList;