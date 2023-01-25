import React, { useState } from "react";
// import "./../styles/MainFooter.css";
import { Link } from "react-router-dom";
// 사용할 아이콘 import
import "./FontAwesome";
// FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomBar = () => {
  const [activeNav, setActiveNav] = useState(1);
  return (
    <nav className="wrapper">
      <div>
        <Link to="/Map" className="nav-link" onClick={() => setActiveNav(1)}>
          <FontAwesomeIcon
            icon="compass"
            className={activeNav === 1 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
      <div>
        <Link to="/Walk" className="nav-link" onClick={() => setActiveNav(2)}>
          <FontAwesomeIcon
            icon="dog"
            className={activeNav === 2 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
      <div>
        <Link to="/Home" className="nav-link" onClick={() => setActiveNav(3)}>
          <FontAwesomeIcon
            icon="home"
            className={activeNav === 3 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
      <div>
        <Link to="/DM" className="nav-link" onClick={() => setActiveNav(4)}>
          <FontAwesomeIcon
            icon="comment-dots"
            className={activeNav === 4 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
      <div>
        <Link to="/MyFeed" className="nav-link" onClick={() => setActiveNav(5)}>
          <FontAwesomeIcon
            icon="user"
            className={activeNav === 5 ? "nav-item active" : "nav-item"}
          />
        </Link>
      </div>
    </nav>
  );
};

export default BottomBar;