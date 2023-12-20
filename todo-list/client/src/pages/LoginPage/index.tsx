import React from 'react'
import SignIn from "../../organisms/SignIn"
import './style.css'

const SignInPage = () => {
  return (
    <div className="container">
        <div className="image">
            <img src="https://www.tamirapharmacy.com/login/svg/admin-img.svg" />
        </div>
        <div className="signup-container">
            <SignIn />
        </div>
    </div>
  )
}

export default SignInPage