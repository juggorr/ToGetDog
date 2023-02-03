import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import MainLayout from "./components/MainLayout";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Walk from "./pages/Walk";
import Chat from "./pages/Chat";
import Feed from "./pages/Feed";
import New from "./pages/New";

/*global kakao*/
import React, { useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import NotFound from './pages/NotFound';
import InternalServer from './pages/InternalServer';
import EmailAuth from './pages/EmailAuth';

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
            <Route path="/feed" element={<Feed />} />
          </Route>
          {/* 그 이외 필요없는 컴포넌트 */}
          <Route path="/new" element={<New />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailAuth" element={<EmailAuth />} />
          <Route path="/500" element={<InternalServer />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
