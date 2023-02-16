import { UserIconCircle } from "../styles/BtnsEmotion";

const DogIcon = (props) => {
  // 버튼 눌러서 해당 프로필로 이동하도록
  // feed 작업내용 올라오면 해당 url로 수정

  return (
    <UserIconCircle>
      <div
        image={`https://togetdog.site/image/dog/` + props.img}
        className="circle image"></div>
    </UserIconCircle>
  );
};

export default DogIcon;
