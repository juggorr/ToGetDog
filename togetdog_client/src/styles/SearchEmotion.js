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

export const ResultListWrapper = styled.div`
  margin-top: 1rem;

  .noResult {
    margin: 4rem 2rem;
    font-family: "Noto Sans KR", sans-serif;
    color: #717171;
    text-align: center;
  }
`;

export const FriendListWrapper = styled.div`
  padding-top: 0.3rem;
  font-family: "Inter", sans-serif;
  position: relative;

  .singleDog {
    padding: 0.3rem 1rem;
    display: flex;
    align-items: center;
    margin: 0.4rem 0rem;
  }

  .dogInfo {
    margin: 0rem 0.5rem;
  }

  .dogNameWrapper {
    display: flex;
    align-items: end;
  }

  .dogName {
    font-weight: 800;
    font-size: 1rem;
    margin: 0rem 0.5rem;
    margin-left: 0.3rem;
  }

  .dogTown {
    font-size: 0.5rem;
    margin: 0rem;
    color: #ababab;
  }

  .ownerName {
    font-size: 0.7rem;
    margin: 0.2rem;
    color: #717171;
  }

  .dogType {
    font-size: 0.78rem;
    color: #717171;
    margin: 0.4rem 0.3rem;
    display: flex;
    align-items: center;
  }

  .genderWrapper {
    margin: 0rem 0.2rem;
    display: flex;
    align-items: center;
    width: 1rem;
    height: 1rem;
  }

  .genderImg {
    object-fit: contain;
    width: 1rem;
    height: 1rem;
  }

  .noFriends {
    margin: 2rem;
    text-align: center;
    color: #717171;
    font-size: 14px;
  }

  .make-appointment-btn {
    width: 1.7rem;
    height: 1.7rem;
    font-size: 0.8rem;
    background-color: #7fb77e;
    text-align: center;
    line-height: 1.7rem;
    border-radius: 50%;
    color: #fff;
    position: absolute;
    top: 2.2rem;
    left: 4rem;
  }
`;
