import styled from '@emotion/styled';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 115px - 1rem);
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 1rem;

  .no-chat {
    height: inherit;
    text-align: center;
    line-height: 70vh;
  }
`;

export const SingleChatListWrapper = styled.div`
  display: flex;
  padding-bottom: 0.7rem;
  width: calc(100% - 32px);

  .chat-profile-box {
    position: relative;
  }

  .chat-content-box {
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 1rem;
  }

  .nickname {
    font-size: 0.9rem;
    padding-bottom: 0.3rem;
  }

  .user-info {
    color: #777;
    font-size: 0.8rem;
    padding-bottom: 0.3rem;
  }

  .chat-preview {
    font-size: 0.8rem;
    width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ChatRedDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: #f24e1e;
  border-radius: 50%;
  position: absolute;
  top: 10%;
  left: 80%;
`;

export const ChatMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  position: relative;

  .modal-wrapper {
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
  }

  .modal-body {
    border-radius: 0.5rem;
    padding: 0.1rem 0.3rem;
    background-color: #fff;
    border: 1px solid #e2e2e2;
    margin-top: 2.5rem;
    margin-right: 2.7rem;
  }

  .single-menu {
    padding: 0.4rem 0.3rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #e2e2e2;
  }

  .chat-menu-icon {
    position: absolute;
    top: -3.2rem;
    right: 1rem;
    width: 2.5rem;
    color: black;
    font-size: 2rem;
    z-index: 10;
  }
`;

export const ChatUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .nickname {
    font-size: 0.9rem;
    padding: 0.3rem 0;
  }

  .user-info {
    color: #777;
    font-size: 0.85rem;
    padding: 0.1rem;
  }
`;

export const ChatBtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 0;

  .chat-btn {
    padding: 0.5rem 0.8rem;
    border: none;
    border-radius: 15px;
  }

  .first-btn {
    background-color: #80b38e;
    color: #fff;
  }

  .second-btn {
    background-color: #ddebe1;
    color: #000;
  }
`;

export const ChatMsgBoxWrapper = styled.div`
  height: 58vh;
  overflow-y: scroll;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  .chat-input-box {
    display: flex;
    align-items: center;
    border: 1.5px solid gray;
    border-radius: 10rem;
    width: 85vw;
    height: 2rem;
  }

  .chat-input {
    height: 1.5rem;
    margin-left: 1rem;
    margin-right: 0.5rem;
    font-size: 0.8rem;
    width: 80%;
    border: none;
  }

  .send-btn {
    width: 1.7rem;
    height: 1.7rem;
    line-height: 1.7rem;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    background-color: #699bf7;
  }
`;

export const MyChatBoxWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  align-items: end;
  justify-content: end;

  .time-txt {
    color: #777;
    font-size: 0.6rem;
    margin-right: 0.3rem;
  }
`;

export const YourChatBoxWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  align-items: end;
  justify-content: start;

  .time-txt {
    color: #777;
    font-size: 0.6rem;
    margin-left: 0.3rem;
  }
`;

export const MyChatBox = styled.div`
  float: right;
  max-width: 60vw;
  background-color: #eee;
  color: #000;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
`;

export const YourChatBox = styled.div`
  float: left;
  max-width: 60vw;
  background-color: #699bf7;
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
`;
