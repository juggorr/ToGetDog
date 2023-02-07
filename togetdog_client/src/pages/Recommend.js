import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import axios from "axios";

import { BACKEND_URL, DUMMY_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownWrapper,
  FriendListWrapper,
  CheckBoxWrapper,
} from "../styles/RecommendEmotion";
import { DogImgWrapper } from "../styles/CreateAppointmentEmotion";
import OrangeCharacterBtn from "../components/OrangeCharacterBtn";
import YellowCharacterBtn from "../components/YellowCharacterBtn";
import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";

const SingleFriend = ({ item }) => {
  const navigate = useNavigate();

  const dogTown = (town) => {
    const townData = town.split(" ");
    return <p className="dogTown">{townData[townData.length - 1]}</p>;
  };

  return (
    <div className="singleDog" onClick={() => navigate(`/feed/${item.userId}`)}>
      <DogImgWrapper>
        <div className="dogProfileCircle">
          <img src={item.dogProfile} alt="dog_img" className="dogProfileImg" />
        </div>
      </DogImgWrapper>
      <div className="dogInfo">
        <div className="dogNameWrapper">
          <p className="dogName">{item.dogName}</p>
          {dogTown(item.address)}
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
              src={item.dogGender === "female" ? Boy : Girl}
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
              item.dogCharacter1 === "obedient" ? "순종적" : "비순종적"
            }`}
          />
          <YellowCharacterBtn
            text={`#${item.dogCharacter2 === "active" ? "활동적" : "비활동적"}`}
          />
        </div>
      </div>
    </div>
  );
};

const FriendsList = ({ friends }) => {
  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [render, setRender] = useState(false);

  const issues = [...Array(4).keys()];
  const characters = ["순종적", "비순종적", "활동적", "비활동적"];

  const Issue = ({ issue, idx }) => {
    const [bChecked, setChecked] = useState(checkedItems[idx]);
    const checkHandler = ({ target }) => {
      setChecked(!bChecked);
      checkedItemHandler(issue, target.checked);
    };

    return (
      <div>
        <input
          type="checkbox"
          checked={bChecked}
          onChange={(e) => checkHandler(e)}
        />
      </div>
    );
  };

  const checkedItemHandler = (id) => {
    let tempCheckedItems = checkedItems;
    tempCheckedItems[id] = !tempCheckedItems[id];
    setCheckedItems(tempCheckedItems);
    setRender(!render);
  };

  const renderFriends = () => {
    const tempFilter = [];
    if (friends) {
      for (let i = 0; i < friends.length; i++) {
        const tempFriend = (
          <SingleFriend key={i} item={friends[i]}></SingleFriend>
        );
        if (
          !checkedItems[0] &&
          !checkedItems[1] &&
          !checkedItems[2] &&
          !checkedItems[3]
        ) {
          tempFilter.push(tempFriend);
        } else if (checkedItems[0] && friends[i].dogCharacter1 === "obedient") {
          tempFilter.push(tempFriend);
        } else if (
          checkedItems[1] &&
          friends[i].dogCharacter1 === "disobedient"
        ) {
          tempFilter.push(tempFriend);
        } else if (checkedItems[2] && friends[i].dogCharacter2 === "active") {
          tempFilter.push(tempFriend);
        } else if (checkedItems[3] && friends[i].dogCharacter2 === "inactive") {
          tempFilter.push(tempFriend);
        }
      }
    }
    return tempFilter;
  };

  return (
    <FriendListWrapper>
      <CheckBoxWrapper>
        {issues.map((issue, idx) => (
          <div className="checkBox" key={idx}>
            <div>{characters[idx]}</div>
            <Issue issue={issue} idx={idx}></Issue>
          </div>
        ))}
      </CheckBoxWrapper>
      {renderFriends()}
    </FriendListWrapper>
  );
};

const Recommend = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userData, setUserData] = useState();
  const [view, setView] = useState(false);
  const [currentDog, setCurrentDog] = useState(0);
  const [currentDogName, setCurrentDogName] = useState();
  const [friends, setFriends] = useState();

  useEffect(() => {
    axios
      .get(`${DUMMY_URL}/user/includesDog/${user.userId}`, {})
      .then((response) => {
        setUserData(response.data);
        setCurrentDog(response.data.dogs[0].dogId);
        setCurrentDogName(response.data.dogs[0].dogName);
      })
      .catch((error) => {
        // 오류발생시 실행
      });
  }, []);

  useEffect(() => {
    axios
      .post(`${DUMMY_URL}/meeting/recommend`, null, {
        params: { dogId: currentDog },
      })
      .then((response) => {
        setFriends(response.data.dogs);
      })
      .catch((error) => {
        // 오류발생시 실행
      });
  }, [currentDog]);

  const onClick = (item) => {
    setCurrentDog(item.dogId);
    setCurrentDogName(item.dogName);
  };

  const Dropdown = () => {
    return (
      <div className="dropdownListWrapper">
        {userData.dogs.map((item, idx) => (
          <div className="dropdownList" onClick={() => onClick(item)} key={idx}>
            <li className="dropdownText ">{item.dogName}</li>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <DropdownWrapper>
        <ul onClick={() => setView(!view)} className="dropdown">
          <div className="dropdownListHeader">
            <span className="dropdownText">{currentDogName}</span>
            <div className="iconWrapper">
              <FontAwesomeIcon icon={view ? "fa-caret-up" : "fa-caret-down"} />
            </div>
          </div>
          {view && <Dropdown />}
        </ul>
        <p className="plainText">의 산책 친구들</p>
      </DropdownWrapper>
      {friends ? <FriendsList friends={friends}></FriendsList> : null}
    </div>
  );
};

export default Recommend;
