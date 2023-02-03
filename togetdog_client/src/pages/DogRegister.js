import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/user';
import Select from 'react-select';
import axios from 'axios';

import { DUMMY_URL, BACKEND_URL } from '../config';

import { MainColorLongBtn } from '../styles/BtnsEmotion';
import DoubleOptionBtn from '../components/DoubleOptionBtn';
import { RegisterContainer, RegisterWrapper, ProfileImage, AddImage, InputWrapper } from '../styles/DogRegisterEmotion';

const nameRegexp = /^[가-힣]{1,5}$/;
// 강아지 성별 선택 옵션들
const sexBtnList = [
  {
    btn_id: 'male',
    text: '왕자님',
  },
  {
    btn_id: 'female',
    text: '공주님',
  },
];
// 강아지 성별 선택 옵션들
const neuterdBtnList = [
  {
    btn_id: true,
    text: '했어요',
  },
  {
    btn_id: false,
    text: '안 했어요',
  },
];
// 강아지 성격1 선택 옵션들
const char1BtnList = [
  {
    btn_id: 'obedient',
    text: '순종적',
  },
  {
    btn_id: 'disobedient',
    text: '독립적',
  },
];
// 강아지 성격2 선택 옵션들
const char2BtnList = [
  {
    btn_id: 'active',
    text: '활동적',
  },
  {
    btn_id: 'inactive',
    text: '비활동적',
  },
];

function DogRegister() {
  const navigate = useNavigate();

  // 견종 리스트 public/breeds.txt에서 불러오기
  const [breedList, setBreedList] = useState([]);
  // render될 때 비동기로 breeds.txt breedsList에 저장
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('./breeds.txt');
      const text = await res.data.split('\n');
      // breedList형식 {value: 'value', label: 'value'}으로 바꾸기
      const arr = await text.map((item) => {
        return { value: `${item}`, label: `${item}` };
      });
      setBreedList(arr);
    }
    fetchData();
  }, []);

  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [yearError, setYearError] = useState(false);
  const [yearErrorMsg, setYearErrorMsg] = useState('');
  const [monthError, setMonthError] = useState(false);
  const [monthErrorMsg, setMonthErrorMsg] = useState('');
  // 미래시점 입력시 발생하는 err
  // const [ageError, setAgeError] = useState(false);
  // const [ageErrorMsg, setAgeErrorMsg] = useState('');
  const [weightError, setWeightError] = useState(false);
  const [weightErrorMsg, setWeightErrorMsg] = useState('');

  // 강아지 프로필 이미지 업로드
  const [imgURL, setImgURL] = useState('');
  const [image, setImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImgURL(URL.createObjectURL(file));
  };
  // 이름, 5글자 이상 입력 불가
  const [name, setName] = useState('');
  const handleName = ({ target: { value } }) => {
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
  };
  // 태어난 해, 4글자 이상 입력 불가
  const [year, setYear] = useState('');
  const handleYear = ({ target: { value } }) => {
    setYear(value.slice(0, 4));
  };
  // 태어난 달, 2글자 이상 입력 불가
  const [month, setMonth] = useState('');
  const handleMonth = ({ target: { value } }) => {
    setMonth(value.slice(0, 2));
  };
  // 나이 문자열형태로 바꾸기 함수 '202201'
  const [age, setAge] = useState('');
  const makeAge = async () => {
    if (year && month && month < 10) {
      const string = year.toString() + '0' + month.toString();
      await setAge(string);
      return;
    }
    if (year && month && month >= 10) {
      const string = year.toString() + month.toString();
      await setAge(string);
      return;
    }
  };
  // 몸무게, 4글자 이상 입력 불가
  const [weight, setWeight] = useState('');
  const handleWeight = ({ target: { value } }) => {
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
  const handlePerk = ({ target: { value } }) => {
    setPerk(value.slice(0, 20));
  };

  // female male
  // 몸무게 4자리 (1.23 가능)
  // 순종적 obedient disobedient
  // 활동적 active inactive

  // 유효성 검사 함수
  const checkValidation = () => {
    // 필수 입력 값들이 입력되었는지 확인
    if (!image || !name || !sex || !breed || !year || !month || !weight || !isNeuterd || !isObedient || !isActive) {
      setInputError(true);
      setInputErrorMsg('필수 값이 입력되지 않았습니다');
      return false;
    }
    // 이름 유효성 검사
    // 참 거짓 헷갈림..
    if (!nameRegexp.test(name)) {
      setNameError(true);
      setNameErrorMsg('이름은 한글로 1~5글자 입니다');
      return false;
    }
    // 년도 유효성 검사
    const checkYear = new Date().getFullYear();
    if (year < 2000 || year > checkYear) {
      setYearError(true);
      setYearErrorMsg('적절한 년도를 입력해 주세요');
      console.log('적절한 년도를 입력해 주세요');
      return false;
    }
    // 달 유효성 검사
    const checkMonth = new Date().getMonth() + 1;
    // 1월부터 12월까지 입력받기
    if (month < 1 || month > 13) {
      setMonthError(true);
      setMonthErrorMsg('적절한 월을 입력해 주세요');
      return false;
    }
    // 미래의 시점 입력 제한
    if (year === checkYear && month > checkMonth) {
      return false;
    }
    // 몸무게 유효성 검사
    if (weight < 0 || weight > 80) {
      setWeightError(true);
      setWeightErrorMsg('적절한 몸무게를 입력해 주세요');
      return false;
    }
    // 모두 통과하면 true 반환
    return true;
  };

  const sendPOST = async () => {
    const formData = new FormData();
    const dog = {
      dogName: name,
      dogGender: sex,
      dogType: breed,
      dogBirth: age,
      dogWeight: weight,
      dogNeutered: isNeuterd,
      dogCharacter1: isObedient,
      dogCharacter2: isActive,
      description: perk,
    };

    formData.append('dog', new Blob([JSON.stringify(dog)], { type: 'application/json' }));
    formData.append('dogProfile', image);

    // 폼데이터 확인
    // for (let key of formData.keys()) {
    //   console.log(key, ":", formData.get(key));
    // }
    await axios
      .post(`${BACKEND_URL}/dog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate('/dogregister');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 버튼누르면
  const handleRegister = () => {
    // 유효성 검사 통과 시
    if (checkValidation()) {
      // 나이 바꿔주기 (2022.07 => '202207')
      makeAge();
      // POST요청 보내기
      sendPOST();
    } else {
      console.log('정상 처리되지 않았음');
      return;
    }
  };

  return (
    <RegisterContainer>
      <RegisterWrapper>
        <ProfileImage image={imgURL}>
          {/* 사진 등록 */}
          <AddImage>
            <label htmlFor='imgUp'>
              <div className='label-div' />
            </label>
          </AddImage>
          <input
            type='file'
            id='imgUp'
            className='input-file'
            accept='image/jpg, image/png, image/jpeg'
            onChange={handleImage}
          />
        </ProfileImage>
        {/* 이름 입력 */}
        <InputWrapper>
          <div className='input-title'>
            이름
            <span className='red-dot'>*</span>
          </div>
          <div className='horizontal-flex'>
            <div className='input-box general-input-box'>
              <input
                name='name'
                className='string-input'
                type='text'
                placeholder='이름을 입력해 주세요'
                value={name}
                onChange={handleName}
              />
            </div>
          </div>
          <div className={nameError ? 'success' : 'error'}>{nameErrorMsg}</div>
        </InputWrapper>
        {/* 성별 입력 */}
        <InputWrapper>
          <div className='input-title'>
            성별
            <span className='red-dot'>*</span>
          </div>
          <div className='horizontal-flex btn-list'>
            {sexBtnList.map((it) => (
              <DoubleOptionBtn key={it.btn_id} {...it} onClick={handleSex} isSelected={it.btn_id === sex} />
            ))}
          </div>
        </InputWrapper>
        {/* 견종 입력 */}
        <InputWrapper>
          <div className='input-title'>
            견종
            <span className='red-dot'>*</span>
          </div>
          <Select defaultValue={breed} onChange={handleBreed} options={breedList} />
        </InputWrapper>
        {/* 생년 월 입력 */}
        <InputWrapper>
          <div className='age-div'>
            <div className='input-title'>
              출생 년 월<span className='red-dot'>*</span>
            </div>
            <div className='horizontal-flex'>
              <div className='input-box number-input-box'>
                <input
                  name='year'
                  className='number-input'
                  type='number'
                  min='2000'
                  max='2023'
                  step='1'
                  placeholder='2022'
                  value={year}
                  onChange={handleYear}
                />
              </div>
              <div className='year'>년</div>
              <div className='input-box number-input-box'>
                <input
                  name='month'
                  className='number-input'
                  type='number'
                  min='1'
                  max='12'
                  step='1'
                  placeholder='7'
                  value={month}
                  onChange={handleMonth}
                />
              </div>
              <div className='month'>월</div>
            </div>
          </div>
          <div className={yearError ? 'success' : 'error'}>{yearErrorMsg}</div>
          <div className={monthError ? 'success' : 'error'}>{monthErrorMsg}</div>
          <p className='small-font'>정확히 모른다면 추정 나이를 입력해 주세요</p>
        </InputWrapper>
        {/* 몸무게 입력 */}
        <InputWrapper>
          <div className='input-title'>
            몸무게<span className='red-dot'>*</span>
          </div>
          <div className='horizontal-flex'>
            <div className='input-box number-input-box'>
              <input
                name='weight'
                className='number-input'
                type='number'
                min='0'
                max='80'
                step='0.1'
                placeholder='12.7'
                value={weight}
                onChange={handleWeight}
              />
            </div>
            <div className='kilogram'>kg</div>
          </div>
          <div className={weightError ? 'success' : 'error'}>{weightErrorMsg}</div>
        </InputWrapper>
        {/* 중성화 여부 */}
        <InputWrapper>
          <div className='input-title'>
            중성화 여부
            <span className='red-dot'>*</span>
          </div>
          <div className='horizontal-flex btn-list'>
            {neuterdBtnList.map((it) => (
              <DoubleOptionBtn key={it.btn_id} {...it} onClick={handleIsNeuterd} isSelected={it.btn_id === isNeuterd} />
            ))}
          </div>
        </InputWrapper>
        {/* 성격 */}
        <InputWrapper>
          <div className='input-title'>
            성격
            <span className='red-dot'>*</span>
          </div>
          <div className='horizontal-flex btn-list'>
            {char1BtnList.map((it) => (
              <DoubleOptionBtn
                key={it.btn_id}
                {...it}
                onClick={handleIsObedient}
                isSelected={it.btn_id === isObedient}
              />
            ))}
          </div>
          <div className='horizontal-flex btn-list'>
            {char2BtnList.map((it) => (
              <DoubleOptionBtn key={it.btn_id} {...it} onClick={handleIsActive} isSelected={it.btn_id === isActive} />
            ))}
          </div>
        </InputWrapper>
        {/* 특이사항 입력 */}
        <InputWrapper>
          <div className='input-title'>특이사항</div>
          <div className='horizontal-flex'>
            <div className='input-box general-input-box'>
              <input
                name='unique'
                className='string-input'
                type='text'
                placeholder='특이사항을 입력해 주세요'
                value={perk}
                onChange={handlePerk}
              />
            </div>
          </div>
          <p className='small-font'>특이사항은 20자 이내로 입력해주세요.</p>
        </InputWrapper>
        <div className='signup-desc'>*표시는 필수 입력 값입니다.</div>
        <div className={inputError ? null : 'error'}>{inputErrorMsg}</div>
        <div className='btn-wrapper'>
          <MainColorLongBtn onClick={handleRegister}>등록하기</MainColorLongBtn>
        </div>
        {/* 추후에 우리로고로 바꾸기 */}
        {/* <div className="logo-div">
          <img src={process.env.PUBLIC_URL + 'favicon.ico'} alt="paw"></img>
        </div> */}
      </RegisterWrapper>
    </RegisterContainer>
  );
}

export default DogRegister;
