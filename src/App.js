import logo from "./logo.svg";
import "./App.css";
import {Routes, Route} from 'react-router-dom';
import AppLayout from "./ shared/AppLayout";
import Login from "./components/HomePage/Login";
import { Spaces } from "./components/Spaces/Spaces";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/all_spaces" element={<Spaces />}></Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
