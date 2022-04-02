import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getRooms } from "../../utils/getRooms";
import { ListGroup } from "react-bootstrap";

export const VideoLobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
}) => {

  const [rooms, setRooms] = useState()

  //  grab all active video rooms
  useEffect(() => {
    let fetchRooms = async () => {
      let allRooms = await getRooms();
      if (allRooms) {
        setRooms(allRooms)
      }
    };
    fetchRooms();
  }, [])


  return (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center', margin: "0 50px" }}>
      <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
        {rooms?.length > 0 ? <h2>List of active rooms</h2> : <h2>No current active rooms <br/> Create and enter a new room</h2>}
        <ListGroup>
        {
          rooms?.map((room, idx) => {
            return <ListGroup.Item key={idx}>{room}</ListGroup.Item>
          })
        }
        </ListGroup>

      </div>
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
              id="username"
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
  margin-top: 20px;
`;

const StyledCard = styled.div`
  width: 60%;
  height: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background: #FDFFFC;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;
