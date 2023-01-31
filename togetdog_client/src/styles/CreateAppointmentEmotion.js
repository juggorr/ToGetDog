import styled from "@emotion/styled";

export const CreateAppointmentWrapper = styled.div`
  .appointmentHeader {
    text-align: center;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 1.5rem 0rem;
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
`;

export const DogImgWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .dogProfileCircle {
    width: 4.2rem;
    height: 4.2rem;
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
