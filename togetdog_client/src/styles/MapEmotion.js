import styled from "@emotion/styled";

export const MapContainer = styled.div`
  width: 100%,
  display: inline-block,
  marginLeft: 5px,
  marginRight: 5px,

  .mapSquare {
    width: 90%;
    height: 90%;
  }
`;

export const PlaceIconWrapper = styled.img`
  width: 30px;
  height: 30px;
`;

export const PlaceButtonWrapper = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .placeButtons {
    margin: 5px;
  }

  .currentLocation {
    width: 100px;
    height: 30px;
    background-color: #559968;
    border-radius: 20px;
    border: none;
    color: white;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

export const SinglePlaceWrapper = styled.div`
  .placeWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px 0px;
  }

  .placeIconDiv {
    width: 45px;
    height: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .placeDiv {
    margin-left: 12px;
  }
  .placeName {
    font-weight: bold;
    margin: 0px;
  }
  .placeText {
    font-size: 12px;
    color: #9d9d9d;
    margin: 0px;
  }
`;

export const PlaceModal = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  width: 100vw;
  height: 100vh;

  .modalInside {
    width: 18rem;
    background-color: #ffffff;
    padding: 2rem 1.5rem;
    border-radius: 2rem;
  }

  .modalOutside {
    width: 100%;
    height: 100%;
  }
`;
