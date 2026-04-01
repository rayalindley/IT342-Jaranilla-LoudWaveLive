import { useState } from "react"
import axios from "axios"
import '../index.css'
import logo from '../images/loudwavelive-logo.png'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { email, password }
      )

      alert("Login successful!")
      console.log(res.data)
    } catch (error) {
      alert("Invalid credentials")
      console.error(error)
    }
  }

  return (
    <div className="login-page">
      {/* Left column */}
      <div className="login-left">
        <img src={logo} alt="LoudWave Live Logo" className="logo-m" />
        <h1>LoudWave Live</h1>
        <p>Concerts & Live Events Made Easy</p>
      </div>

      {/* Right column */}
      <div className="login-right">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button type="submit">Login</button>

          {/* Register link */}
          <p className="register-link">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login