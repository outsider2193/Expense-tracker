import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/user/login", {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Login successful!", { position: "top-center" });
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.role);

        setTimeout(() => {
          if (res.data.data.role === "user") {
            navigate("/user/userdashboard");
          } else if (res.data.data.role === "admin") {
            navigate("/admindashboard");
          }
        }, 3000);
      } else {
        toast.error("Invalid email or password!", { position: "top-center" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <div className="text-end mt-1">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-decoration-none">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};
