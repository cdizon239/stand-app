import React, { useEffect, useState } from "react";
import { Participant } from "./Participant";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Controls from "./Controls";

export const Room = ({
  roomName,
  room,
  handleLogout,
  handleAudioToggle,
  handleVideoToggle,
  toggleAudio,
  toggleVideo,
}) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant, idx) => (
    <Col>
      <Participant
        key={idx}
        participant={participant}
        isLocal={false}
      />
    </Col>
  ));

  return (
    <div className="room">
      <div
        style={{
          padding: "15px 50px",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <h2>Room: {roomName}</h2>
        <Controls
          handleAudioToggle={handleAudioToggle}
          handleVideoToggle={handleVideoToggle}
          audio={toggleAudio}
          video={toggleVideo}
        />
        <StyledButton onClick={handleLogout}>Leave room</StyledButton>
      </div>

        <Row
          xs={1}
          lg={4}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }}
        >
          <Col>
            <div className="local-participant">
              {room ? (
                <Participant
                  key={room.localParticipant.sid}
                  participant={room.localParticipant}
                  isLocal={true}
                  handleAudioToggle={handleAudioToggle}
                  handleVideoToggle={handleVideoToggle}
                  toggleAudio={toggleAudio}
                  toggleVideo={toggleVideo}
                />
              ) : (
                ""
              )}
            </div>
          </Col>
          {remoteParticipants}
        </Row>
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
