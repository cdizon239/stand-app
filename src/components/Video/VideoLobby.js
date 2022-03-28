import React from "react";
import styled from "styled-components";

export const VideoLobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
}) => {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
      <StyledCard className="card-video">
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h2>Enter a room</h2>
          <div>
            <p>Name</p>
            <input
              type="text"
              id="name"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div>
            <p>Room name</p>
            <input
              type="text"
              id="room"
              value={roomName}
              onChange={handleRoomNameChange}
              required
            />
          </div>
          <StyledButton type="submit">Enter room</StyledButton>
        </form>
      </StyledCard>
    </div>
  );
};

const StyledButton = styled.button`
  border-radius: 3em;
  border: none;
  background: rgba(69, 61, 121, 1);
  min-height: 50px;
  color: white;
  font-weight: 500;
  padding: 0 20px;
`;

const StyledCard = styled.div`
  width: 60%;
  height: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;
