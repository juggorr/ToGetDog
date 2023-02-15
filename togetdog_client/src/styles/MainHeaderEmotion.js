import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
  display: flex;
  width: inherit;
  height: 60px;

  position: fixed;
  top: 0;
  justify-content: space-between;
  background-color: #fff;
  z-index: 9;

  .head-icon-wrapper {
    display: flex;
    padding: 0 10px;
  }

  .head-left {
    flex: 7;
  }

  .head-right {
    flex: 3;
  }

  .notoSans {
    font-family: "Noto Sans KR", sans-serif;
  }

  .dongName-box {
    height: 60px;
    text-align: left;
    line-height: 60px;
    padding-left: 10px;
  }

  .dongName-box .header-icon {
    margin-right: 10px;
  }

  .icon-box {
    text-align: center;
    height: 60px;
    width: 45px;
    line-height: 60px;
  }

  .header-icon {
    color: black;
    font-size: 20px;
  }
`;

export const BackHeaderWrapper = styled.div`
  width: 360px;
  height: 60px;
  display: flex;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 9;

  .back-arrow {
    color: black;
    font-size: 1.5rem;
    padding: 1rem;
  }
`;

export const SearchModal = styled.div`
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  @media (min-width: 650px) {
    width: 360px;
  }

  @media (max-width: 650px) {
    /* 650px 이하일 때 */
    width: 100vw;
  }

  .inside {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 5rem;
    background-color: #ffffff;
  }

  .outside {
    height: 90vh;
  }

  .iconWrapper {
    margin: 1rem;
    font-size: 1.3rem;
  }

  .searchInput {
    margin: 0.7rem 0rem;
    padding: 0rem 0.7rem;
    @media (min-width: 650px) {
      width: 14.5rem;
    }

    @media (max-width: 650px) {
      /* 650px 이하일 때 */
      width: 80vw;
    }
    // width: 14.5rem;
    height: 2.5rem;
    border: 2px solid #6eb175;
    border-radius: 1rem;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 0.8rem;
  }

  .searchBtn {
    width: 4rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 0.5rem;
    color: #ffffff;
    background-color: #6eb175;
    border-radius: 0.8rem;
  }
`;

export const PositionDiv = styled.div`
  height: 60px;
`;
