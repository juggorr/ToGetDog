import { useLocation } from "react-router-dom";

const nameRegexp = /^[가-힣]{1,5}$/;
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
    text: '공격적',
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

  const location = useLocation();
  const dogId = location.state;

  const onClick = () => {
    console.log(dogId)
  }

  return (
    <>
    <div>
      수정해보자
      <button onClick={onClick}></button>
    </div>
    </>
  )
}

export default DogEdit;