import React from "react";
import styled from "styled-components";
import { MicFill, MicMuteFill, CameraVideoFill, CameraVideoOffFill} from "react-bootstrap-icons";


const Controls = ({
  handleAudioToggle,
  handleVideoToggle,
  audio,
  video
}) => {
  return (
    <>
      <Control>
        <Circle onClick={handleAudioToggle}>
        {audio ? <MicFill/> : <MicMuteFill/>}
        </Circle>
        <Circle onClick={handleVideoToggle}>
        {video ? <CameraVideoFill/> : <CameraVideoOffFill/>}
        </Circle>
      </Control>
    </>
  );
};

export default Controls;

// position: absolute;
// top: 0;
// left: 50%;
// transform: translate(-50%, -50%);

const Control = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
  `,
  Circle = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;
    :not(:first-child) {
      margin-left: 20px;
    }
  `,
  Image = styled.img`
    max-width: 100%;
    width: 30px;
    margin: 0 auto;
  `;