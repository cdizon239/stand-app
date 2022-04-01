//  resource: https://www.twilio.com/blog/video-chat-react-hooks
import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import { VideoLobby } from "./VideoLobby";
import { Room } from "./Room";
import "./video.css";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const VideoChat = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [toggleAudio, setToggleAudio] = useState(false);
  const [toggleVideo, setToggleVideo] = useState(true);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      const data = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/video/join_room",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            room_name: roomName,
          }),
        }
      ).then((res) => res.json());
      Video.connect(data.token, {
        name: roomName,
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomName, username]
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  const handleAudioToggle = () => {
    room.localParticipant.audioTracks.forEach((track) => {
      if (track.track.isEnabled) {
        console.log("disable audio");
        track.track.disable();
      } else {
        console.log("enable audio");
        track.track.enable();
      }
      setToggleAudio(track.track.isEnabled);
    });
  };

  const handleVideoToggle = () => {
    room.localParticipant.videoTracks.forEach((track) => {
      if (track.track.isEnabled) {
        track.track.disable();
      } else {
        track.track.enable();
      }
      setToggleVideo(track.track.isEnabled);
    });
  };

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
      <Room
        roomName={roomName}
        room={room}
        handleLogout={handleLogout}
        handleAudioToggle={handleAudioToggle}
        handleVideoToggle={handleVideoToggle}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
      />
    );
  } else {
    render = (
      <>
        <BackNavHeader
          onClick={() => {
            navigate(-1, { replace: true });
            handleLogout();
          }}
        >
          <ArrowLeft className="fs-2" />
          <h5 style={{ margin: "0 15px" }}>Back</h5>
        </BackNavHeader>
        <VideoLobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
          connecting={connecting}
        />
      </>
    );
  }
  return <>{render}</>;
};

const BackNavHeader = styled.div`
  width: 80vw;
  padding: 30px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
