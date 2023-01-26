import React, { useState } from "react";
// import "./../styles/MainFooter.css";
import { Link } from "react-router-dom";
// 사용할 아이콘 import
import "./FontAwesome";
// FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// styled
import { FooterWrapper } from "../styles/MainFooterEmotion";


const MainFooter = () => {
  const [activeNav, setActiveNav] = useState(1);
  return (
    <FooterWrapper>
      <div className="icon-box">
        <Link to="/map" className="nav-link" onClick={() => setActiveNav(1)}>
          <FontAwesomeIcon
            icon="compass"
            className={activeNav === 1 ? "footer-icon active" : "footer-icon"}
          />
        </Link>
      </div>
      <div className="icon-box">
        <Link to="/walk" className="nav-link" onClick={() => setActiveNav(2)}>
          <FontAwesomeIcon
            icon="dog"
            className={activeNav === 2 ? "footer-icon active" : "footer-icon"}
          />
        </Link>
      </div>
      <div className="icon-box">
        <Link to="/" className="nav-link" onClick={() => setActiveNav(3)}>
          <FontAwesomeIcon
            icon="home"
            className={activeNav === 3 ? "footer-icon active" : "footer-icon"}
          />
        </Link>
      </div>
      <div className="icon-box">
        <Link to="/chat" className="nav-link" onClick={() => setActiveNav(4)}>
          <FontAwesomeIcon
            icon="comment-dots"
            className={activeNav === 4 ? "footer-icon active" : "footer-icon"}
          />
        </Link>
      </div>
      <div className="icon-box">
        <Link to="/feed" className="nav-link" onClick={() => setActiveNav(5)}>
          <FontAwesomeIcon
            icon="user"
            className={activeNav === 5 ? "footer-icon active" : "footer-icon"}
          />
        </Link>
      </div>
    </FooterWrapper>
  );
};

export default MainFooter;