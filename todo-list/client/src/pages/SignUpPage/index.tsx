import React from 'react'
import SignUp from "../../organisms/SignUp"
import './style.css'

const SignUpPage = () => {
  return (
    <div className="container">
        <div className="image">
            <img src="https://www.tamirapharmacy.com/login/svg/admin-img.svg" />
        </div>
        <div className="signup-container">
            <SignUp />
        </div>
    </div>
  )
}

export default SignUpPage