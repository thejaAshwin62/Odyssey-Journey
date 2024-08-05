import styled from "styled-components";

const Wrapper = styled.section`
  position: relative; // Make sure that the position is relative so that child elements can be positioned absolutely
  min-height: 100vh; // Ensure the section takes up the full height of the viewport

  // Background Video
  video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1; // Ensure video is behind all other content
    opacity: 0.8; // Optional: adjust the opacity if needed
  }

  // Overlay to enhance text readability
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0); // Semi-transparent black overlay
    z-index: 0; // Ensure overlay is behind the text content
  }

  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    position: relative; // Ensure nav is positioned relative for correct stacking
    z-index: 1; // Ensure nav appears above the video and overlay
  }

  .container {
    position: relative;
    z-index: 2; // Ensure content appears above the overlay
    text-align: center; // Center align text for better readability on top of video
    height: calc(
      100vh - var(--nav-height)
    ); // Adjust height to fill the viewport minus the nav height
    display: flex;
    justify-content: center; // Center horizontally
    align-items: center; // Center vertically
    padding: 0 1rem; // Add padding to ensure content is not too close to the edges
    margin-top: -2rem;
  }

  .info {
    color: #fff; // Change text color to white for better contrast against video background
    max-width: 35em; // Optional: control the maximum width for better readability
    margin-left: auto; // Center text
    margin-right: auto; // Center text
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 2;
    color: #fff; // Changed to complete white
    margin-bottom: 1.5rem;
  }

  .register-link {
    margin-right: 1rem;
  }

  .main-img {
    display: none;
  }

  .btn {
    padding: 0.75rem 1rem;
  }

  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default Wrapper;
