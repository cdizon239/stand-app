import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Spaces = () => {
  const [spaces, setSpaces] = useState();
  const navigate = useNavigate()

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
    if (jsonAllSpaces.status === 302) navigate("/");
    if (jsonAllSpaces) {
      setSpaces(jsonAllSpaces.data);
      console.log(jsonAllSpaces);
    }
  };

  useEffect(() => {
      getSpaces()
  }, [])  

  return (
      <>
      {spaces && spaces?.map(space => {
       return <h3>{space.name}</h3>}
    )}
      </>
  )
};
