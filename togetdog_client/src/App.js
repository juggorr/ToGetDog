import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Walk from "./pages/Walk";
import CreateAppointment from "./pages/CreateAppointment";
import Chat from "./pages/Chat";
import Feed from "./pages/Feed";
import New from "./pages/New";

import NotFound from "./pages/NotFound";
import InternalServer from "./pages/InternalServer";

import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainHeader />
        <MainFooter />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/walk" element={<Walk />} />
          <Route path="/createAppointment" element={<CreateAppointment />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/new" element={<New />} />
          <Route path="/500" element={<InternalServer />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
