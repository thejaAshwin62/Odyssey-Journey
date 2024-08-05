import styled from "styled-components";

const Wrapperr = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px; // Add padding for some spacing around the content

  img {
    width: 90%;
    max-width: 200px;
    height: auto; // Maintain aspect ratio
    display: block;
    margin-bottom: 1.5rem; // Adjusted margin
    margin-top: 0; // Removed negative margin
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;

export default Wrapperr;
