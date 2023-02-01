import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from 'axios';

import { DUMMY_URL } from '../config';



import { MainColorLongBtn } from "../styles/BtnsEmotion";
import DoubleOptionBtn from "../components/DoubleOptionBtn";
import { 
  RegisterContainer,
  RegisterWrapper, 
  ProfileImage,
  InputWrapper
} from "../styles/DogRegisterEmotion";


function DogRegister() {

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
  

  // 이름, 5글자 이상 입력 불가
  const [name, setName] = useState('');
  const handleName = ({target: {value}}) => {
    setName(value.slice(0, 5));
  };

  // 성별 선택
  const [sex, setSex] = useState('');
  const handleSex = (e) => {
    setSex(e);
  };

  // 견종 선택
  const [breed, setBreed] = useState('');
  const handleBreed = (e) => {
    setBreed(e.value);
  }

  // 태어난 해, 4글자 이상 입력 불가
  const [year, setYear] = useState('');
  const handleYear = ({target: {value}}) => {
    setYear(value.slice(0, 4));
  };

  // 태어난 달, 2글자 이상 입력 불가
  const [month, setMonth] = useState('');
  const handleMonth = ({target: {value}}) => {
    setMonth(value.slice(0, 2));
  }

  // 나이 계산해주는 함수
  const [age, setAge] = useState(0);
  const ageCalculator = () => {
    if (year && month) {
      let thisYear = new Date().getFullYear();
      let thisMonth = new Date().getMonth() + 1;

      const months = (thisYear - year) * 12 + (thisMonth - month);
      setAge(months);
    };
  }

  // 몸무게, 4글자 이상 입력 불가
  const [weight, setWeight] = useState('');
  const handleWeight = ({target: {value}}) => {
    setWeight(value.slice(0, 4));
  };

  // 중성화 여부
  const [isNeuterd, setIsNeuterd] = useState('');
  const handleIsNeuterd = (e) => {
    setIsNeuterd(e);
  };

  // 순종적 여부
  const [isObedient, setIsObedient] = useState('');
  const handleIsObedient = (e) => {
    setIsObedient(e);
  };

  // 활동적 여부
  const [isActive, setIsActive] = useState('');
  const handleIsActive = (e) => {
    setIsActive(e);
  };

  // 특이사항, 20글자 이상 입력 불가
  const [perk, setPerk] = useState('');
  const handlePerk = ({target: {value}}) => {
    setPerk(value.slice(0, 20));
  };


  // 등록하기 버튼 누르면 POST 요청 보내기
  const clickRegister = async () => {
    ageCalculator();
    let sexStr = '';
    switch (sex) {
      case 1:
        sexStr = 'male';
        break;
      case 2:
        sexStr = 'female';
        break;
      default:
        sexStr = 'male';
    }
    
    await axios
      .post(
        `${DUMMY_URL}/dog`,
        {
          dogName: name,
          dogGender: sexStr,
          dogType: breed,
          dogAge: age,
          dogWeight: weight,
          dogNeutered: isNeuterd,
          dogCharacter1: isObedient,
          dogCharacter2: isActive,
          description: perk,
        },
      )
      .then((res) => {
        console.log('강아지등록..?')
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });
  }






  // 유효성 검사 및 강아지 등록
  // 1. 필수 입력사항 미 입력 시
  // 해당 버튼에 불이 들어오고 (useRef 사용)

  // 2. 해당 밸류가 적절하지 않은 경우
  // ex) 이름이 영어인 경우
  // ex) 몸무게 min, max
  // ex) 나이 min, max
  
  // 우선 '값을 입력하세요' 메시지 띄우기
  // 모두 통과하면 콘솔에 강아지가 등록되었습니다 메시지

  return (
    <RegisterContainer>
      <RegisterWrapper>
        <ProfileImage />
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
                placeholder="이름을 입력해 주세요" 
                value={name}
                onChange={handleName}  
              />
            </div>
          </div>
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
                onClick={handleSex}
                isSelected={ it.btn_id === sex}
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
            defaultValue={breed}
            onChange={handleBreed}
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
                  value={year}
                  onChange={handleYear}
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
                  value={month}
                  onChange={handleMonth}
                />
              </div>
              <div className="month">월</div>
            </div>
          </div>
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
              placeholder="12.7" 
              value={weight}
              onChange={handleWeight}
            />
            </div>
            <div className="kilogram">kg</div>
          </div>
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
                onClick={handleIsNeuterd}
                isSelected={ it.btn_id === isNeuterd}
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
                onClick={handleIsObedient}
                isSelected={ it.btn_id === isObedient}
              />
            ))}
          </div>
          <div className="horizontal-flex btn-list">
            {char2BtnList.map((it) => (
              <DoubleOptionBtn 
                key={it.btn_id}
                {...it}
                onClick={handleIsActive}
                isSelected={ it.btn_id === isActive}
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
                placeholder="특이사항을 입력해 주세요" 
                value={perk}
                onChange={handlePerk}  
              />
            </div>
          </div>
          <p className="small-font">특이사항은 20자 이내로 입력해주세요.</p>
        </InputWrapper>
        <div className="signup-desc">*표시는 필수 입력 값입니다.</div>
        <div className="btn-wrapper">
          <MainColorLongBtn
            onClick={clickRegister}
          >등록하기</MainColorLongBtn>
        </div>
        {/* 추후에 우리로고로 바꾸기 */}
        <div className="img-div">
          <img src={process.env.PUBLIC_URL + 'favicon.ico'} alt="paw"></img>
        </div>
      </RegisterWrapper>
    </RegisterContainer>
  );
}

export default DogRegister;