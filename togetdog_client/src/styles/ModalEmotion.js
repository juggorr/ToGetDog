import styled from '@emotion/styled';

export const MenuModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
  margin-right: 10%;

  .single-menu {
    padding: 0.4rem 0.3rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #e2e2e2;
  }

  .single-menu:last-child {
    border-bottom: none;
  }
`;
