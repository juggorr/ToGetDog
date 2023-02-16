import styled from '@emotion/styled';
import ReactSelect from 'react-select';

import plusIcon from '../assets/plusicon3.png';
import dog_profile from '../assets/dog_profile.png';

export const RegisterContainer = styled.div`
  width: 100%;
  heignt: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const RegisterWrapper = styled.div`
  padding: 20px;

  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .small-font {
    font-size: 0.8rem;
    font-weight: 700;
  }

  .button-div {
    display: flex;
    justify-content: space-around;
  }

  .logo-div {
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .image-div {
    width: 100%;
    height: 100%;
  }

  .input-file {
    display: none;
  }

  .age-div {
    float: left;
  }

  .weight-div {
    clear: left;
  }

  .signup-desc {
    width: 270px;
    text-align: left;
    font-size: 0.8rem;
    color: red;
  }

  .btn-wrapper {
    padding-top: 1.5rem;
  }

  .success {
    color: #0052ff;
    font-size: 0.8rem;
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }

  .profile-error {
    color: red;
    font-size: 0.8rem;
    text-align: center;
  }
`;

export const ProfileImage = styled.div`
  background-color: #fff6e3;
  border: 1px solid #e2e2e2;

  width: 5rem;
  height: 5rem;
  border-radius: 70%;
  padding: 1.25rem;
  margin: auto;

  background-image: ${(props) => (props.image ? `url(${props.image})` : `url(${dog_profile})`)};
  background-size: cover;
  background-position: center;

  position: relative;

  .img-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .success {
    color: #0052ff;
    font-size: 0.8rem;
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }
`;

export const AddImage = styled.div`
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 70%;
  padding: 1.25rem;
  margin: auto;

  position: relative;
  left: 4rem;
  top: 3rem;

  background-image: url(${plusIcon});
  background-size: 100% 100%;

  .label-div {
    width: 100%;
    height: 100%;
  }
`;

export const InputWrapper = styled.div`
  width: 17rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 1rem;

  .input-title {
    font-size: 0.9rem;
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
    font-size: 0.9rem;
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

  .double-option-btn-on {
    background-color: #699bf7;
    color: #fff;
  }

  .year {
    font-size: 0.9rem;
    padding-right: 1.5rem;
  }

  .month {
    font-size: 0.9rem;
  }

  .kilogram {
    font-size: 0.9rem;
    vertical-align: bottom;
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }
`;

// react-select로 dropdown 띠우기
export const BreedDrops = styled(ReactSelect)`
  &.Select--multi {
    .Select-value {
      display: inline-flex;
      align-items: center;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
  }
`;
