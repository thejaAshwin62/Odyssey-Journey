import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  display: grid;
  grid-template-rows: auto 1fr auto; /* Ensure proper spacing */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Adjusted shadow */
  width: 90%; /* Adjusted width */
  max-width: 400px; /* Added max-width for scaling down */
  margin: 0 auto; /* Centered the card */
  padding: 1rem; /* Added padding for internal spacing */
  border-radius: 40px;

  header {
    border-radius: 40px;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .main-icon {
    border-radius: 40px;
    font-size: 1.5rem; /* Reduced font size */
    font-weight: bold;
    background-color: #f4f4f4;
    width: 400px; /* Adjusted width */
    height: 280px; /* Adjusted height */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    margin: 0 auto 1rem; /* Centered and adjusted margin */
    /* Centering the image within its container */
    margin-left: -40px;
    margin-right: -40px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centered info */
    text-align: center;

    h5 {
      font-size: 1.5rem; /* Reduced font size */
      padding: 0.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centered content */
    justify-content: center;
  }

  .content-center {
    font-size: 80%; /* Adjusted font size */
    font-bold: 30px;
    font-weight: 500;
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    margin-left: 1.5rem; /* Adjusted margin */
    grid-template-columns: 1fr;
    row-gap: 1rem; /* Reduced row-gap */
    align-items: center;

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 80px; /* Adjusted width */
    height: 25px; /* Adjusted height */
    display: grid;
    align-items: center;
    justify-content: center; /* Centered status */
    margin: 0 auto; /* Centered status */
  }

  .actions {
    margin-top: 1rem;
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .edit-btn,
  .delete-btn {
    height: 25px; /* Adjusted height */
    font-size: 0.75rem; /* Adjusted font size */
    display: flex;
    align-items: center;
  }

  .edit-btn {
    margin-right: 0.5rem;
  }

  .booked-message {
    box-sizing: border-box;
    color: #eb0606;
    line-height: 16px;
    font-weight: 500;
    font-size: 20px;
  }
`;

export default Wrapper;
