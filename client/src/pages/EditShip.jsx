import { useLoaderData } from "react-router-dom";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { SHIP_FEATURES } from "../../../utils/constants";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";


export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/ships/${params.id}`);
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/ships/${params.id}`, data);
    toast.success("Ship edited Sucessfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};



const EditShip = () => {
  const { ship } = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="name" defaultValue={ship.name} />
          <FormRow type="number" name="capacity" defaultValue={ship.capacity} />
          <FormRow
            type="text"
            labelText="location"
            name="location"
            defaultValue={ship.location}
          />
          <FormRow
            type="number"
            name="pricePerHour"
            defaultValue={ship.pricePerHour}
          />

          <FormRowSelect
            name="shipFeatures"
            labelText="shipFeatures"
            defaultValue={ship.shipFeatures}
            list={Object.values(SHIP_FEATURES)}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditShip;
