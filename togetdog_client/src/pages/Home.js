import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, userState } from '../recoil';

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  console.log(user);

  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && localStorage.getItem('recoil-persist')) navigate('/');
    else navigate('/login');
  }, []);

  return (
    <div>
      <div>Home {user && `안녕하세요 ${user.nickName}`}</div>
    </div>
  );
};

export default Home;
