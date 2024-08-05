import { toast } from "react-toastify";
import { JobsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const [shipsResponse, userInfoResponse] = await Promise.all([
      customFetch.get("/ships"),
      customFetch.get("/auth/me"),
    ]);

    return {
      ships: shipsResponse.data.ships || [], // Ensure ships is an array
      userInfo: userInfoResponse.data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to fetch data");
    return {
      ships: [],
      userInfo: { userId: null, role: null },
    };
  }
};

const AllJobsContext = createContext();

const AllShips = () => {
  const { ships, userInfo } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ ships, userInfo }}>
     
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllShips;
