import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { MenuModalWrapper, MenuModalBody } from "../styles/ModalEmotion";

// menuList에는 menu_id, text, func가 담겨있음

const MenuModal = ({ menuLists, menuBtnClick, setMenuBtnClick }) => {
  const outSection = useRef();

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
              <div key={it.menu_id} className="single-menu" onClick={it.func}>
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
