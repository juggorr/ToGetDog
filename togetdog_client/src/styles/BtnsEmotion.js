import styled from "@emotion/styled";
import dog_profile from "../assets/dog2.jpg";

// 홈으로 이동 텍스트 버튼
export const HomeTextBtn = styled.div`
  width: 127px;
  height: 45px;
  border-radius: 10px;

  color: #fff;
  background-color: #000;
  text-align: center;
  line-height: 45px;
  margin-top: 2rem;
`;

export const EmailBtn = styled.button`
  width: 240px;
  height: 50px;
  line-height: 50px;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  background: #6eb175;
  border-radius: 38px;
  margin-top: 50px;
  cursor: pointer;
`;

export const BlackLongBtn = styled.button`
  width: 240px;
  height: 50px;
  line-height: 50px;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  background: #000;
  border-radius: 38px;
  margin-top: 50px;
  cursor: pointer;
`;

export const BlackBtn = styled.button`
  width: 5rem;
  height: 1.8rem;
  font-size: 0.8rem;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  border: none;
`;

export const OptionBtnItem = styled.div`
  cursor: pointer;

  width: 5rem;
  height: 2.9rem;
  line-height: 2.9rem;
  text-align: center;
  background-color: #fff;
  border: 0.1rem solid #4834d4;
  border-radius: 0.7rem;
`;

export const DoubleOptionBtnItem = styled.div`
  cursor: pointer;

  width: 8rem;
  height: 2.9rem;
  line-height: 2.9rem;
  text-align: center;
  background-color: #fff;
  border: 0.1rem solid #4834d4;
  border-radius: 0.7rem;
`;

export const MainColorLongBtn = styled.button`
  width: 11rem;
  height: 2.7rem;
  border-radius: 2rem;
  border: none;

  background-color: #559968;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  // font-family: Noto Sans KR', sans-serif;
`;

export const MainColorShortBtn = styled.button`
  width: 6rem;
  height: 2.3rem;
  line-height: 2.3rem;
  border-radius: 2rem;
  border: none;

  background-color: #559968;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  font-family: "Lato", sans-serif;
`;

export const GreyColorShortBtn = styled.button`
  width: 6rem;
  height: 2.3rem;
  border-radius: 2rem;
  border: none;
  background-color: #717171;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  // font-family: Noto Sans KR', sans-serif;
`;

export const SkyColorShortBtn = styled.button`
  width: 6rem;
  height: 2.3rem;
  border-radius: 2rem;
  border: none;

  background-color: #699bf7;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  // font-family: Noto Sans KR', sans-serif;
`;

export const RedColorShortBtn = styled.button`
  width: 6rem;
  height: 2.3rem;
  border-radius: 2rem;
  border: none;

  background-color: #ff6565;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  // font-family: Noto Sans KR', sans-serif;
`;

export const LightColorLongBtn = styled.button`
  width: 9rem;
  height: 2.7rem;
  border-radius: 2rem;
  border: none;
  background-color: #6eb175;
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  // font-family: Noto Sans KR', sans-serif;
`;

export const OrangeBtn = styled.button`
  background-color: #ffd89d;
  border: none;
  padding: 0.4rem 0.5rem;
  border-radius: 0.6rem;
  margin: 0.1rem 0rem;
  margin-right: 0.5rem;
  font-size: 0.8rem;
`;

export const YellowBtn = styled.button`
  background-color: #fff0cb;
  border: none;
  padding: 0.4rem 0.5rem;
  border-radius: 0.6rem;
  margin: 0.1rem 0rem;
  margin-right: 0.5rem;
  font-size: 0.8rem;
`;

export const PlusBtn = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  background-color: #559968;

  font-size: 3rem;
  line-height: 3.2rem;
  text-align: center;
  color: #fff;
`;

export const FollowBtnOn = styled.button`
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  background-color: #699bf7;
  color: #fff;
  border: none;
  border-radius: 0.7rem;
`;

export const FollowBtnOff = styled.button`
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 0.7rem;
`;

export const UserIconCircle = styled.div`
  .circle {
    width: 5rem;
    height: 5rem;
    margin: 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 70%;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 700;
    color: #ffffff;
    font-size: 1.2rem;
  }

  .one {
    background-color: #949f76;
  }

  .two {
    background-color: #e5d8bd;
  }

  .three {
    background-color: #998769;
  }

  .four {
    background-color: #d1d9cf;
  }

  .five {
    background-color: #81b4be;
  }

  .image {
    background-image: ${(props) =>
      props.image ? `url(${props.image})` : `url(${dog_profile})`};
    background-size: cover;
  }
`;

export const SmallCharacterBtn = styled.div`
  .btn {
    border: none;
    padding: 0.3rem 0.5rem;
    border-radius: 0.6rem;
    margin: 0.1rem 0rem;
    margin-right: 0.5rem;
    font-size: 0.5rem;
  }

  .orange {
    background-color: #ffd89d;
  }

  .yellow {
    background-color: #fff0cb;
  }
`;
