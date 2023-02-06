import React from 'react';

import UserFollow from './UserFollow';
import { FollowUserList } from '../styles/FollowerList';

const FollowersList = ({ followers }) => {
  return followers.length > 0 ? (
    <div className='list-div'>
      {followers.map((follower) => (
        <FollowUserList key={follower.userId}>
          <UserFollow 
            user={follower}
          />
        </FollowUserList>
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