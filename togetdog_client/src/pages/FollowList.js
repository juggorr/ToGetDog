import { useEffect, useState } from "react";
import { ListContainer } from "../styles/FollowList";
import { useRecoilState } from 'recoil'
import { userState } from "../recoil";


function FollowList() {
  const user = useRecoilState(userState)

  useEffect(() => {
    async function setFollowerList() {
      const followerList = await getFollowers(user.token, accountname);
      setFollowers(followerList);
    }

    setFollowerList();
  }, [accountname]);

  return (
    <ListContainer>
      <div>
        팔로잉 페이지
      </div>
      <ListWrapper>
        {follower ? <FollowList list={followers} /> : <Loading />}
      </ListWrapper>


    </ListContainer>

  );
}

export default FollowList;