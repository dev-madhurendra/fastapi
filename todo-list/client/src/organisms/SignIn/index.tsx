import React, { useState } from 'react';
import { Box } from "@mui/material";
import { login } from "../../services/apicalls.ts"
import { URL } from "../../utils/constants.ts"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const containerStyle = {
    width: "500px",
    margin: 'auto',
    padding: '50px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    width: '100%',
    padding: '20px',
    fontSize: "20px",
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center'
  };

  const handleSignIn = async () => {
    const data = { 
        username: email, 
        password: password,
        scope:"",
        client_id:"",
        client_secret:"",
        grant_type:""
    }
    if (email && password) {
        try {
            const res = await login(URL+"/login", data)
            localStorage.setItem("token",res.data.access_token)
            localStorage.setItem("user_id",res.data.user_id)
            alert("Logged in succesfully !")
            navigate("/dashboard")
            window.location.reload()
        } catch (error) {
            console.log("Error while signin up : ", error)
        }
    } else {
        alert('Please enter valid details !')
    }

    setEmail('')
    setPassword('')
  };

  return (
    <Box style={containerStyle}>
      <h2>Sign In</h2>
      <br />
      <div>
        <h3>Email</h3>
        <input
          style={inputStyle}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />
      <div>
        <h3>Password</h3>
        <input
          style={inputStyle}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <div>
        <h2 style={buttonStyle} onClick={handleSignIn}>
          Sign In
        </h2>
        <br />
        <br />
        <p>Or</p>
        <br />
        <p>
          New User ? <a href="/">Sign Up</a>
        </p>
      </div>
    </Box>
  );
}

export default SignIn;
