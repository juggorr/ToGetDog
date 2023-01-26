import React from "react";
import { Link } from "react-router-dom";
import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderWrapper } from "../styles/MainHeaderEmotion";

function Navbar() {
  return (
    <>
      <HeaderWrapper>
        <div className="head-icon-wrapper">
          <div className="dongName-box notoSans">
            <FontAwesomeIcon
              className="header-icon"  
              icon="fa-solid fa-house"
            />
            역삼동
          </div>
        </div>
        <div className="head-icon-wrapper">
          <div className="icon-box">
            <Link to="/new">
              <FontAwesomeIcon 
                className="header-icon"
                icon="fa-solid fa-square-plus" 
              />
            </Link>
          </div>
          <div className="icon-box">
            <Link to="/search">
              <FontAwesomeIcon
                className="header-icon"
                icon="fa-solid fa-magnifying-glass"
              />
            </Link>
          </div>
          <div className="icon-box">
            <Link to="/alarm">
              <FontAwesomeIcon
                className="header-icon"
                icon="fa-solid fa-bell"
              />
            </Link>
          </div>
        </div>
      </HeaderWrapper>
    </>
  );
}

export default Navbar;
