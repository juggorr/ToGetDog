import styled from "@emotion/styled";

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 0 0 1.5rem;
`;
  
  export const ListWrapper = styled.div`
  padding-bottom: 0.5rem;
  
  width: 100&;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  // .list-div {
  //   width: 100%;
  // }
`;

export const FollowList = styled.ul`
  width: 20rem;
  list-style: none;
  padding: 0;
  justify-content: flex-start;
  display: flex;
  align-items: center;

  float: left;

  // position: relative;
  margin-bottom: -1rem;
`;

export const UserName = styled.div`
  // 가운데 정렬하기 위함
  // positino: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(10%, 35%);
`;