import React from "react";
import { NavBar } from "./NavBar";
import { useLocation } from "react-router-dom";

const AppLayout = (props) => {
  const location = useLocation()

  return (
    <div className="App">
      { location.pathname !== '/login' && location.pathname !== '/' && <NavBar />}
      {props.children}
    </div>
  );
};

export default AppLayout;
