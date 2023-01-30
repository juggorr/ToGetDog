import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  MapContainer,
  PlaceIconWrapper,
  SinglePlaceWrapper,
  PlaceButtonWrapper,
} from "../styles/MapEmotion";

/*global kakao*/

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
  // const [map, setMap] = useState(null);
  // 초기 위치 설정 (추후 사용자 위치로 설정하면 됨)
  // const container = document.getElementById("map");
  const [curLat, setCurLat] = useState(37.501262);
  const [curLng, setCurLng] = useState(127.03962161);
  // const [options, setOptions] = useState({
  //   center: new kakao.maps.LatLng(curLat, curLng),
  // });
  // const [kakaoMap, setKakaoMap] = useState(
  //   new kakao.maps.Map(container, options)
  // );

  const [selectPlace, setSelectPlace] = useState("all");
  const [facilities, setFacilities] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const GetFacilities = (kakaoMap) => {
    const fetchFacilities = async () => {
      try {
        setFacilities(null);
        // setError(null);
        // setLoading(true);
        const response = await axios.get(
          `http://i8a807.p.ssafy.io:8081/dummy/facility?latitude=${curLat}&longitude=${curLng}`
        );
        setFacilities(response.data.storeList);
      } catch (e) {
        // setError(e);
      }
      // setLoading(false);
    };

    fetchFacilities();
  };

  const curLocation = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치 얻기
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurLat(position.coords.latitude);
        setCurLng(position.coords.longitude);
        GetFacilities();
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때
      // 그냥 사용자 주소로 설정
    }
  };

  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(curLat, curLng) };
    const kakaoMap = new kakao.maps.Map(container, options);
    // setOptions({ center: new kakao.maps.LatLng(curLat, curLng) });
    // setKakaoMap(new kakao.maps.Map(container, options));

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(curLat, curLng);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(kakaoMap);

    const setMarkers = () => {
      const hospitalPositions = [];
      const servicePositions = [];
      const restaurantPositions = [];
      const allPositions = [];
      // 테스트용 코드
      // hospitalPositions.push(
      //   new kakao.maps.LatLng(35.90728623800133, 127.76685537417795)
      // );
      // hospitalPositions.push(
      //   new kakao.maps.LatLng(37.50186640508174, 127.03941271324857)
      // );
      for (let i = 0; i < facilities.length; i++) {
        const newMarker = new kakao.maps.LatLng(
          facilities[i].latitude,
          facilities[i].longitude
        );
        if (facilities[i].type === "반려의료") {
          hospitalPositions.push(newMarker);
        } else if (facilities[i].type === "반려동물 서비스") {
          servicePositions.push(newMarker);
        } else if (facilities[i].type === "반려동물식당카페") {
          restaurantPositions.push(newMarker);
        } else {
          allPositions.push(newMarker);
        }
      }

      const hospitalMarkers = [], // 의료 마커 객체를 가지고 있을 배열입니다
        serviceMarkers = [], // 서비스 마커 객체를 가지고 있을 배열입니다
        restaurantMarkers = [], // 식당카페 마커 객체를 가지고 있을 배열입니다
        allMarkers = []; // 기타 마커 객체를 가지고 있을 배열입니다

      createHospitalMarkers(); // 의료 마커를 생성하고 의료 마커 배열에 추가합니다
      createServiceMarkers(); // 반려동물 서비스 마커를 생성하고 반려동물 서비스 마커 배열에 추가합니다
      createRestaurantMarkers(); // 식당카페 마커를 생성하고 식당카페 마커 배열에 추가합니다
      createAllMarkers();

      changeMarker("all"); // 지도에 전체 마커가 보이도록 설정합니다

      // 의료 마커를 생성하고 의료 마커 배열에 추가하는 함수입니다
      function createHospitalMarkers() {
        for (let i = 0; i < hospitalPositions.length; i++) {
          const markerImageSrc = "../../assets/first-aid-kit.png";
          const imageSize = new kakao.maps.Size(22, 26),
            imageOption = { offset: new kakao.maps.Point(27, 69) };

          // 마커이미지와 마커를 생성합니다
          const markerImage = new kakao.maps.MarkerImage(
            markerImageSrc,
            imageSize,
            imageOption
          );

          // 마커를 생성합니다
          const marker = new kakao.maps.Marker({
            position: hospitalPositions[i],
            image: markerImage, // 마커이미지 설정
          });

          // 생성된 마커를 의료 마커 배열에 추가합니다
          hospitalMarkers.push(marker);
        }
      }

      // 의료 마커들의 지도 표시 여부를 설정하는 함수입니다
      function setHospitalMarkers(kakaoMap) {
        for (let i = 0; i < hospitalMarkers.length; i++) {
          hospitalMarkers[i].setMap(kakaoMap);
        }
      }

      function createServiceMarkers() {
        for (let i = 0; i < servicePositions.length; i++) {
          const markerImageSrc = "../../assets/scissors.png";
          const imageSize = new kakao.maps.Size(22, 26),
            imageOption = { offset: new kakao.maps.Point(27, 69) };

          const markerImage = new kakao.maps.MarkerImage(
            markerImageSrc,
            imageSize,
            imageOption
          );

          const marker = new kakao.maps.Marker({
            position: servicePositions[i],
            image: markerImage,
          });

          serviceMarkers.push(marker);
        }
      }

      function setServiceMarkers(kakaoMap) {
        for (let i = 0; i < serviceMarkers.length; i++) {
          serviceMarkers[i].setMap(kakaoMap);
        }
      }

      function createRestaurantMarkers() {
        for (let i = 0; i < restaurantPositions.length; i++) {
          const markerImageSrc = "../../assets/cutlery.png";
          const imageSize = new kakao.maps.Size(22, 26),
            imageOption = { offset: new kakao.maps.Point(27, 69) };

          const markerImage = new kakao.maps.MarkerImage(
            markerImageSrc,
            imageSize,
            imageOption
          );

          const marker = new kakao.maps.Marker({
            position: restaurantPositions[i],
            image: markerImage,
          });

          restaurantMarkers.push(marker);
        }
      }

      function setRestaurantMarkers(kakaoMap) {
        for (let i = 0; i < restaurantMarkers.length; i++) {
          restaurantMarkers[i].setMap(kakaoMap);
        }
      }

      function createAllMarkers() {
        for (let i = 0; i < allPositions.length; i++) {
          const markerImageSrc = "../../assets/cutlery.png";
          const imageSize = new kakao.maps.Size(22, 26),
            imageOption = { offset: new kakao.maps.Point(27, 69) };

          const markerImage = new kakao.maps.MarkerImage(
            markerImageSrc,
            imageSize,
            imageOption
          );

          const marker = new kakao.maps.Marker({
            position: allPositions[i],
            image: markerImage,
          });

          allMarkers.push(marker);
        }
      }

      function setAllMarkers(kakaoMap) {
        for (let i = 0; i < allMarkers.length; i++) {
          allMarkers[i].setMap(kakaoMap);
        }
      }

      function changeMarker() {
        if (selectPlace === "반려의료") {
          // 의료 마커들만 지도에 표시하도록 설정합니다
          setHospitalMarkers(kakaoMap);
          setServiceMarkers(null);
          setRestaurantMarkers(null);
          setAllMarkers(null);
        } else if (selectPlace === "반려동물 서비스") {
          // 반려동물 서비스 마커들만 지도에 표시하도록 설정합니다
          setHospitalMarkers(null);
          setServiceMarkers(kakaoMap);
          setRestaurantMarkers(null);
          setAllMarkers(null);
        } else if (selectPlace === "반려동물식당카페") {
          // 식당카페 마커들만 지도에 표시하도록 설정합니다
          setHospitalMarkers(null);
          setServiceMarkers(null);
          setRestaurantMarkers(kakaoMap);
          setAllMarkers(null);
        } else {
          setHospitalMarkers(kakaoMap);
          setServiceMarkers(kakaoMap);
          setRestaurantMarkers(kakaoMap);
          setAllMarkers(kakaoMap);
        }
      }

      // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
      // marker.setMap(null);
    };

    if (facilities) {
      setMarkers();
    }
  }, [curLat, curLng, selectPlace, facilities]);

  const GetFacilityList = () => {
    const facilityList = [];

    if (facilities) {
      // 테스트용 코드
      // facilityList.push(
      //   <SinglePlace
      //     Name={"테스트용 장소"}
      //     Address={"전북 무주군 설천면 삼공리 942"}
      //     Type={"반려의료"}
      //     Distance={"2"}
      //   />
      // );
      // facilityList.push(
      //   <SinglePlace
      //     Name={"테스트용 장소2"}
      //     Address={"서울 강남구 역삼동 678-39"}
      //     Type={"반려의료"}
      //     Distance={"230"}
      //   />
      // );
      for (let i = 0; i < facilities.length; i++) {
        const curFacility = (
          <SinglePlace
            key={facilities[i].facilityId}
            Name={facilities[i].facilityName}
            Address={facilities[i].facilityAddress}
            Type={facilities[i].type}
            Distance={facilities[i].distance}
          />
        );

        if (selectPlace === "all") {
          facilityList.push(curFacility);
        } else if (
          selectPlace === "반려의료" &&
          facilities[i].type === "반려의료"
        ) {
          facilityList.push(curFacility);
        } else if (
          selectPlace === "반려동물 서비스" &&
          facilities[i].type === "반려동물 서비스"
        ) {
          facilityList.push(curFacility);
        } else if (
          selectPlace === "반려동물식당카페" &&
          facilities[i].type === "반려동물식당카페"
        ) {
          facilityList.push(curFacility);
        }
      }
    }
    return facilityList;
  };

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
      <div>{GetFacilityList()}</div>
    </div>
  );
};

export default Map;
