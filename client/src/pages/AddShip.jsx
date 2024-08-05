import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, redirect } from "react-router-dom";
import { SHIP_FEATURES } from "../../../utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import access from "../assets/images/access1.png";

const AddShip = () => {
  const { user } = useOutletContext();
  const [image, setImage] = useState(null);
  const [shipData, setShipData] = useState({
    name: "",
    capacity: "",
    pricePerHour: "",
    location: user.location,
    shipFeatures: SHIP_FEATURES.VIP_LOUNGE,
  });
  const [loading, setLoading] = useState(false); // New state for loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipData({
      ...shipData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    const formData = new FormData();

    Object.keys(shipData).forEach((key) => {
      formData.append(key, shipData[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      await customFetch.post("/ships", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Ship added successfully");
      redirect("all-ships");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to add ship");
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return user.role === "user" ? (
    <img
      src={access}
      alt="Access"
      style={{ maxWidth: "78%", height: "78%", marginLeft: "100px" }}
    />
  ) : (
    <Wrapper>
      <form
        method="post"
        encType="multipart/form-data"
        className="form"
        onSubmit={handleSubmit}
      >
        <h4
          className="form-title"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Add Ship
        </h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={shipData.name}
            onChange={handleChange}
          />
          <FormRow
            type="number"
            name="capacity"
            value={shipData.capacity}
            onChange={handleChange}
          />
          <FormRow
            type="number"
            name="pricePerHour"
            value={shipData.pricePerHour}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="Location"
            name="location"
            value={shipData.location}
            onChange={handleChange}
          />
          <FormRowSelect
            labelText="Ship Features"
            type="text"
            name="shipFeatures"
            value={shipData.shipFeatures}
            onChange={handleChange}
            list={Object.values(SHIP_FEATURES)}
          />
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Submitting...
              </Box>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddShip;
