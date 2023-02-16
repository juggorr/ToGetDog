import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, userState } from "../recoil";
import { BACKEND_URL } from "../config";

import UserIcon from "../components/UserIcon";
import {
  SearchbarWrapper,
  SearchTabWrapper,
  ResultListWrapper,
  FriendListWrapper,
} from "../styles/SearchEmotion";
import { DogImgWrapper } from "../styles/CreateAppointmentEmotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrangeCharacterBtn from "../components/OrangeCharacterBtn";
import YellowCharacterBtn from "../components/YellowCharacterBtn";
import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";

const SingleFriend = ({ item }) => {
  const navigate = useNavigate();

  return (
    <FriendListWrapper>
      <div
        className="singleDog"
        onClick={() => navigate(`/feed/${item.userId}`)}>
        <DogImgWrapper>
          <div className="dogProfileCircle">
            <img
              src={"https://togetdog.site/image/dog/" + item.dogProfile}
              alt="dog_img"
              className="dogProfileImg"
            />
          </div>
        </DogImgWrapper>
        <div className="dogInfo">
          <div className="dogNameWrapper">
            <p className="dogName">{item.dogName}</p>
            <p className="ownerName">
              <FontAwesomeIcon icon="fa-user" /> {item.nickName}
            </p>
          </div>
          <div className="dogType">
            {item.dogType} /{" "}
            {item.dogAge < 12 ? item.dogAge : Math.floor(item.dogAge / 12)}
            {item.dogAge < 12 ? "개월" : "살"}
            <div className="genderWrapper">
              <img
                src={item.dogGender === "male" ? Boy : Girl}
                alt="gender"
                className="genderImg"
              />
            </div>
          </div>
          <div className="characters-box">
            <OrangeCharacterBtn
              text={`#${item.dogNeutered ? "중성화" : "중성화 X"}`}
            />
            <YellowCharacterBtn
              text={`#${
                item.dogCharacter1 === "obedient" ? "온순함" : "사나움"
              }`}
            />
            <YellowCharacterBtn
              text={`#${
                item.dogCharacter2 === "active" ? "활동적" : "비활동적"
              }`}
            />
          </div>
        </div>
      </div>
    </FriendListWrapper>
  );
};

const SingleUser = ({ item }) => {
  const navigate = useNavigate();

  const userTown = (town) => {
    const townData = town.split(" ");
    return townData[townData.length - 1];
  };

  const userAge = (birthyear) => {
    const currentYear = new Date().getFullYear();

    return Math.floor((currentYear - birthyear) / 10) * 10;
  };

  const userDogs = (dogs) => {
    let dogStr = "";
    if (dogs) {
      for (let i = 0; i < dogs.length; i++) {
        dogStr = dogStr + dogs[i];
        if (i + 1 !== dogs.length) {
          dogStr = dogStr + " / ";
        }
      }
    }
    return dogStr;
  };

  return (
    <FriendListWrapper>
      <div
        className="singleDog"
        onClick={() => navigate(`/feed/${item.userId}`)}>
        <UserIcon text={item.nickName}></UserIcon>
        <div className="dogInfo">
          <div className="dogNameWrapper">
            <p className="dogName">{item.nickName}</p>
          </div>
          <div className="dogType">{userDogs(item.userDogs)}</div>
          <div className="characters-box">
            <YellowCharacterBtn text={`#${userAge(item.birth)}대`} />
            <YellowCharacterBtn text={`#${userTown(item.address)}`} />
          </div>
        </div>
      </div>
    </FriendListWrapper>
  );
};

const ResultList = ({ tab, dogResult, userResult }) => {
  const dogRender = () => {
    const dogList = [];

    if (dogResult.length > 0) {
      for (let i = 0; i < dogResult.length; i++) {
        const singleDog = (
          <SingleFriend item={dogResult[i]} key={i}></SingleFriend>
        );
        dogList.push(singleDog);
      }
    } else {
      dogList.push(
        <p className="noResult" key={1}>
          검색 결과가 없습니다.
        </p>
      );
    }
    return dogList;
  };

  const userRender = () => {
    const userList = [];

    if (userResult.length > 0) {
      for (let i = 0; i < userResult.length; i++) {
        const singleUser = (
          <SingleUser item={userResult[i]} key={i}></SingleUser>
        );
        userList.push(singleUser);
      }
    } else {
      userList.push(
        <p key={1} className="noResult">
          검색 결과가 없습니다.
        </p>
      );
    }
    return userList;
  };

  return (
    <ResultListWrapper>
      {tab === 1 ? dogRender() : userRender()}
    </ResultListWrapper>
  );
};

const Search = () => {
  const auth = useRecoilValue(authAtom);
  const [user, setUser] = useRecoilState(userState);
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const [dogResult, setDogResult] = useState([]);
  const [userResult, setUserResult] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const keyword = useRef(useLocation().state.keyword);

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

    clickSearch();
  }, []);

  const SearchBar = () => {
    const navigate = useNavigate();

    const onChange = (e) => {
      keyword.current = e.target.value;
    };

    const onKeyPress = (e) => {
      if (e.key === "Enter") {
        clickSearch();
      }
    };

    return (
      <SearchbarWrapper>
        <div className="inside">
          <div onClick={() => navigate(-1)} className="iconWrapper">
            <FontAwesomeIcon icon="fa-arrow-left" />
          </div>
          <input
            type="search"
            className="searchInput"
            placeholder="검색어를 입력해주세요."
            defaultValue={keyword.current}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
          <div className="searchBtn" onClick={() => clickSearch()}>
            <FontAwesomeIcon icon="fa-magnifying-glass" />
          </div>
        </div>
      </SearchbarWrapper>
    );
  };

  const SearchTab = () => {
    return (
      <SearchTabWrapper>
        <div
          className={"singleTab " + (activeTab === 1 ? "active" : "disabled")}
          onClick={() => setActiveTab(1)}>
          <FontAwesomeIcon icon="dog"></FontAwesomeIcon>
        </div>
        <div
          className={"singleTab " + (activeTab === 2 ? "active" : "disabled")}
          onClick={() => setActiveTab(2)}>
          <FontAwesomeIcon icon="user"></FontAwesomeIcon>
        </div>
      </SearchTabWrapper>
    );
  };

  const clickSearch = async () => {
    if (keyword.current) {
      await axios
        .get(`${BACKEND_URL}/search/list`, {
          params: {
            content: keyword.current,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        })
        .then((response) => {
          setDogResult(response.data.dog);
          setUserResult(response.data.user);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 404) {
            navigate("/*");
          } else if (error.response.status === 401) {
            alert("자동 로그아웃되었습니다.");
            handleLogout();
          }
        });
    }
  };

  return (
    <div>
      <SearchBar></SearchBar>
      <SearchTab></SearchTab>
      <ResultList
        tab={activeTab}
        dogResult={dogResult}
        userResult={userResult}></ResultList>
    </div>
  );
};

export default Search;
