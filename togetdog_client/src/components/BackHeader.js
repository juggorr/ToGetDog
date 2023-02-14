import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BackHeaderWrapper, PositionDiv } from "../styles/MainHeaderEmotion";
import { useNavigate } from "react-router";

const BackHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <BackHeaderWrapper>
        <div className="back-arrow-box" onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            className="back-arrow"
            icon="fa-solid fa-arrow-left"
          />
        </div>
      </BackHeaderWrapper>
      <PositionDiv></PositionDiv>
    </>
  );
};

export default BackHeader;
