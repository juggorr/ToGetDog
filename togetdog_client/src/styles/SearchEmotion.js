import styled from "@emotion/styled";

export const SearchbarWrapper = styled.div`
  .inside {
    display: flex;
    align-items: center;
    height: 5rem;
    background-color: #ffffff;
  }

  .iconWrapper {
    margin: 1rem;
    font-size: 1.3rem;
  }

  .searchInput {
    margin: 0.7rem 0rem;
    padding: 0rem 0.7rem;
    width: 14.5rem;
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

export const SearchTabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .active {
    background-color: #ffd89d;
  }

  .disabled {
    background-color: #ffffff;
  }

  .singleTab {
    width: 8rem;
    height: 2.4rem;
    border: 1px solid #ffd89d;
    border-radius: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 0.6rem;
    font-size: 0.8rem;
  }
`;

export const ResultListWrapper = styled.div``;
