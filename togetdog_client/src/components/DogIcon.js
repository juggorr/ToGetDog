import { UserIconCircle } from "../styles/BtnsEmotion";
import { useNavigate } from "react-router-dom";


const DogIcon = (props) => {
  // 버튼 눌러서 해당 프로필로 이동하도록
  // feed 작업내용 올라오면 해당 url로 수정
  const navigate = useNavigate();
  const onClick = () => {
    // console.log(props)
    // navigate('/', {
    //   state: {
    //     dogId: props.idx,
    //     userId: props.userId,
    //   }
    // });
    console.log(props.img)
  };

  return (
    <UserIconCircle
      onClick={onClick}
    >
      <div
        image={`https://i8a807.p.ssafy.io/image/dog/` + props.img}
        className="circle image"
      >
      </div>
    </UserIconCircle>
  );
};

export default DogIcon;