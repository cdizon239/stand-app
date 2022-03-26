import logo from "./logo.svg";
import "./App.css";
import {Routes, Route} from 'react-router-dom';
import AppLayout from "./ shared/AppLayout";
import Login from "./components/HomePage/Login";
import { Spaces } from "./components/Spaces/Spaces";
import { SpaceDetailPage } from "./components/SpaceDetail/SpaceDetailPage";
import { VideoChat } from "./components/Video/VideoChat";
import SpaceBoard from "./components/SpaceDetail/SpaceBoard";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/all_spaces" element={<Spaces />}></Route>
        <Route path="/space/:space_id" element={<SpaceDetailPage/>}></Route>
      </Routes>
      <SpaceBoard />
    </AppLayout>
  );
}

export default App;
