import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Home from './pages/Home'
import Map from './pages/Map'
import NotFound from "./pages/NotFound";
import InternalServer from "./pages/InternalServer";

import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <MainHeader /> */}
        {/* <MainFooter /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/500" element={<InternalServer />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
