import { useState } from "react"
import axios from "axios"

function Register() {

  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    if(password != confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
          role: "ATTENDEE"
        }
      )

      alert("Registration successful!")
      console.log(res.data)
      window.location.href = "/login"
    } catch (error) {
      alert("Registration failed")
      console.error(error)
    }
  }

  return (
    <div>
      <div className="registerDiv" style={{display:'flex'}}>
        <div className="leftDiv" style={{width:'50%'}}>
          <p> LoudWave Live </p>
        </div>

        <div className="rightDiv" style={{width:'50%'}}>
          <form onSubmit={handleRegister}>
            <input placeholder="First Name" value={firstName} onChange={(e)=>setFirstname(e.target.value)}/>
            <br/>
            <input placeholder="Last Name" value={lastName} onChange={(e)=>setLastname(e.target.value)}/>
            <br/>
            <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <br/>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            
            <br/>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <br/>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register