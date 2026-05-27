import { useState } from "react";
import axios from "axios";
import "../../styles/global.css";
import "../../styles/auth.css";
import logo from "../../shared/images/loudwavelive-logo.png";

function Register() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role: "ATTENDEE",
      });

      alert("Registration successful!");
      window.location.href = "/login";
    } catch (error) {
      alert("Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-brand">
        <img src={logo} alt="LoudWave Live Logo" />
        <p className="eyebrow">Join LoudWave Live</p>
        <h1>Your next concert night starts with a cleaner ticketing experience.</h1>
        <p>Create an attendee account and keep events, purchases, and digital tickets in one premium workspace.</p>
      </section>

      <section className="auth-panel">
        <form className="auth-form" onSubmit={handleRegister}>
          <p className="eyebrow">Create account</p>
          <h2>Register</h2>
          <input placeholder="First name" value={firstName} onChange={(e) => setFirstname(e.target.value)} required />
          <input placeholder="Last name" value={lastName} onChange={(e) => setLastname(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="auth-submit" type="submit">
            Register
          </button>
          <p className="auth-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Register;
