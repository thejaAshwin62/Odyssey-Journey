import React from "react";
import { Form, redirect, Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import login from "../assets/images/login.svg"; // You can use a different image if needed

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#FAFAFA", // Light background color
        padding: 2,
        "@media (max-width: 600px)": {
          padding: 1,
          height: "auto",
          marginTop: 8,
        },
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: "1200px" }}>
        {/* Form Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            order: { xs: 2, md: 1 },
          }}
        >
          <Paper
            elevation={6} // Increased elevation for more depth
            sx={{
              padding: { xs: 2, sm: 4 }, // Responsive padding
              width: "100%",
              maxWidth: "400px", // Larger max-width for the form
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "12px", // More rounded corners
              bgcolor: "#ffffff", // White background for the form
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // More pronounced shadow
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ mb: 2, color: "#333" }}
            >
              Login
            </Typography>
            <Divider sx={{ width: "100%", mb: 2, bgcolor: "#BB61FF" }} />
            <Form method="post" style={{ width: "100%" }}>
              <TextField
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                sx={{ mb: 1 }}
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  bgcolor: "#BB61FF", // Set background color
                  color: "#fff", // White text color
                  "&:hover": {
                    bgcolor: "#a44bd6", // Darker shade for hover effect
                    transform: "scale(1.05)", // Subtle zoom effect on hover
                  },
                  transition: "all 0.3s ease", // Smooth transition effect
                }}
                fullWidth
              >
                Login
              </Button>
              
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 2, color: "#666" }}
              >
                Not a user?{" "}
                <Link
                  to="/register"
                  style={{ color: "#BB61FF", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Typography>
            </Form>
          </Paper>
        </Grid>

        {/* Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" }, // Hide on mobile
            justifyContent: "center",
            alignItems: "center",
            order: { xs: 1, md: 2 },
            marginBottom: { xs: 2, md: 0 },
          }}
        >
          <img
            src={login}
            alt="Login"
            style={{
              width: "100%", // Full width of its container
              maxWidth: "330px", // Increased max-width
              height: "auto", // Maintain aspect ratio
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // More pronounced shadow
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
