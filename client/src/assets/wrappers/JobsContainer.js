import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  min-height: calc(100vh - 4rem); /* Ensure full viewport height minus margin */
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center horizontally */
  justify-content: flex-start; /* Align items to the start (top) */
  padding-top: 2rem; /* Add padding at the top to push content down */
  transition: padding-top 0.3s ease; /* Smooth transition for padding-top */

  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    padding-top: 0rem;
    grid-template-columns: 1fr;
    row-gap: 2rem; /* Space between rows */
    column-gap: 1rem; /* Space between columns (default for small screens) */
    transition: column-gap 0.3s ease, row-gap 0.3s ease; /* Smooth transitions for gaps */
  }
  @media (min-width: 768px) {
    .jobs {
      column-gap: 1.5rem; /* Increase column gap for medium screens */
    }
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr; /* Two columns layout */
      row-gap: 2rem; /* Maintain row gap */
      column-gap: 6rem; /* Space between columns (increased for larger screens) */
    }
  }

  &.centered {
    /* Override default styles when centered */
    padding-top: 0rem;
    height: calc(100vh - 4rem); /* Adjust based on your layout */
  }
`;

export default Wrapper;
