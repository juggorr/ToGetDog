import styled from "@emotion/styled";
import ReactSelect from "react-select";

export const RegisterContainer = styled.div`
  heignt: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RegisterWrapper = styled.div`
  padding: 20px;

  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .small-font {
    font-size: 0.7rem;
  }

  .button-div {
    display: flex;
    justify-content: space-around;
  }
  
  .img-div {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  
  .age-div {
    float: left;
  }
  
  .age-input {
    width: 70px;
  }
  
  .weight-div {
    clear: left;
  }
  
  .unique-input {
    width: 320px;
  }
  
  .signup-desc {
    width: 270px;
    text-align: left;
    font-size: 0.7rem;
    color: red;
  }

  .btn-wrapper {
    padding-top: 1.5rem;
  }
  `;
  
  export const ProfileImage = styled.div`
  background-color: tomato;
  
  width: 80px;
  height: 80px;
  border-radius: 70%;
  padding: 20px;
  margin: auto;
  `;
  
  export const InputWrapper = styled.div`
  width: 17rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 1rem;
  
  .input-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .red-dot {
    color: red;
    margin-left: 3px;
    font-weight: 700;
  }
  
  .horizontal-flex {
    display: flex;
  }

  .input-box {
    border-bottom: 2px solid #e2e2e2;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .general-input-box {
    width: 17rem;
  }

  .number-input-box {
    width: 30%;
    border-bottom: 2px solid #e2e2e2;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .string-input,
  .number-input {
    width: 100%;
    font-size: 0.8rem;
    color: #000;
    border: none;
    background: none;
    outline: none;
    padding: 0.7rem 0.2rem 0.2rem;
  }

  .btn-wrapper {
    padding-top: 1.5rem;
  }

  .btn-list {
    margin-top: 0.5rem;
    width: 270px;
    justify-content: space-around;
  }

  .yaer {
    font-size: 1rem;
    padding-right: 2rem;
    color: red;
  }

  .month {
    font-size: 1rem;
  }

  .kilogram {
    font-size: 1rem;
    vertical-align: bottom;
  }

`

// export const ButtonDiv = styled.div`
//   display: flex;
//   justify-content: space-around;
// `;

// react-select로 dropdown 띠우기
export const BreedDrops = styled(ReactSelect)`
  &.Select--multi  {

    .Select-value {
        display: inline-flex;
        align-items: center;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
  }
`
// export const ImgDiv = styled.div`
//   padding: 20px;
//   display: flex;
//   justify-content: center;
// `