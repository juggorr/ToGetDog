/*global kakao*/
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  PlaceWrapper,
  SinglePlaceWrapper,
} from "../styles/MapEmotion";
import "../components/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SinglePlace({ Name, Address, Type, Distance }) {
  let placeIcon;
  if (Type === "반려의료") {
    placeIcon = (
      <FontAwesomeIcon
        icon="fa-solid fa-house-chimney-medical"
        size="2x"
        color="#F24E1E"
      />
    );
  } else if (Type === "반려동물 서비스") {
    placeIcon = (
      <FontAwesomeIcon icon="fa-scissors" size="2x" color="#FF9A62" />
    );
  } else if (Type === "반려동물식당카페") {
    placeIcon = (
      <FontAwesomeIcon icon="fa-utensils" size="2x" color="#247abd" />
    );
  } else {
    placeIcon = <FontAwesomeIcon icon="fa-flag" size="2x" color="#009635" />;
  }

  return (
    <SinglePlaceWrapper>
      <div className="placeIconDiv">{placeIcon}</div>
      <div className="placeDiv">
        <p className="placeName">{Name}</p>
        <p className="placeText">
          {Distance}m | {Address}
        </p>
      </div>
    </SinglePlaceWrapper>
  );
}

const Map = () => {
  const [map, setMap] = useState(null);

  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
    const kakaoMap = new kakao.maps.Map(container, options);

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(kakaoMap);

    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null);
  }, []);

  return (
    <div style={{ padding: "0px 20px" }}>
      <MapContainer>
        <div className="mapSquare">
          <div id="map" style={{ width: "100%", height: "324px" }}></div>
        </div>
      </MapContainer>
      <PlaceWrapper>
        {/* <SinglePlace
          Name="장소이름"
          Address="서울 강남구 테헤란로 234 뉴튼프라자 101호 (삼성동)"
          Type="반려동물 서비스"
          Distance="343"
        /> 
        이런 식으로 받아온 장소 반복해서 쓰면 됨!
        */}
      </PlaceWrapper>
    </div>
  );
};

export default Map;
