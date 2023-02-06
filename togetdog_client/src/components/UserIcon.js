import { UserIconCircle } from "../styles/BtnsEmotion";

const UserIcon = (props) => {
  // <UserIcon text={nickName(string)} idx={idx(int)}></UserIcon> 형태로 써주세요
  return (
    <UserIconCircle>
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
