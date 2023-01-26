import { useRecoilState } from "recoil";
import { userState } from "../recoil";

const Home = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <div>
      <div>Home {user && `안녕하세요 ${user.userName}`}</div>
    </div>
  );
};

export default Home;
