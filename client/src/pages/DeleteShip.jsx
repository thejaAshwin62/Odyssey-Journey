import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export async function action({ params }) {
  try {
    await customFetch.delete(`/ships/${params.id}`);
    toast.success("Ship deleted successfully");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect("/dashboard/all-ships");
}

