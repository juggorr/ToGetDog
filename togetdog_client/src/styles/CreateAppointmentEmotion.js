import styled from "@emotion/styled";

export const CreateAppointmentWrapper = styled.div`
  .appointmentHeader {
    text-align: center;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 2rem 0rem;
  }

  .btnWrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 4rem;
    padding: 0rem 3rem;
  }
`;

export const WalkRequest = styled.div`
  margin: 0rem 1.7rem;

  .queryStr {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 0.8rem;
    color: #717171;
    white-space: pre-wrap;
  }

  .warningStr {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 0.5rem;
    color: #f24e1e;
    white-space: pre-wrap;
  }

  .dogImageWrapper {
    display: flex;
    direction: row;
  }

  .inputWrapper {
    display: flex;
    justify-content: center;
    margin: 1.5rem;
  }

  .textInput {
    width: 16rem;
    margin-right: 1rem;
    padding: 0.2rem 1rem;
    height: 2rem;
    border: none;
    border-bottom: 1px solid #717171;
    color: #717171;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

export const DogImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0rem 0.3rem;

  .dogProfileCircle {
    width: 5rem;
    height: 5rem;
    border-radius: 70%;
    overflow: hidden;
    margin: 0.3rem 0rem;
  }

  .disabled {
    filter: brightness(50%);
  }

  .dogProfileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0.6rem;
  margin-bottom: 1rem;

  .dateDiv {
    display: flex;
    width: 7rem;
    height: 2.5rem;
    margin: 0rem 0.2rem;

    border: 1px solid #969696;
    border-radius: 0.9rem;
    justify-content: center;
    align-items: center;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    white-space: pre-wrap;
    background-color: #f9f9f9;
  }

  .calendarDiv {
    margin: 0rem 0.7rem;
    color: #717171;
  }
`;

export const DatePickerWrapper = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .calendarHeader {
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    margin: 0rem 1rem;
  }
`;

export const DateModalWrapper = styled.div`
  display: flex;
`;

export const DayWrapper = styled.span`
  font-family: "Inter", sans-serif;
`;
