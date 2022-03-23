import React from "react";
import { NavBar } from "./NavBar";

const AppLayout = (props) => {
  return (
    <div className="App">
      <NavBar />
      {props.children}
    </div>
  );
};

export default AppLayout;
