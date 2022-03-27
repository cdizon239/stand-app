import logo from "./logo.svg";
import "./App.css";
import {Routes, Route} from 'react-router-dom';
import AppLayout from "./ shared/AppLayout";
import Login from "./components/HomePage/Login";
import { Spaces } from "./components/Spaces/Spaces";
import { SpaceDetailPage } from "./components/SpaceDetail/SpaceDetailPage";
import { VideoChat } from "./components/Video/VideoChat";
import TicketDetailPage from "./components/TicketDetail/TicketDetailPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/all_spaces" element={<Spaces />}></Route>
        <Route path="/space/:space_id" element={<SpaceDetailPage/>}></Route>
        <Route path="/ticket/:ticket_id" element={<TicketDetailPage/>}></Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
