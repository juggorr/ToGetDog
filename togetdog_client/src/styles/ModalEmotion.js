import styled from "@emotion/styled";

export const MenuModalWrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  @media (min-width: 650px) {
    width: 360px;
  }

  @media (max-width: 650px) {
    /* 650px 이하일 때 */
    width: 100vw;
  }
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: end;
  align-items: start;
`;

export const MenuModalBody = styled.div`
  border-radius: 0.5rem;
  padding: 0.1rem 0.3rem;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
  margin-right: 2.7rem;

  .single-menu {
    padding: 0.4rem 0.3rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #e2e2e2;
  }

  .single-menu:last-child {
    border-bottom: none;
  }
`;

export const ConfirmModalWrapper = styled.div`
  z-index: 9;
  position: fixed;
  top: 0;
  @media (min-width: 650px) {
    width: 360px;
  }

  @media (max-width: 650px) {
    /* 650px 이하일 때 */
    width: 100vw;
  }
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConfirmModalBody = styled.div`
  border-radius: 0.5rem;
  padding: 2rem 0.9rem;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal-msg {
    font-size: 0.75rem;
  }

  .two-btns-wrapper {
    width: 17rem;
    display: flex;
    padding-top: 1.5rem;
    justify-content: space-around;
  }

  .user-nickname {
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.5rem 0;
  }

  .rating-box {
    display: flex;
    padding-bottom: 0.5rem;
    justify-content: space-between;
    align-items: center;
  }

  .rate-img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.8rem;
  }

  .rate {
    font-size: 0.8rem;
  }
`;

export const ConfirmModalImage = styled.img`
  width: 4rem;
  // height: 1rem;

  .no-essentials {
    padding-bottom: 2rem;
  }
`;
