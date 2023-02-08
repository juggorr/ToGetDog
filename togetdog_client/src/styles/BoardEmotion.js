import styled from "@emotion/styled";

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BoardUserInfoBox = styled.div`
  display: flex;
  padding: 0.7rem 0.9rem 0.7rem 2rem;
  justify-content: space-between;

  .board-info-box-left {
    display: flex;
    // padding-left: 1rem;
  }

  .menu-icon {
    height: 2.2rem;
    color: black;
    font-size: 2rem;
  }
`;

export const BoardUserPic = styled.img`
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const BoardUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  justify-content: center;
  padding-left: 0.7rem;

  .dog-name {
    font-size: 1rem;
    padding-bottom: 0.2rem;
    display: flex;
  }

  .dog-info {
    display: flex;
    color: #777;
  }

  .dog-gender {
    width: 1.5rem;
  }
`;

export const BoardPicBox = styled.div`
  padding: 0 2rem;

  .board-pic {
    width: 100%;
  }
`;

export const BoardContentBox = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;

  .like-box {
    display: flex;
  }

  .like-icon {
    font-size: 1.5rem;
    color: #ef5a5f;
  }

  .like-txt {
    padding-left: 0.3rem;
    font-size: 0.8rem;
    line-height: 1.5rem;
  }

  .board-content {
    font-size: 0.9rem;
    padding-top: 0.3rem;
  }
`;

export const BoardCommentBox = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;

  .comment-input-box {
    padding-top: 0.5rem;
    display: flex;
    height: 1.8rem;
  }

  .comment-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #777;
    background: none;
  }

  .comment-btn {
    width: 4rem;
    margin-left: 0.3rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #559968;
    color: #fff;
  }

  .comment-list-box {
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    overflow-y: scroll;
    margin-top: 0.5rem;
    height: calc(100vh - 550px);
  }

  .comment-box {
    display: flex;
    font-size: 0.8rem;
    padding-top: 0.2rem;
  }

  .comment-user {
    flex: 0.2;
    font-weight: 700;
    padding-right: 0.3rem;
  }

  .comment-content {
    flex: 0.8;
  }
`;

export const ContentEditImg = styled.img`
  width: 12rem;
  height: 12rem;
  object-fit: cover;
`;
