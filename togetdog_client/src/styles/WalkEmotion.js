import styled from "@emotion/styled";

export const WalkListWrapper = styled.div`
  position: relative;
`;

export const TabList = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 999;

  .activeTab {
    background-color: #ffd89d;
  }

  .disabledTab {
    background-color: #ffffff;
  }

  .singleTab {
    width: 6rem;
    height: 2.4rem;
    border: 1px solid #ffd89d;
    border-radius: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 0.3rem;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 0.8rem;
  }
`;

export const MeetingWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 1.2rem;
  display: flex;
  justify-content: center;

  .walkList {
    width: 95%;
    height: calc(100vh - 11rem);
    border-radius: 3%;
    background-color: #f5f0ec;
    padding-top: 2.5rem;
  }

  .recommendBtn {
    width: 4rem;
    height: 4rem;
    color: white;
    position: fixed;
    bottom: 4rem;
    right: 1.2rem;
    border-radius: 70%;
    border: 0.3rem solid white;
    background-color: #6eb175;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
  }
`;

export const SingleMeetingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1.5rem;
  font-family: "Lato", sans-serif;

  .singleWrapper {
    position: relative;
  }

  .appointmentLine {
    position: absolute;
    left: 0.149rem;
    height: 7rem;
    border-left: thin solid #575757;
  }

  .dogProfileImgWrapper {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 70%;
    overflow: hidden;
    margin: 0.3rem 0rem;
  }

  .dogProfileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .manyDog {
    width: 4.2rem;
    height: 4.2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 3.2rem;
  }

  .tinyCircle {
    width: 1.5rem;
    height: 1.5rem;
  }

  .manyDogProfileImgWrapper {
    width: 2.52rem;
    height: 2.52rem;
    border-radius: 70%;
    overflow: hidden;
    margin: -2rem 0rem;
  }

  .manyDogProfileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .appointmentDate {
    margin: 0;
    margin-top: 0.3rem;
    font-size: 0.5rem;
    color: #575757;
    white-space: pre-wrap;
  }

  .appointmentWrapper {
    margin: 1.4rem 0.8rem;
  }

  .nameWrapper {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: end;
  }

  .dogNames {
    font-size: 1rem;
    font-weight: 600;
  }

  .partnerName {
    margin: 0rem 0.6rem;
    font-size: 0.58rem;
    color: #575757;
  }
`;
