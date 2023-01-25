import styled from "@emotion/styled";

export const Wrapper = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  overflow: hidden;
  border-top: 2px solid grey;
`;

export const DivContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .nested {
    float: left;
    width: 20%;
    text-align: center;

    height: 45px;
    line-height: 45px;
  }

  .nav-item {
    color: black;
  }

  .active {
    color: #559968;
  }
`;