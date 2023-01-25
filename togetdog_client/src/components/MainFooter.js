import React, { useState } from "react";
// import "./../styles/MainFooter.css";
import { Link } from "react-router-dom";
// 사용할 아이콘 import
import "./FontAwesome";
// FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// styled
import { Wrapper, DivContainer } from "../styles/MainFooterEmotion";


const BottomBar = () => {
  const [activeNav, setActiveNav] = useState(1);
  return (
    <Wrapper>
      <DivContainer>
        <div className="nested">
          <Link to="/Map" className="nav-link" onClick={() => setActiveNav(1)}>
            <span>
              <FontAwesomeIcon
                icon="compass"
                className={activeNav === 1 ? "nav-item active" : "nav-item"}
              />
            </span>
          </Link>
        </div>
        <div className="nested">
        <Link to="/Walk" className="nav-link" onClick={() => setActiveNav(2)}>
          <span>
            <FontAwesomeIcon
              icon="dog"
              className={activeNav === 2 ? "nav-item active" : "nav-item"}
            />
          </span>
        </Link>
        </div>
        <div className="nested">
          <Link to="/Home" className="nav-link" onClick={() => setActiveNav(3)}>
            <span>
              <FontAwesomeIcon
                icon="home"
                className={activeNav === 3 ? "nav-item active" : "nav-item"}
              />
            </span>
          </Link>
        </div>
        <div className="nested">
          <Link to="/DM" className="nav-link" onClick={() => setActiveNav(4)}>
            <span>
              <FontAwesomeIcon
                icon="comment-dots"
                className={activeNav === 4 ? "nav-item active" : "nav-item"}
              />
            </span>
          </Link>
        </div>
        <div className="nested">
          <Link to="/MyFeed" className="nav-link" onClick={() => setActiveNav(5)}>
            <span>
              <FontAwesomeIcon
                icon="user"
                className={activeNav === 5 ? "nav-item active" : "nav-item"}
              />
            </span>
          </Link>
        </div>
      </DivContainer>
    </Wrapper>
  );
};

export default BottomBar;