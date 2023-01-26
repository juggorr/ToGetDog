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

export const PlaceWrapper = styled.div``;

export const SinglePlaceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px 0px;

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
