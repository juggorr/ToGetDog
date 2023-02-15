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
  z-index: 5;
  margin-top: 0.5rem;

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
  position: relative;
  width: 100%;
  top: 1.7rem;
  display: flex;
  justify-content: center;

  .walkList {
    width: 95%;
    height: calc(100vh - 12rem);
    border-radius: 1rem;
    background-color: #f5f0ec;
    padding-top: 2.5rem;
    overflow-y: auto;
  }

  .recommendBtn {
    width: 4rem;
    height: 4rem;
    color: white;
    position: absolute;
    bottom: 1rem;
    right: 1.2rem;
    border-radius: 70%;
    border: 0.3rem solid white;
    background-color: #6eb175;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
  }

  .noMeeting {
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Lato", sans-serif;
    color: #575757;
  }

  .noMeetingTextWrapper {
    text-align: center;
    margin-bottom: 2rem;
  }
  .noMeetingText {
    margin: 0.8rem;
  }
`;

export const SingleMeetingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1.5rem;
  font-family: "Lato", sans-serif;

  .appointmentContainer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0rem;
    font-family: "Lato", sans-serif;
  }

  .singleWrapper {
    position: relative;
  }

  .appointmentLine {
    position: absolute;
    left: 0.149rem;
    height: calc(100% + 1rem);
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

  .singleDog {
    display: flex;
  }

  .ratingBtn {
    position: absolute;
    margin-top: 0.5rem;
    margin-left: -0.5rem;
    background-color: #6eb175;
    border: 2px solid white;
    color: #ffffff;
    width: 5rem;
    height: 2.5rem;
    border-radius: 1rem;
  }

  .singleDogRatingBtn {
    position: absolute;
    margin-top: 3.2rem;
    margin-left: -0.5rem;
    background-color: #6eb175;
    border: 2px solid white;
    color: #ffffff;
    width: 5rem;
    height: 2.5rem;
    border-radius: 1rem;
  }
`;

export const InfoModal = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  width: 100vw;
  height: 100vh;

  .modalInside {
    width: 18rem;
    background-color: #ffffff;
    padding: 2rem 1.5rem;
    border-radius: 2rem;
  }

  .modalOutside {
    width: 100%;
    height: 100%;
  }

  .dogWrapper {
    margin: 0rem;
    display: flex;
  }

  .dogInfo {
    margin: 0rem 1rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .infoText {
    font-size: 0.7rem;
    margin-top: 1.5rem;
  }

  .characterWrapper {
    margin-top: 0.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .btnContainer {
    padding: 0rem 1rem;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around;
  }
`;

export const StarRatingModal = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  width: 100vw;
  height: 100vh;

  .modalInside {
    width: 17rem;
    background-color: #ffffff;
    padding: 1rem 1.2rem;
    border-radius: 1.5rem;
  }

  .modalOutside {
    width: 100%;
    height: 100%;
  }

  .iconWrapper {
    display: flex;
    justify-content: end;
    color: #717171;
  }

  .plainText {
    font-size: 14px;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .checkboxWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkboxText {
    font-size: 12px;
  }

  .btnWrapper {
    margin: 0.5rem 0rem;
    display: flex;
    justify-content: center;
  }
`;

export const Stars = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin-bottom: 1rem;

  .star {
    margin: 0rem 0.15rem;
  }

  .active {
    color: #ffd89d;
  }

  .disabled {
    color: #dddddd;
  }
`;
