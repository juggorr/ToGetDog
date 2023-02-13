import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import MainLayout from "./components/MainLayout";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Walk from "./pages/Walk";
import Chat from "./pages/Chat";
import Feed from "./pages/Feed";
import New from "./pages/New";
import Board from "./pages/Board";
import UserEdit from "./pages/UserEdit";
import PasswordEdit from "./pages/PasswordEdit";
import PasswordSearch from "./pages/PasswordSearch";

/*global kakao*/
import React, { useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Oauth from "./pages/Oauth";
import OauthError from "./pages/OauthError";
import SocialSignup from "./pages/SocialSignup";

import NotFound from "./pages/NotFound";
import InternalServer from "./pages/InternalServer";
import EmailAuth from "./pages/EmailAuth";
import CreateAppointment from "./pages/CreateAppointment";
import DogRegister from "./pages/DogRegister";
import SubLayout from "./components/SubLayout";
import Search from "./pages/Search";
import FollowerList from "./pages/FollowerList";
import FollowingList from "./pages/FollowingList";
import ConfirmModal from "./components/ConfirmModal";

import DogEdit from "./pages/DogEdit";
import Notifications from "./pages/Notifications";
import Recommend from "./pages/Recommend";
import EditBoard from "./pages/EditBoard";
import ChatMsg from "./pages/ChatMsg";
import SocialTemp from "./pages/SocialTemp";
import OauthTemp from "./pages/OauthTemp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Header, Footer 필요한 컴포넌트 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/walk" element={<Walk />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/feed/:userId" element={<Feed />} />
            <Route path="/recommend" element={<Recommend />} />
          </Route>
          {/* BackHeader만 필요한 컴포넌트 */}
          <Route element={<SubLayout />}>
            <Route path="/board/:boardId" element={<Board />} />
            <Route path="/chat/:chatId" element={<ChatMsg />} />
            <Route path="/followerlist/:dogId" element={<FollowerList />} />
            <Route path="/followinglist/:userId" element={<FollowingList />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/useredit" element={<UserEdit />} />
          </Route>
          {/* 그 이외 필요없는 컴포넌트 */}
          <Route path="/new" element={<New />} />
          <Route path="/editBoard/:boardId" element={<EditBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/socialsignup" element={<SocialSignup />} />
          <Route path="/emailAuth" element={<EmailAuth />} />
          <Route path="/passwordedit" element={<PasswordEdit />} />
          <Route path="/passwordsearch" element={<PasswordSearch />} />
          <Route path="/dogregister" element={<DogRegister />} />
          <Route path="/dogedit" element={<DogEdit />} />
          {/* 임시로 링크 */}
          <Route path="/dogdelete" element={<ConfirmModal />} />

          <Route path="/500" element={<InternalServer />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/oauth" element={<Oauth />} />
          <Route path="/oautherror" element={<OauthError />} />
          <Route path="/createAppointment" element={<CreateAppointment />} />
          <Route path="/search" element={<Search />} />
          <Route path="/socialtemp" element={<SocialTemp />} />
          <Route path="/oauthtemp" element={<OauthTemp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
