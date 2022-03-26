import React from 'react'

export const getUsers= async () => {
    let allUsers = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/users/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    let jsonAllUsers = await allUsers.json();

    return jsonAllUsers
  };