import { useRecoilState } from 'recoil';
import { userState } from '../recoil';

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  console.log(user);

  return (
    <div>
      <div>Home {user && `안녕하세요 ${user.nickName}`}</div>
    </div>
  );
};

export default Home;
