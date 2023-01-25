import React from "react";
import { Link } from "react-router-dom";
import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavContainer } from "../styles/MainHeaderEmotion";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <NavContainer>
          <div className="navDiv">
            <FontAwesomeIcon icon="fa-solid fa-house" />
            <span className="notoSans">역삼동</span>
          </div>
          <div className="navDiv">
            <Link to="/createBoard" className="nav-links">
              <span className="navIcon">
                <FontAwesomeIcon icon="fa-solid fa-square-plus" />
              </span>
            </Link>
            <Link to="/searchBar" className="nav-links">
              <span className="navIcon">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </span>
            </Link>
            <Link to="/notifications" className="nav-links">
              <span className="navIcon">
                <FontAwesomeIcon icon="fa-solid fa-bell" />
              </span>
            </Link>
          </div>
        </NavContainer>
      </div>
    </>
  );
}

export default Navbar;
