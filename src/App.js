import logo from "./logo.svg";
import "./App.css";
import {Routes, Route} from 'react-router-dom';
import AppLayout from "./ shared/AppLayout";
import Login from "./components/HomePage/Login";
import { Spaces } from "./components/Spaces/Spaces";
import { SpaceDetailPage } from "./components/SpaceDetail/SpaceDetailPage";
import { VideoChat } from "./components/Video/VideoChat";
import TicketDetailPage from "./components/TicketDetail/TicketDetailPage";
import SpaceSettingMembers from "./components/SpaceDetail/SpaceSettingMembers";
import SpaceSettingGeneral from "./components/SpaceDetail/SpaceSettingGeneral";

function App() {
  return (
    <AppLayout className='App'>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/all_spaces" element={<Spaces />}></Route>
        <Route path="/space/:space_id" element={<SpaceDetailPage/>}></Route>
        <Route path="/space/:space_id/edit_members" element={<SpaceSettingMembers/>}></Route>
        <Route path="/space/:space_id/settings" element={<SpaceSettingGeneral/>}></Route>
        <Route path="/ticket/:ticket_id" element={<TicketDetailPage/>}></Route>
        <Route path="/:space_id/videoRoom" element={<VideoChat/>}></Route>
        <Route path="/videoRoom" element={<VideoChat/>}></Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
