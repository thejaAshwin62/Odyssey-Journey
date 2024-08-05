import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapperr from "../assets/wrappers/ErrorPage";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapperr>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapperr>
    );
  }
  return (
    <Wrapperr>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapperr>
  );
};

export default Error;
