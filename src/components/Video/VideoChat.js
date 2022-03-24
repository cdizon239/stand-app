import React, { useCallback, useState } from "react";
import { VideoLobby } from "./VideoLobby";
import { Room } from "./Room";

export const VideoChat = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handleRoomNameChange = useCallback((e) => {
    setRoomName(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/video/join_room",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",            
          },
          credentials: "include",
          body: JSON.stringify({
            identity: username,
            room_name: roomName,
          }),
        }
      ).then((res) => res.json());
      setToken(data.token);
    } catch (err) {
      console.log(err);
    }
  }, [username, roomName]);

  const handleLogout = (e) => {
    setToken(null);
  };

  let render;
  if (token) {
    render = (
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <VideoLobby
         username={username}
         roomName={roomName}
         handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};
