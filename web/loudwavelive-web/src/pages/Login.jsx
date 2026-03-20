import { useState } from "react"
import axios from "axios"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password
        }
      )

      alert("Login successful!")

      console.log(res.data)

    } catch (error) {

      alert("Invalid credentials")
      console.error(error)

    }

  }

  return (

    <div>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/>

        <button type="submit">Login</button>

      </form>

    </div>

  )

}

export default Login