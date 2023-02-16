import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom, userState } from '../recoil';
import Select from 'react-select';
import axios from 'axios';

import { BACKEND_URL } from '../config';

import NoEssentialsModal from '../components/AlertModal/NoEssentialsModal';
import { MainColorLongBtn } from '../styles/BtnsEmotion';
import DoubleOptionBtn from '../components/DoubleOptionBtn';
import { RegisterContainer, RegisterWrapper, ProfileImage, AddImage, InputWrapper } from '../styles/DogRegisterEmotion';
import BackHeader from '../components/BackHeader';

const nameRegexp = /^[가-힣]{1,5}$/;
const imageRegexp = /(.*?)\.(jpg|jpeg|png)$/;
const maxSize = 50 * 1024 * 1024;
// 강아지 성별 선택 옵션들
const genderBtnList = [
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
    btn_id: 1,
    text: '중성화',
  },
  {
    btn_id: 2,
    text: '중성화 X',
  },
];
// 강아지 성격1 선택 옵션들
const char1BtnList = [
  {
    btn_id: 'obedient',
    text: '온순함',
  },
  {
    btn_id: 'disobedient',
    text: '사나움',
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

function DogEdit() {
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userState);

  const navigate = useNavigate();
  const location = useLocation();
  const dogId = location.state;

  // 들어오면 강아지 정보 받아오기 & 현재 년, 월 받아오기
  const [dog, setDog] = useState({});
  useEffect(() => {
    if (!auth || !localStorage.getItem('recoil-persist') || !dog) {
      navigate('/');
      return;
    }

    axios
      .get(`${BACKEND_URL}/dog/${dogId}`)
      .then((res) => {
        console.log(res);
        setDog(res.data.dog);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  // placeholder들 받아오기
  const [imageHold, setImageHold] = useState('');
  // const [imageHoldURL, setImageHoldURL] = useState('');
  const [nameHold, setNameHold] = useState('');
  const [breedHold, setBreedHold] = useState('');
  const [ageHold, setAgeHold] = useState('');
  const [yearHold, setYearHold] = useState('');
  const [monthHold, setMonthHold] = useState('');
  const [weightHold, setWeightHold] = useState('');
  const [perkHold, setPerkHold] = useState('');
  useEffect(() => {
    // placeholder들을 기본값으로 설정해주는 부분
    setImage(dog.dogProfile);
    setName(dog.dogName);
    setBreed(dog.dogType);
    setWeight(dog.dogWeight);
    setPerk(dog.description);
    // 버튼들은 기본값을 주어야 placeholder 설정가능
    setSex(dog.dogGender);
    if (dog.dogNeutered) {
      setIsNeuterd(1);
    } else {
      setIsNeuterd(2);
    }
    setIsObedient(dog.dogCharacter1);
    setIsActive(dog.dogCharacter2);
    // placeholder 설정하기
    setImageHold(dog.dogProfile);
    setNameHold(dog.dogName);
    setBreedHold(dog.dogType);
    setAgeHold(dog.dogAge);
    setWeightHold(dog.dogWeight);
    setPerkHold(dog.description);
  }, [dog]);

  // age들어오면 강아지 태어난 년, 월 계산하기
  useEffect(() => {
    console.log(dog.dogAge);
    const result = parseInt(ageHold / 12);
    const remainder = ageHold % 12;
    console.log(remainder);
    let yearTemp = Number(new Date().getFullYear() - result);
    let monthTemp = Number(new Date().getMonth() + 1);
    console.log(monthTemp);
    // 월수 계산 위한 변수
    let x = monthTemp - remainder;

    if (x === monthTemp) {
      console.log(1);
      setYearHold(yearTemp);
      setMonthHold(monthTemp);
      setYear(String(yearTemp));
      setMonth(String(monthTemp));
      return;
    }
    if (x === 0 || x < 0) {
      console.log(2);
      setYearHold(yearTemp - 1);
      setMonthHold(12 + x);
      setYear(String(yearTemp - 1));
      setMonth(String(12 + x));
      return;
    }
    if (0 < x < monthTemp) {
      console.log(3);
      setYearHold(yearTemp);
      setMonthHold(x);
      setYear(String(yearTemp));
      setMonth(String(x));
      return;
    }
  }, [ageHold]);

  const [noEssentialsModal, setNoEssentialsModal] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [imageErrorMsg, setImageErrorMsg] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [yearError, setYearError] = useState(false);
  const [yearErrorMsg, setYearErrorMsg] = useState('');
  const [monthError, setMonthError] = useState(false);
  const [monthErrorMsg, setMonthErrorMsg] = useState('');
  // 미래시점 입력시 발생하는 err
  const [ageError, setAgeError] = useState(false);
  const [ageErrorMsg, setAgeErrorMsg] = useState('');
  const [weightError, setWeightError] = useState(false);
  const [weightErrorMsg, setWeightErrorMsg] = useState('');

  // 강아지 프로필 이미지 업로드
  const [imgURL, setImgURL] = useState('');
  const [image, setImage] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    // 사진 확장자 유효성 검사
    if (!imageRegexp.test(file.name)) {
      setImageError(true);
      setImageErrorMsg('사진 피알을 올려주세요.');
      return;
    }
    // 사진 용량 유효성 검사
    if (file.size > maxSize) {
      setImageError(true);
      setImageErrorMsg('50MB를 초과한 파일입니다.');
    } else {
      setImageError(false);
      setImageErrorMsg('');
      // 파일 새로 올리면 placeholder null로 바꿔서 올린 이미지 미리보기
      setImageHold(null);
      setImage(file);
      setImgURL(URL.createObjectURL(file));
    }
  };

  // 이름, 5글자 이상 입력 불가
  const [name, setName] = useState('');
  const handleName = (e) => {
    // 입력한 순간 저장된 이름을 없애야 오류 처리 가능
    setNameHold('');
    const name = e.target.value.slice(0, 5);
    if (!nameRegexp.test(name)) {
      // 정규식 통과못하면 !false = >true
      setNameError(true);
      setNameErrorMsg('이름은 한글1~5자');
    } else {
      setNameError(false);
      setNameErrorMsg('');
    }
    setName(name);
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

  // 태어난 해
  const [year, setYear] = useState('');
  const handleYear = (e) => {
    setYearHold('');
    // 4글자만 입력되도록 슬라이싱
    const year = e.target.value.slice(0, 4);
    // 기네스기록 + 3년 출생년도 등록 기준
    if (year < 1998 || year > new Date().getFullYear()) {
      setYearError(true);
      setYearErrorMsg('적절한 출생연도를 입력해주세요.');
    } else {
      setYearError(false);
      setYearErrorMsg('');
    }
    setYear(year);
  };

  // 태어난 달, 2글자 이상 입력 불가
  const [month, setMonth] = useState('');
  const handleMonth = (e) => {
    setMonthHold('');
    const month = e.target.value.slice(0, 2);
    if (month < 1 || month > 12) {
      setMonthError(true);
      setMonthErrorMsg('적절한 출생월을 입력해주세요.');
    } else {
      setMonthError(false);
      setMonthErrorMsg('');
    }
    setMonth(month);
  };

  // 미래 시점 입력못하게 검사하는 함수
  useEffect(() => {
    // console.log('감시하자')
    const handleAge = () => {
      if (month && year) {
        if (year === String(new Date().getFullYear()) && month > new Date().getMonth() + 1) {
          setAgeError(true);
          setAgeErrorMsg('미래 시점은 입력할 수 없습니다.');
        } else {
          setAgeError(false);
          setAgeErrorMsg('');
        }
      }
    };
    handleAge();
  }, [year, month]);

  // 몸무게, 4글자 이상 입력 불가
  const [weight, setWeight] = useState('');
  const handleWeight = (e) => {
    setWeightHold('');
    const weight = e.target.value.slice(0, 4);
    if (weight < 0 || weight > 90) {
      setWeightError(true);
      setWeightErrorMsg('적절한 몸무게를 입력해주세요.');
    } else {
      setWeightError(false);
      setWeightErrorMsg('');
    }
    setWeight(weight);
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
    setPerkHold('');
    setPerk(value.slice(0, 20));
  };

  // 유효성 검사 함수
  const checkValidation = () => {
    // 필수 입력 값들이 입력되었는지 확인
    if (!image || !name || !sex || !breed || !year || !month || !weight || !isNeuterd || !isObedient || !isActive) {
      setNoEssentialsModal(true);
      console.log(image);
      // setInputError(true);
      // setInputErrorMsg('필수 값이 입력되지 않았습니다');
      return false;
    }
    // 필수 값들이 입력되었고, 값에 에러가 없으면 통과!
    if (!imageError && !nameError && !yearError && !monthError && !weightError && !ageError) {
      return true;
    } else {
      return false;
    }
  };

  const sendPUT = async () => {
    const formData = new FormData();
    let newBirth = month;
    if (month < 10 && month.length === 1) {
      newBirth = year + '0' + month;
    } else {
      newBirth = year + month;
    }

    // isNeuterd 설정
    let neuterdBoolean = null;
    switch (isNeuterd) {
      case 1:
        neuterdBoolean = true;
        break;
      default:
        neuterdBoolean = false;
    }

    const dog = {
      dogId: dogId,
      dogName: name,
      dogGender: sex,
      dogType: breed,
      dogBirth: newBirth,
      dogWeight: weight,
      dogNeutered: neuterdBoolean,
      dogCharacter1: isObedient,
      dogCharacter2: isActive,
      description: perk,
    };

    console.log(dog);

    formData.append('dog', new Blob([JSON.stringify(dog)], { type: 'application/json' }));
    if (!imageHold) {
      formData.append('dogProfile', image);
    }

    // console.log(formData.get("dog"));

    // 폼데이터 확인
    for (let key of formData.keys()) {
      console.log(key, ':', formData.get(key));
    }
    await axios
      .put(`${BACKEND_URL}/dog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: auth,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/feed/${user.userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    if (checkValidation()) {
      sendPUT();
      console.log('성공했습니다');
    } else {
      console.log('정상처리 실패');
      return;
    }
  };

  return (
    <RegisterContainer>
      <BackHeader />
      <NoEssentialsModal noEssentialsModal={noEssentialsModal} setNoEssentialsModal={setNoEssentialsModal} />
      <RegisterWrapper>
        <InputWrapper>
          <ProfileImage image={imageHold ? `https://togetdog.site/image/dog/` + imageHold : imgURL}>
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
          <div className='profile-error'>{imageErrorMsg}</div>
        </InputWrapper>
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
                placeholder={nameHold}
                value={name}
                onChange={(e) => handleName(e)}
              />
            </div>
          </div>
          <div className='error'>{nameErrorMsg}</div>
        </InputWrapper>
        {/* 성별 입력 */}
        <InputWrapper>
          <div className='input-title'>
            성별
            <span className='red-dot'>*</span>
          </div>
          <div className='horizontal-flex btn-list'>
            {genderBtnList.map((it) => (
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
          <Select defaultValue={breed} onChange={handleBreed} options={breedList} placeholder={breedHold} />
        </InputWrapper>
        {/* 생년 월 입력 */}
        <InputWrapper>
          <div className='age-div'>
            <div className='input-title'>
              출생 정보<span className='red-dot'>*</span>
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
                  placeholder={yearHold}
                  value={year}
                  onChange={(e) => handleYear(e)}
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
                  placeholder={monthHold}
                  value={month}
                  onChange={(e) => handleMonth(e)}
                />
              </div>
              <div className='month'>월</div>
            </div>
          </div>
          <div className='error'>{yearErrorMsg}</div>
          <div className='error'>{monthErrorMsg}</div>
          <div className='error'>{ageErrorMsg}</div>
          <p className='small-font'>정확한 나이를 모르신다면 추정 나이를 입력해 주세요</p>
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
                placeholder={weightHold}
                value={weight}
                onChange={(e) => handleWeight(e)}
              />
            </div>
            <div className='kilogram'>kg</div>
          </div>
          <div className='error'>{weightErrorMsg}</div>
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
                placeholder={perkHold ? perkHold : '특이사항을 입력해 주세요'}
                value={perk}
                onChange={handlePerk}
              />
            </div>
          </div>
          <p className='small-font'>특이사항은 20자 이내로 입력해주세요.</p>
        </InputWrapper>
        <div className='signup-desc'>*표시는 필수 입력 값입니다.</div>
        <div className='btn-wrapper'>
          <MainColorLongBtn onClick={handleEdit}>수정하기</MainColorLongBtn>
        </div>
      </RegisterWrapper>
    </RegisterContainer>
  );
}

export default DogEdit;
