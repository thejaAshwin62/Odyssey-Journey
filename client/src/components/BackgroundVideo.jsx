// BackgroundVideo.jsx
import React from "react";
import styled from "styled-components";
import video from "../assets/images/videoBg.mp4"; // Update this path to your video file

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; // Make sure the video is behind all other content
  opacity: 0.8; // Optional: adjust the opacity if needed
`;

const BackgroundVideo = () => (
  <VideoBackground autoPlay loop muted>
    <source src={video} type="video/mp4" />
    Your browser does not support the video tag.
  </VideoBackground>
);

export default BackgroundVideo;
