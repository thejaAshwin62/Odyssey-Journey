import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;

  .form-title {
    margin-bottom: 2rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: flex; /* Change to flexbox for better control */

    align-items: flex-start; /* Align items to the top */
    gap: 1rem; /* Add spacing between image and text */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .book-ship {
    width: 350px;
    height: 350px;
  }
  .book-info {
    background-color: #ffffff;
    border-radius: 10px;
  }

  @media (min-width: 992px) {
    .form-center {
      /* Adjust layout for larger screens if needed */
    }
      .secBox{
      
      }
  }

  @media (min-width: 1120px) {
    .form-center {
      /* Adjust layout for even larger screens if needed */
    }
  }
`;

export default Wrapper;
