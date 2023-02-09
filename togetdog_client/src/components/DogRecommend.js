import {
  DogName,
  DogProfile,
  DogRecommendWrapper,
} from "../styles/HomeEmotion";

const DogRecommend = () => {
  let dog = {
    img: "https://post-phinf.pstatic.net/MjAyMTA2MDhfMTIw/MDAxNjIzMTQ1NTQwMDU1.1_Esuf0lFSK3JJc7I_VZ3iq1Jj_t52YSBwLrPZPNa6kg.W1SBiwLj_zQ-7tI8ZAFQCv-UoUXO0gr6CXxvYuAj1y0g.JPEG/%EC%8A%88%ED%8D%BC%EC%BD%9C%EB%9D%BC_%EC%9D%B4%EB%AF%B8%EC%A7%803.jpg?type=w1200",
    dogName: "콜라",
  };
  return (
    <>
      <DogRecommendWrapper>
        <DogProfile src={dog.img} />
        <DogName>{dog.dogName}</DogName>
      </DogRecommendWrapper>
    </>
  );
};

export default DogRecommend;
