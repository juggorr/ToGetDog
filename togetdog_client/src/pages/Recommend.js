import { useEffect, useRef, useState } from "react";
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

const FilteredFriends = (props) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const tempFilter = [];
    if (props.friends) {
      for (let i = 0; i < props.friends.length; i++) {
        if (props.checkedItems.size === 0) {
          tempFilter.push(props.friends[i]);
        } else if (
          props.checkedItems.has(0) &&
          props.friends[i].dogCharacter1 === "obedient"
        ) {
          tempFilter.push(props.friends[i]);
        } else if (
          props.checkedItems.has(1) &&
          props.friends[i].dogCharacter1 === "disobedient"
        ) {
          tempFilter.push(props.friends[i]);
        } else if (
          props.checkedItems.has(2) &&
          props.friends[i].dogCharacter2 === "active"
        ) {
          tempFilter.push(props.friends[i]);
        } else if (
          props.checkedItems.has(3) &&
          props.friends[i].dogCharacter2 === "inactive"
        ) {
          tempFilter.push(props.friends[i]);
        }
      }
    }
    console.log(tempFilter);
    setFilter(tempFilter);
  }, [props.checkedItems]);

  return (
    <div>
      {filter.map((item, idx) => (
        <SingleFriend key={idx} item={item}></SingleFriend>
      ))}
    </div>
  );
};

const FriendsList = ({ friends }) => {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const issues = [...Array(4).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const characters = ["순종적", "비순종적", "활동적", "비활동적"];

  const Issue = ({ issue }) => {
    const [bChecked, setChecked] = useState(false);
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

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    console.log(checkedItems);
  };

  return (
    <FriendListWrapper>
      <CheckBoxWrapper>
        {issues.map((issue, idx) => (
          <div className="checkBox" key={idx}>
            <div>{characters[idx]}</div>
            <Issue issue={issue}></Issue>
          </div>
        ))}
      </CheckBoxWrapper>
      <FilteredFriends
        friends={friends}
        checkedItems={checkedItems}
      ></FilteredFriends>
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
