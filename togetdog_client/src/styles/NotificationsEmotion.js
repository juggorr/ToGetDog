import styled from "@emotion/styled";

export const NotificationsWrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;

  .walkRequestWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #bcbcbc;
    border-bottom: 1px solid #bcbcbc;
    padding: 0rem 0.5em;
  }

  .cancelWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bcbcbc;
    padding: 0rem 0.5em;
  }

  .walkRequest {
    display: flex;
    align-items: center;
  }

  .toRequests {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  .imgWrapper {
    width: 3rem;
    height: 3rem;
    margin: 1rem;
  }

  .walkIcon {
    width: 100%;
  }

  .notiCircle {
    width: 1rem;
    height: 1rem;
    border-radius: 70%;
    background-color: #75de92;
    margin: 0rem 1rem;
  }
`;
