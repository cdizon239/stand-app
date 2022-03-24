import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpacesList } from "./SpacesList";
import "./Spaces.css";
import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: 25px;
  border: none;
  background: rgba(69,61,121,1);
  min-height: 50px;
  color: white;
  font-weight: 500;
  padding: 0 2%;
`

export const Spaces = () => {
  const [spaces, setSpaces] = useState();
  const navigate = useNavigate();

  const getSpaces = async () => {
    let allSpaces = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/spaces/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let jsonAllSpaces = await allSpaces.json();
    if (jsonAllSpaces.status === 302) navigate("/login");
    if (jsonAllSpaces) {
      setSpaces(jsonAllSpaces.data);
      console.log(jsonAllSpaces);
    }
  };

  useEffect(() => {
    getSpaces();
  }, []);

  return (
    <>
      <div className=""><h1>Spaces</h1></div>
      <div className="spaces-list-wrapper">
        {spaces && <SpacesList spaces={spaces} />}
      </div>
      <StyledButton>Create a Space</StyledButton>
    </>
  );
};
