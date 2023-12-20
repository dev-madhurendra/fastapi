import React from 'react'
import './style.css'
import {useNavigate} from "react-router-dom"

interface ISidebar {
    name?: string
    email?: string
}

const Sidebar = (props : ISidebar) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
  return (
    <div className="sidebar-container">
        <div className="greetings">
            <div className="greetings-container">
                <h2>{"Good Morning"}</h2>
                <img src="https://cdn-icons-png.flaticon.com/512/1400/1400310.png" alt="good morning" />
            </div>
            <h2>
                {props.name}
            </h2>
        </div>
        <div className="button-div">
            <h2>Tasks</h2>
            <button>
                Completed
            </button>
            <button>
                Todo
            </button>
            <button>
                Today                
            </button>
        </div>
        <div className="button-signout"> 
            <p>{props.email}</p>
            <button onClick={logout}>Sign Out</button>
        </div>
    </div>
  )
}

export default Sidebar