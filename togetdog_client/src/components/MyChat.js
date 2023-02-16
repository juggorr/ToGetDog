import { MyChatBox, MyChatBoxWrapper } from '../styles/ChatEmotion';

const MyChat = ({ time, text }) => {
  const timeForToday = (value) => {
    const now = new Date();
    const timeValue = new Date(value);
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값

    const milliSeconds = utcNow - timeValue;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  return (
    <>
      <MyChatBoxWrapper>
        <div className='time-txt'>{timeForToday(time)}</div>
        <MyChatBox>{text}</MyChatBox>
      </MyChatBoxWrapper>
    </>
  );
};

export default MyChat;
