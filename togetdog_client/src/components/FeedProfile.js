import {
  FeedProfileTop,
  FeedProfileBottom,
  MainDogImg,
  SubDogImg,
} from "../styles/FeedEmotion";

import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";
import MenuIcon from "../assets/menu_icon.png";
import OrangeCharacterBtn from "./OrangeCharacterBtn";
import YellowCharacterBtn from "./YellowCharacterBtn";
import { PlusBtn } from "../styles/BtnsEmotion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FeedProfile = ({ menuBtnClick, setMenuBtnClick, data }) => {
  const navigate = useNavigate();
  console.log(data);
  const dogs = data.dogs;
  console.log(data + "여기");
  console.log(dogs + "멍멍");
  let currentDog = dogs[0];
  let neutered = currentDog.dogNeutered ? "중성화" : "중성화 X";
  let character1 =
    currentDog.dogCharacter1 === "obedient" ? "순종적" : "비순종적";
  let character2 =
    currentDog.dogCharacter2 === "active" ? "활동적" : "비활동적";
  let ageMonth = currentDog.dogAge;
  let ageYear =
    ageMonth >= 12 ? `${Math.floor(ageMonth / 12)}살` : `${ageMonth}개월`;

  let subDogs = [];
  if (dogs.length > 1) {
    dogs.map((dog) => {
      if (dog.dogId !== currentDog.dogId) {
        subDogs.push(dog);
      }
    });
  }

  useEffect(() => {
    console.log(data + "여여여기");
  }, []);

  return (
    <>
      {/* 프로필 상단 */}
      <FeedProfileTop>
        <MainDogImg src={currentDog.dogProfile}></MainDogImg>
        <div className="dog-info-box">
          <div>{currentDog.dogName}</div>
          <div className="dog-info">
            {`${currentDog.dogType} / ${ageYear}`}
            {currentDog.dogGender === "male" ? (
              <img src={Boy} className="dog-gender" />
            ) : (
              <img src={Girl} className="dog-gender" />
            )}
          </div>
        </div>
        <div className="sub-dogs">
          {subDogs.map((subdog) => (
            <SubDogImg src={subdog.dogProfile} key={subdog.dogId} />
          ))}
          {dogs.length === 3 ? null : (
            <PlusBtn onClick={() => navigate("/dogregister")}>+</PlusBtn>
          )}
        </div>
        <div className="profile-etc-wrapper">
          <img
            src={MenuIcon}
            className="menu-icon"
            onClick={() => setMenuBtnClick(true)}
          />
          <div className="follow-info flex-column">
            <div>
              <span className="follow-text">팔로워</span>
              {currentDog.dogFollwerCnt}
            </div>
            <div>
              <span className="follow-text">팔로잉</span>
              {data.followCnt}
            </div>
          </div>
        </div>
      </FeedProfileTop>
      {/* 특이사항, 성격 들어가는 부분 */}
      <FeedProfileBottom>
        <div className="special-text">{currentDog.description}</div>
        <div className="characters-box">
          <OrangeCharacterBtn text={`#${neutered}`} />
          <YellowCharacterBtn text={`#${character1}`} />
          <YellowCharacterBtn text={`#${character2}`} />
        </div>
      </FeedProfileBottom>
    </>
  );
};

export default FeedProfile;
