import { YourChatBox, YourChatBoxWrapper } from '../styles/ChatEmotion';

const YourChat = ({ time, text }) => {
  const timeForToday = (value) => {
    let today = new Date();
    // console.log(today);
    const timeValue = new Date(value);
    // console.log(timeValue);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  return (
    <>
      <YourChatBoxWrapper>
        <YourChatBox>{text}</YourChatBox>
        <div className='time-txt'>{timeForToday(time)}</div>
      </YourChatBoxWrapper>
    </>
  );
};

export default YourChat;
