import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../Admin.css";

import {adminLogin} from "../../api/flowApi";


function Login() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        adminName : input,
        password
    };
      // console.log(payload);

      const response = await adminLogin(payload);
      // save the adminId taken from response to the localStorage 
      localStorage.setItem("JwtToken",response.data.token);
      // console.log(response);
      if (response.status === 200){
        setError("Login Successful");
        // alert(response.message || "Login Successful");
        navigate("/adminlogin/dashboard");
      }
       else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username/email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <img src={logo} alt="Logo" className="login-logo" />

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Enter Username or Email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
