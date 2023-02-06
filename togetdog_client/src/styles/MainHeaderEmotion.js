import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
  display: flex;
  width: inherit;
  height: 60px;

  display: flex;
  justify-content: space-between;

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
  width: 100%;
  height: 60px;

  .back-arrow {
    color: black;
    font-size: 1.5rem;
    padding: 1rem;
  }
`;

export const searchModal = styled.div`
  position: absolute;
`;
