import styled from "@emotion/styled";

export const DropdownWrapper = styled.div`
  display: flex;
  align-items: start;
  font-family: "Lato", sans-serif;
  position: absolute;
  top: 60px;
  z-index: 1;

  .dropdown {
    margin: 0rem;
    margin-left: 1rem;
    padding: 0rem 0rem;
    border-radius: 0.5rem;
    border: 1px solid #999999;
    list-style: none;
    font-size: 0.9rem;
    background-color: #ffffff;
  }

  .dropdownListHeader {
    display: flex;
    align-items: center;
    padding: 0rem 0.5rem;
    border-radius: 0.5rem;
    background-color: #ffffff;
  }

  .dropdownListWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dropdownList {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
    border-top: 1px solid #d9d9d9;
  }

  .dropdownText {
    margin: 0.5rem 0.5rem;
    font-weight: 600;
  }

  .iconWrapper {
    color: #559968;
    margin-left: 0.3rem;
  }

  .plainText {
    margin: 0.5rem;
    font-size: 0.95rem;
  }
`;

export const FriendListWrapper = styled.div`
  margin-top: 3rem;
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

export const CheckBoxWrapper = styled.div`
  display: flex;
  margin: 0rem 1rem;
  margin-bottom: 1rem;

  .checkBox {
    display: flex;
    align-items: center;
    font-family: "Inter", sans-serif;
    font-size: 0.8rem;
    margin: 0rem 0.3rem;
    color: #717171;
  }
`;
