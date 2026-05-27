import { useState } from "react";
import axios from "axios";
import "../../styles/global.css";
import "../../styles/auth.css";
import logo from "../../shared/images/loudwavelive-logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", { email, password });

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login successful!");

      window.location.href = "/";

    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Login failed";

      alert(`Login failed: ${message}`);

      console.error(error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {

    try {

      const decoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/google",
        {
          firstname: decoded.given_name,
          lastname: decoded.family_name,
          email: decoded.email
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Google login successful!");

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      alert("Google login failed.");
    }
  };

  return (
    <div className="auth-page">

      <section className="auth-brand">
        <img src={logo} alt="LoudWave Live Logo" />

        <p className="eyebrow">LoudWave Live</p>

        <h1>Step inside the control room for premium live events.</h1>

        <p>Sign in to manage tickets, discover shows, and keep every event moment close.</p>
      </section>

      <section className="auth-panel">

        <form className="auth-form" onSubmit={handleLogin}>

          <p className="eyebrow">Welcome back</p>

          <h2>Login</h2>

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button className="auth-submit" type="submit">
            Login
          </button>

          <div className="google-login-wrapper">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("Google login failed.")} />
          </div>

          <p className="auth-link">
            Don't have an account? <a href="/register">Register</a>
          </p>

        </form>

      </section>

    </div>
  );
}

export default Login;