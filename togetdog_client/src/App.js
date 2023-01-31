import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MainLayout from "./components/MainLayout";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Walk from "./pages/Walk";
import Chat from "./pages/Chat";
import Feed from "./pages/Feed";
import New from "./pages/New";
import CreateAppointment from "./pages/CreateAppointment";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import NotFound from "./pages/NotFound";
import InternalServer from "./pages/InternalServer";

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
            <Route path="/new" element={<New />} />
          </Route>
          {/* 그 이외 필요없는 컴포넌트 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/500" element={<InternalServer />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/createAppointment" element={<CreateAppointment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
