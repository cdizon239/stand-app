import React from 'react'

export const createSpace = async (spaceInfo) => {
    console.log(spaceInfo);
    const {name, members} = spaceInfo
    let createSpace = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/spaces/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
              name: name,
              members: members
          })
        }
      );
      let createdSpace = await createSpace.json();
  
      return createdSpace.data
}
