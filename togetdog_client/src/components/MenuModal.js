import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authAtom, userState } from "../recoil";
import { MenuModalWrapper, MenuModalBody } from "../styles/ModalEmotion";

// menuList에는 menu_id, text, link가 담겨있음

const MenuModal = ({ menuLists, menuBtnClick, setMenuBtnClick }) => {
  const setAuth = useSetRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userState);

  const outSection = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuth(null);
    console.log("로그아웃이 정상적으로 처리되었습니다.");
    navigate("/login");
  };

  return (
    <>
      {menuBtnClick === true ? (
        <MenuModalWrapper
          ref={outSection}
          onClick={(e) => {
            if (outSection.current === e.target) {
              setMenuBtnClick(false);
            }
          }}>
          <MenuModalBody>
            {menuLists.map((it) => (
              <div
                key={it.menu_id}
                className="single-menu"
                onClick={() => {
                  it.link === "/logout" ? handleLogout() : navigate(it.link);
                }}>
                {it.text}
              </div>
            ))}
          </MenuModalBody>
        </MenuModalWrapper>
      ) : null}
    </>
  );
};

export default MenuModal;
