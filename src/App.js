import logo from "./logo.svg";
import "./App.css";
import {Routes, Route} from 'react-router-dom';
import AppLayout from "./ shared/AppLayout";
import Login from "./components/HomePage/Login";
import { Spaces } from "./components/Spaces/Spaces";
import { SpaceDetailPage } from "./components/SpaceDetail/SpaceDetailPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/all_spaces" element={<Spaces />}></Route>
        <Route path="/space/:space_id" element={<SpaceDetailPage/>}></Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
