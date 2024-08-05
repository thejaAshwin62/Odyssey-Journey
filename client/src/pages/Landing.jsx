import BackgroundVideo from "../components/BackgroundVideo"; // Ensure this is imported
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

import landing from "../assets/images/landing.svg";

const Landing = () => {
  return (
    <Wrapper>
      <BackgroundVideo /> {/* Ensure this is included */}
      <div className="overlay"></div> {/* Add the overlay */}
      <nav>
        <img src={landing} alt="" />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Ship <span>Register</span> Website
          </h1>
          <p>
            Embark on a journey like no other with our premier ship booking
            service. Whether you're planning a luxurious cruise or a swift ferry
            ride, we offer unparalleled convenience and exceptional choices to
            suit all your Event needs..
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>

          <Link to="/login" className="btn register-link">
            Login
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
