/*global kakao*/
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  PlaceIconWrapper,
  SinglePlaceWrapper,
  PlaceButtonWrapper,
} from "../styles/MapEmotion";

const SinglePlace = ({ Name, Address, Type, Distance }) => {
  let placeIcon;
  if (Type === "반려의료") {
    placeIcon = (
      <PlaceIconWrapper
        src="../../assets/first-aid-kit.png"
        alt="hospital_img"
      />
    );
  } else if (Type === "반려동물 서비스") {
    placeIcon = (
      <PlaceIconWrapper src="../../assets/scissors.png" alt="service_img" />
    );
  } else if (Type === "반려동물식당카페") {
    placeIcon = (
      <PlaceIconWrapper src="../../assets/cutlery.png" alt="restaurant_img" />
    );
  } else {
    placeIcon = (
      <PlaceIconWrapper src="../../assets/finish.png" alt="etc_img" />
    );
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
};

const Map = () => {
  const [map, setMap] = useState(null);
  // 초기 위치 설정 (추후 사용자 위치로 설정하면 됨)
  const [curLat, setCurLat] = useState(33.450701);
  const [curLng, setCurLng] = useState(126.570667);
  const [selectPlace, setSelectPlace] = useState("all");

  const curLocation = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치 얻기
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        setCurLat(lat);
        setCurLng(lon);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때
    }
  };

  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(curLat, curLng) };
    const kakaoMap = new kakao.maps.Map(container, options);

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(curLat, curLng);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(kakaoMap);

    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null);
  }, [curLat, curLng]);

  return (
    <div style={{ padding: "0px 20px" }}>
      <MapContainer>
        <div className="mapSquare">
          <div id="map" style={{ width: "100%", height: "324px" }}></div>
        </div>
      </MapContainer>
      <PlaceButtonWrapper>
        <div>
          <span
            className="placeButtons"
            onClick={() => setSelectPlace("반려의료")}
          >
            <PlaceIconWrapper
              src="../../assets/first-aid-kit.png"
              alt="hospital_img"
            />
          </span>
          <span
            className="placeButtons"
            onClick={() => setSelectPlace("반려동물 서비스")}
          >
            <PlaceIconWrapper
              src="../../assets/scissors.png"
              alt="service_img"
            />
          </span>
          <span
            className="placeButtons"
            onClick={() => setSelectPlace("반려동물식당카페")}
          >
            <PlaceIconWrapper
              src="../../assets/cutlery.png"
              alt="restaurant_img"
            />
          </span>
          <span className="placeButtons" onClick={() => setSelectPlace("all")}>
            <PlaceIconWrapper src="../../assets/finish.png" alt="etc_img" />
          </span>
        </div>
        <div>
          <button className="currentLocation" onClick={curLocation}>
            현재 위치
          </button>
        </div>
      </PlaceButtonWrapper>
      <div>
        {selectPlace === "all" || selectPlace === "반려의료" ? (
          // 전체 또는 의료서비스
          <SinglePlace
            Name="장소이름"
            Address="서울 강남구 테헤란로 234 뉴튼프라자 101호 (삼성동)"
            Type="반려의료"
            Distance="343"
          />
        ) : null}
        {selectPlace === "all" || selectPlace === "반려동물 서비스" ? (
          // 전체 또는 반려동물 서비스
          <SinglePlace
            Name="장소이름"
            Address="서울 강남구 테헤란로 234 뉴튼프라자 101호 (삼성동)"
            Type="반려동물 서비스"
            Distance="343"
          />
        ) : null}
        {selectPlace === "all" || selectPlace === "반려동물식당카페" ? (
          // 전체 또는 반려동물 식당 카페
          <SinglePlace
            Name="장소이름"
            Address="서울 강남구 테헤란로 234 뉴튼프라자 101호 (삼성동)"
            Type="반려동물식당카페"
            Distance="343"
          />
        ) : null}
        {selectPlace === "all" ? (
          // 전체(기타 포함)
          <SinglePlace
            Name="장소이름"
            Address="서울 강남구 테헤란로 234 뉴튼프라자 101호 (삼성동)"
            Type="기타분류"
            Distance="343"
          />
        ) : null}

        {/*
        api 개발 완료되면 정보 받아서 수정할 것
        */}
      </div>
    </div>
  );
};

export default Map;
