import React, { useEffect, useState } from "react";
import {Participant} from "./Participant";

export const Room = ({ roomName, room, handleLogout, handleAudioToggle, handleVideoToggle, toggleAudio, toggleVideo }) => {
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

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} isLocal={false}
    />
  ));

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Leave room</button>
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
      <div className="remote-participants">
      {participants.length > 1 && <h3>Remote Participants</h3>}
        {remoteParticipants}
        </div>
    </div>
  );
};
