import { UserIconCircle } from "../styles/BtnsEmotion";
import { useNavigate } from "react-router-dom";


const UserIcon = (props) => {
  // 버튼 눌러서 해당 프로필로 이동하도록
  // feed 작업내용 올라오면 해당 url로 수정
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/', {
      state: {
        userId: props.idx,
      }
    });
  };

  // <UserIcon text={nickName(string)} idx={idx(int)}></UserIcon> 형태로 써주세요
  return (
    <UserIconCircle
      onClick={onClick}
    >
      <div
        className={
          "circle" +
          (props.idx % 5 === 0 ? " one" : "") +
          (props.idx % 5 === 1 ? " two" : "") +
          (props.idx % 5 === 2 ? " three" : "") +
          (props.idx % 5 === 3 ? " four" : "") +
          (props.idx % 5 === 4 ? " five" : "")
        }
      >
        {props.text.substring(0, 1)}
      </div>
    </UserIconCircle>
  );
};

export default UserIcon;
