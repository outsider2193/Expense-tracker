import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    data.role = "user";
    try {
      const res = await axios.post("http://localhost:3000/user", data);
      console.log(res);

      if (res.status === 201) {
        toast.success("User created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("User creation failed!");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error("Error occurred while creating user!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <ToastContainer />
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="First Name"
              fullWidth
              {...register("firstName", { required: "First Name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              label="Last Name"
              fullWidth
              {...register("lastName", { required: "Last Name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Age"
              type="number"
              fullWidth
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "You must be at least 18 years old" },
              })}
              error={!!errors.age}
              helperText={errors.age?.message}
            />

        <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
