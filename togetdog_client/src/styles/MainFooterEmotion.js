import styled from '@emotion/styled';

// #BB2649 올해의 팬톤 컬러

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  width: inherit;
  height: 55px;
  background-color: #fff;

  .icon-box {
    width: 20%;
    text-align: center;
    height: 55px;
    line-height: 55px;
  }

  .footer-icon {
    color: #000;
    font-size: 21px;
  }

  .active {
    color: #bb2649;
  }
`;

// export const DivContainer = styled.div`
//   display: flex;
//   // justify-content: space-between;

//   .nested {
//     // float: left;
//     width: 20%;
//     text-align: center;

//     height: 45px;
//     line-height: 45px;
//   }

//   .nav-item {
//     color: black;
//   }

//   .active {
//     color: #559968;
//   }
// `;
