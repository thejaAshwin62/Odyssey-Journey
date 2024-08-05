import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* Background color */

  .form-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem; /* Space between form and image */
    max-width: 600px; /* Adjusted max-width for the container */
    width: 100%;
    padding: 1rem; /* Added padding */
    box-sizing: border-box; /* Include padding and border in element's total width and height */
  }

  .form {
    flex: 1;
    max-width: 280px; /* Smaller form width */
    padding: 1rem; /* Padding inside the form */
    border: 1px solid #ccc; /* Light border */
    border-radius: 8px; /* Rounded corners */
    background-color: white; /* White background for the form */
  }

  .image {
    flex: 1;
    max-width: 280px; /* Smaller image width */
    max-height: 60vh; /* Ensure image fits within viewport height */
    object-fit: cover; /* Adjusts the image to cover the container without distortion */
    border-radius: 8px; /* Rounded corners for the image */
  }

  h4 {
    text-align: center;
    margin-bottom: 1rem; /* Margin below heading */
  }

  p {
    margin-top: 0.75rem; /* Margin above paragraph */
    text-align: center;
    line-height: 1.5;
  }

  .btn {
    margin-top: 0.75rem; /* Margin above button */
  }

  .member-btn {
    color: var(--primary-500); /* Primary color for link */
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;

export default Wrapper;
