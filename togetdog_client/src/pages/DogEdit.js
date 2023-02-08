import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import Select from "react-select";
import axios from "axios";

import { BACKEND_URL, DUMMY_URL } from "../config";

import { MainColorLongBtn } from "../styles/BtnsEmotion";
import DoubleOptionBtn from "../components/DoubleOptionBtn";
import { 
  RegisterContainer,
  RegisterWrapper, 
  ProfileImage,
  AddImage,
  InputWrapper
} from "../styles/DogRegisterEmotion";


const nameRegexp = /^[가-힣]{1,5}$/;
// 강아지 성별 선택 옵션들
const sexBtnList = [
  {
    btn_id: 1,
    text: "왕자님"
  },
  {
    btn_id: 2,
    text: "공주님"
  },
];
// 강아지 성별 선택 옵션들
const neuterdBtnList = [
  {
    btn_id: 1,
    text: "했어요"
  },
  {
    btn_id: 2,
    text: "안 했어요"
  },
];
// 강아지 성격1 선택 옵션들
const char1BtnList = [
  {
    btn_id: 1,
    text: "순종적"
  },
  {
    btn_id: 2,
    text: "독립적"
  },
];
// 강아지 성격2 선택 옵션들
const char2BtnList = [
  {
    btn_id: 1,
    text: "활동적"
  },
  {
    btn_id: 2,
    text: "비활동적"
  },
];


function DogEdit() {
  const navigate = useNavigate();
  
  // 견종 리스트 public/breeds.txt에서 불러오기
  const[breedList, setBreedList] = useState([]);
  // render될 때 비동기로 breeds.txt breedsList에 저장
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('./breeds.txt');
      const text = await res.data.split('\r\n');
      // breedList형식 {value: 'value', label: 'value'}으로 바꾸기
      const arr = await text.map((item) => {
        return { value: `${item}`, label: `${item}` }
      })
      setBreedList(arr);
    }
    fetchData();
  }, [])

  const dogId = 1;
  const [dogData, setDogData] = useState();
  
  useEffect(() => {
    axios
    .get(`${DUMMY_URL}/dog/${dogId}`)
    .then((res) => {
      setDogData(res.data)
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    });
  }, []);

  const oldImg = dogData.dog.dogProfile;
  const oldImgURL = URL.createObjectURL(oldImg)
  const oldName = dogData.dog.dogName;
  const oldSex = dogData.dog.dogGender;
  const oldBreed = dogData.dog.dogType;
  const oldAge = dogData.dog.dogAge;
  const oldWeight = dogData.dog.dogWeight;
  const oldNeutered = dogData.dog.dogNeutered;
  const oldObedient = dogData.dog.dogCharacter1;
  const oldActive = dogData.dog.dogCharacter2;
  const oldPerk = dogData.dog.description;


  return(
    <RegisterContainer>
      <RegisterWrapper>
        <ProfileImage
          image={oldImgURL}
        >
          {/* 사진 등록 */}
          <AddImage>
            <label htmlFor="imgUp">
              <div className="label-div" />
            </label>
          </AddImage>
          <input 
            type="file"
            id="imgUp"
            className="input-file"
            accept="image/jpg, image/png, image/jpeg"
            // onChange={handleImage} 
          />
        </ProfileImage>
        {/* 이름 입력 */}
        <InputWrapper>
          <div className="input-title">
            이름
            <span className="red-dot">*</span>
          </div>
          <div className="horizontal-flex">
            <div className="input-box general-input-box">
              <input
                name="name"
                className="string-input"
                type="text"
                placeholder={oldName}
                // value={name}
                // onChange={handleName}  
              />
            </div>
          </div>
          {/* <div className={nameError ? 'success' : 'error'}>{nameErrorMsg}</div> */}
        </InputWrapper>
        {/* 성별 입력 */}
        <InputWrapper>
          <div className="input-title">
            성별
            <span className="red-dot">*</span>
          </div>
          <div className="horizontal-flex btn-list">
            {sexBtnList.map((it) => (
              <DoubleOptionBtn 
                key={it.btn_id}
                {...it}
                // onClick={handleSex}
                // isSelected={ it.btn_id === sex}
              />
            ))}
          </div>
        </InputWrapper>
        {/* 견종 입력 */}
        <InputWrapper>
          <div className="input-title">
            견종
            <span className="red-dot">*</span>
          </div>
          <Select
            defaultValue={oldBreed}
            // onChange={handleBreed}
            options={breedList}
          />
        </InputWrapper>
        {/* 생년 월 입력 */}
        <InputWrapper>
          <div className="age-div">
            <div className="input-title">
              출생 년 월
              <span className="red-dot">*</span>
            </div>
            <div className="horizontal-flex">
              <div className="input-box number-input-box">
                <input
                  name="year"
                  className="number-input"
                  type="number"
                  min="2000"
                  max="2023"
                  step="1"
                  placeholder="2022" 
                  // value={year}
                  // onChange={handleYear}
                />
              </div>
              <div className="year">년</div>
              <div className="input-box number-input-box">
                <input
                  name="month"
                  className="number-input"
                  type="number"
                  min="1"
                  max="12"
                  step="1"
                  placeholder="7"
                  // value={month}
                  // onChange={handleMonth}
                />
              </div>
              <div className="month">월</div>
            </div>
          </div>
          {/* <div className={yearError ? 'success' : 'error'}>{yearErrorMsg}</div>
          <div className={monthError ? 'success' : 'error'}>{monthErrorMsg}</div> */}
          <p className="small-font">정확히 모른다면 추정 나이를 입력해 주세요</p>
        </InputWrapper>
        {/* 몸무게 입력 */}
        <InputWrapper>
          <div className="input-title">몸무게<span className="red-dot">*</span></div>
          <div className="horizontal-flex">
            <div className="input-box number-input-box">
            <input
              name="weight"
              className="number-input"
              type="number"
              min="0"
              max="80"
              step="0.1" 
              placeholder={oldWeight} 
              // value={weight}
              // onChange={handleWeight}
            />
            </div>
            <div className="kilogram">kg</div>
          </div>
          {/* <div className={weightError ? 'success' : 'error'}>{weightErrorMsg}</div> */}
        </InputWrapper>
        {/* 중성화 여부 */}
        <InputWrapper>
          <div className="input-title">
            중성화 여부
            <span className="red-dot">*</span>
          </div>
          <div className="horizontal-flex btn-list">
            {neuterdBtnList.map((it) => (
              <DoubleOptionBtn 
                key={it.btn_id}
                {...it}
                // onClick={handleIsNeuterd}
                // isSelected={ it.btn_id === isNeuterd}
              />
            ))}
          </div>
        </InputWrapper>
        {/* 성격 */}
        <InputWrapper>
          <div className="input-title">
            성격
            <span className="red-dot">*</span>
          </div>
          <div className="horizontal-flex btn-list">
            {char1BtnList.map((it) => (
              <DoubleOptionBtn 
                key={it.btn_id}
                {...it}
                // onClick={handleIsObedient}
                // isSelected={ it.btn_id === isObedient}
              />
            ))}
          </div>
          <div className="horizontal-flex btn-list">
            {char2BtnList.map((it) => (
              <DoubleOptionBtn 
                key={it.btn_id}
                {...it}
                // onClick={handleIsActive}
                // isSelected={ it.btn_id === isActive}
              />
            ))}
          </div>
        </InputWrapper>
        {/* 특이사항 입력 */}
        <InputWrapper>
          <div className="input-title">특이사항</div>
          <div className="horizontal-flex">
            <div className="input-box general-input-box">
              <input 
                name="unique"
                className="string-input"
                type="text"
                placeholder={oldPerk}
                // value={perk}
                // onChange={handlePerk}  
              />
            </div>
          </div>
          <p className="small-font">특이사항은 20자 이내로 입력해주세요.</p>
        </InputWrapper>
        <div className="signup-desc">*표시는 필수 입력 값입니다.</div>
        {/* <div className={inputError ? null : 'error'}>{inputErrorMsg}</div> */}
        <div className="btn-wrapper">
          <MainColorLongBtn
            // onClick={handleRegister}
          >등록하기</MainColorLongBtn>
        </div>
        {/* 추후에 우리로고로 바꾸기 */}
        <div className="logo-div">
          <img src={process.env.PUBLIC_URL + 'favicon.ico'} alt="paw"></img>
        </div>
      </RegisterWrapper>
    </RegisterContainer>
  );
}

export default DogEdit;