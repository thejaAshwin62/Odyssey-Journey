import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  position: sticky; /* Make the navbar sticky */
  top: 0; /* Stick to the top of the viewport */
  z-index: 1000; /* Ensure it's above other content */

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .logo-text {
    display: none;
  }

  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }

  .btn-container {
    display: flex;
    align-items: center;
  }

  @media (min-width: 992px) {
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;

export default Wrapper;
