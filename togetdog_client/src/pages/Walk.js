import { useState } from "react";
import { WalkListWrapper, TabList, SingleTab } from "../styles/WalkEmotion";

const MeetingListWrapper = () => {
  const [active, setActive] = useState(1);
  return (
    <WalkListWrapper>
      meetinglist
      <TabList>
        <SingleTab></SingleTab>
        <SingleTab></SingleTab>
        <SingleTab></SingleTab>
      </TabList>
    </WalkListWrapper>
  );
};

const Walk = () => {
  return <MeetingListWrapper />;
};

export default Walk;
