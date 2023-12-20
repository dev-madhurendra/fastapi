import React, { useState } from 'react';
import { Box } from "@mui/material";
import { register } from '../../services/apicalls.ts'
import { URL } from "../../utils/constants.ts"
import {useNavigate} from "react-router-dom"

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
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSignUp = async () => {
    const user_data = {
        name: name,
        email: email,
        password: password
    }

    
    if (name && email && password) {
        try {
            const res = await register(URL+"/users/", user_data)
            alert("User registered succesfully !")
            navigate("/login")
        } catch (error) {
            console.log("Error while signin up : ", error)
        }
    } else {
        alert("Please enter correct details !")
    }

    setName('')
    setEmail('')
    setPassword('')
    
    // console.log("Signing up with:", { name, email, password });
    
  };

  return (
    <Box style={containerStyle}>
      <h2>Sign Up</h2>
      <br />
      <div>
        <h3>Name</h3>
        <input
          style={inputStyle}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        <h2 style={buttonStyle} onClick={handleSignUp}>
          Sign Up
        </h2>
        <br />
        <br />
        <p>Or</p>
        <br />
        <p>
          Already registered? <a href="/login">Login</a>
        </p>
      </div>
    </Box>
  );
}

export default SignUp;
