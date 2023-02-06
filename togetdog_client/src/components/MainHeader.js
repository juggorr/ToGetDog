import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState } from "../recoil";

import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderWrapper } from "../styles/MainHeaderEmotion";

function Navbar() {
  const [user, setUser] = useRecoilState(userState);
  let dongName = "주소를 등록해주세요";

  if (user) {
    dongName = user.address.substring(user.address.lastIndexOf(" ") + 1);
  }

  const navigate = useNavigate();

  return (
    <>
      <HeaderWrapper>
        <div className="head-icon-wrapper head-left">
          <div className="dongName-box notoSans">
            <FontAwesomeIcon className="header-icon" icon="fa-solid fa-house" />
            {dongName}
          </div>
        </div>
        <div className="head-icon-wrapper head-right">
          <div className="icon-box" onClick={() => navigate("/new")}>
            <FontAwesomeIcon
              className="header-icon"
              icon="fa-solid fa-square-plus"
            />
          </div>
          <div className="icon-box" onClick={() => navigate("/search")}>
            <FontAwesomeIcon
              className="header-icon"
              icon="fa-solid fa-magnifying-glass"
            />
          </div>
          <div className="icon-box" onClick={() => navigate("/notifications")}>
            <FontAwesomeIcon className="header-icon" icon="fa-solid fa-bell" />
          </div>
        </div>
      </HeaderWrapper>
    </>
  );
}

export default Navbar;
