import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, userState } from "../recoil";
import axios from "axios";

import { BACKEND_URL } from "../config";
import {
  MapContainer,
  PlaceIconWrapper,
  SinglePlaceWrapper,
  PlaceButtonWrapper,
  PlaceModal,
} from "../styles/MapEmotion";
import { MainColorShortBtn } from "../styles/BtnsEmotion";
import dogHospital from "../assets/dog_hospital.png";
import dogService from "../assets/dog_service.png";
import dogRestaurant from "../assets/dog_restaurant.png";
import dogFacility from "../assets/dog_facility.png";
import { useNavigate } from "react-router-dom";

const SinglePlace = ({ facility }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let placeIcon;
  let placeIconSrc;

  if (facility.type === "반려의료") {
    placeIconSrc = dogHospital;
    placeIcon = <PlaceIconWrapper src={dogHospital} alt="hospital_img" />;
  } else if (facility.type === "반려동물 서비스") {
    placeIconSrc = dogService;
    placeIcon = <PlaceIconWrapper src={dogService} alt="service_img" />;
  } else if (facility.type === "반려동물식당카페") {
    placeIconSrc = dogRestaurant;
    placeIcon = <PlaceIconWrapper src={dogRestaurant} alt="restaurant_img" />;
  } else {
    placeIconSrc = dogFacility;
    placeIcon = <PlaceIconWrapper src={dogFacility} alt="etc_img" />;
  }

  const SinglePlaceModal = () => {
    return (
      <PlaceModal>
        <div className="modalOutside" onClick={() => setModalOpen(false)}></div>
        <div className="modalInside">
          <div className="facilityNameContainer">
            <div className="facilityIconWrapper">
              <img className="singleIcon" src={placeIconSrc} alt="placeIcon" />
            </div>
            <div className="facilityNameWrapper">
              <p className="facilityName">{facility.facilityName}</p>
              <p className="placeText">
                {facility.distance < 1
                  ? `${facility.distance * 1000}m`
                  : `${facility.distance}km`}{" "}
              </p>
            </div>
          </div>
          <div className="facilityInfoContainer">
            <div className="facilityInfo">
              <span className="boldText">연락처: </span>
              <span className="plainText">{facility.phone}</span>
            </div>
            <div className="facilityInfo">
              <span className="boldText">주소: </span>
              <span className="plainText">{facility.facilityAddress}</span>
            </div>
            <div className="facilityInfo">
              <span className="boldText">영업시간: </span>
              <span className="plainText">{facility.openingHours}</span>
            </div>
            <div className="facilityInfo">
              <span className="boldText">휴무일: </span>
              <span className="plainText">{facility.closedDays}</span>
            </div>
          </div>
          <div className="btnContainer">
            <MainColorShortBtn onClick={() => setModalOpen(false)}>
              확인
            </MainColorShortBtn>
          </div>
        </div>
        <div className="modalOutside" onClick={() => setModalOpen(false)}></div>
      </PlaceModal>
    );
  };

  return (
    <SinglePlaceWrapper>
      {modalOpen && <SinglePlaceModal setModalOpen={setModalOpen} />}
      <div className="placeWrapper" onClick={() => setModalOpen(true)}>
        <div className="placeIconDiv">{placeIcon}</div>
        <div className="placeDiv">
          <p className="placeName">{facility.facilityName}</p>
          <p className="placeText">
            {facility.distance < 1
              ? `${facility.distance * 1000}m`
              : `${facility.distance}km`}{" "}
            | {facility.facilityAddress}
          </p>
        </div>
      </div>
    </SinglePlaceWrapper>
  );
};

const Map = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);

  const [curLat, setCurLat] = useState(37.56679717791351);
  const [curLng, setCurLng] = useState(126.97868056416682);

  const [selectPlace, setSelectPlace] = useState("all");
  const [facilities, setFacilities] = useState(null);

  const { kakao } = window;

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuth(null);
    console.log("로그아웃이 정상적으로 처리되었습니다.");
    navigate("/login");
  };

  useEffect(() => {
    if (!auth || !localStorage.getItem("recoil-persist")) {
      navigate("/login");
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(user.address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setCurLat(result[0].y);
        setCurLng(result[0].x);
      } else {
        alert("사용자의 기본 주소를 불러올 수 없습니다.");
      }
    });
  }, []);

  const GetFacilities = (lat, lng) => {
    const fetchFacilities = async () => {
      try {
        setFacilities(null);
        const response = await axios.get(
          `${BACKEND_URL}/facility?latitude=${lat}&longitude=${lng}`,
          {
            headers: {
              Authorization: auth,
            },
          }
        );
        const arr = response.data.storeList;

        arr.sort((a, b) => {
          return a.distance - b.distance;
        });
        setFacilities(arr);
      } catch (error) {
        if (error.response.status === 404) {
          navigate("/*");
        } else if (error.response.status === 401) {
          alert("자동 로그아웃되었습니다.");
          handleLogout();
        }
      }
    };

    fetchFacilities();
  };

  const curLocation = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치 얻기
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurLat(position.coords.latitude);
        setCurLng(position.coords.longitude);
        GetFacilities(position.coords.latitude, position.coords.longitude);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때
      // 그냥 사용자 주소로 설정 (처리 안함)
    }
  };

  //처음 지도 그리기
  useEffect(() => {
    if (!auth || !localStorage.getItem("recoil-persist")) {
      navigate("/login");
      return;
    }

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

    const setMarkers = () => {
      const hospitalPositions = [];
      const servicePositions = [];
      const restaurantPositions = [];
      const allPositions = [];

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
          const markerImageSrc = dogHospital;
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
          const markerImageSrc = dogService;
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
          const markerImageSrc = dogRestaurant;
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
          const markerImageSrc = dogFacility;
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
      for (let i = 0; i < facilities.length; i++) {
        const curFacility = (
          <SinglePlace
            key={facilities[i].facilityId}
            facility={facilities[i]}
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
            onClick={() => setSelectPlace("반려의료")}>
            <PlaceIconWrapper src={dogHospital} alt="hospital_img" />
          </span>
          <span
            className="placeButtons"
            onClick={() => setSelectPlace("반려동물 서비스")}>
            <PlaceIconWrapper src={dogService} alt="service_img" />
          </span>
          <span
            className="placeButtons"
            onClick={() => setSelectPlace("반려동물식당카페")}>
            <PlaceIconWrapper src={dogRestaurant} alt="restaurant_img" />
          </span>
          <span className="placeButtons" onClick={() => setSelectPlace("all")}>
            <PlaceIconWrapper src={dogFacility} alt="etc_img" />
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
