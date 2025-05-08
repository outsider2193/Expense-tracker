import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/forgot-password", { email });
      toast.success(res.data.message, { position: "top-center" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending reset link", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-3">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Enter your registered Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
