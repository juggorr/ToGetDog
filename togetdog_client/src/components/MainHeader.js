import React from "react";
import { Link } from "react-router-dom";
import {
  faHouse,
  faMagnifyingGlass,
  faBell,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Span, Nav, DivContainer, NotoSans, Div } from "../styles/MainHeaderEmotion";

function Navbar() {
  return (
    <>
      <Nav className="navbar">
        <DivContainer>
          <Div>
            <FontAwesomeIcon icon={faHouse} />
            <NotoSans>역삼동</NotoSans>
          </Div>
          <Div>
            <Link to="/createBoard" className="nav-links">
              <Span>
                <FontAwesomeIcon icon={faSquarePlus} />
              </Span>
            </Link>
            <Link to="/searchBar" className="nav-links">
              <Span>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Span>
            </Link>
            <Link to="/notifications" className="nav-links">
              <Span>
                <FontAwesomeIcon icon={faBell} />
              </Span>
            </Link>
          </Div>
        </DivContainer>
      </Nav>
    </>
  );
}

export default Navbar;