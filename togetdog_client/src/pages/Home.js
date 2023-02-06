import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom, userState } from "../recoil";

const Home = () => {
  const [user, setUser] = useRecoilState(userState);

  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  // 추후 바로 아래 코드 삭제 예정 (개발용)
  // localStorage.setItem(
  //   "recoil-persist",
  //   JSON.stringify({
  //     userState: {
  //       email: "kacamimi@naver.com",
  //       userId: 21,
  //       nickName: "민주",
  //       address: "부천시 원미구 약대동",
  //     },
  //   })
  // );

  // 추후 주석 해제 예정 (개발용)
  useEffect(() => {
    if (auth && localStorage.getItem("recoil-persist")) navigate("/");
    else navigate("/login");
  }, []);

  return (
    <div>
      <div>Home {user && `안녕하세요 ${user.nickName}님`}</div>
    </div>
  );
};

export default Home;
