import { YourChatBox, YourChatBoxWrapper } from '../styles/ChatEmotion';

const YourChat = ({ time, text }) => {
  const timeForToday = (value) => {
    const now = new Date();
    const timeValue = new Date(value);

    // const utc = timeValue.getTime() + timeValue.getTimezoneOffset() * 60 * 1000;
    // const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
    // const kr_curr = new Date(utc + KR_TIME_DIFF); //UTC 시간을 한국 시간으로 변환하기 위해 utc 밀리초 값에 9시간을 더함.

    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값

    // console.log("한국시간 : " + today.getTime());

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
      <YourChatBoxWrapper>
        <YourChatBox>{text}</YourChatBox>
        <div className='time-txt'>{timeForToday(time)}</div>
      </YourChatBoxWrapper>
    </>
  );
};

export default YourChat;
