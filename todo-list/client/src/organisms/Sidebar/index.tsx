import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

interface ISidebar {
  name?: string;
  email?: string;
}

const Sidebar: React.FC<ISidebar> = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Night';
    }
  };

  const formatTime = () => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
  };

  const [greeting, setGreeting] = useState<string>(getGreeting());
  const [currentTime, setCurrentTime] = useState<string>(formatTime());

  useEffect(() => {
    // Update greeting dynamically
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sidebar-container">
      <div className="greetings">
        <div className="greetings-container">
          <h3>{greeting}</h3>
          <img src={greeting !== "Good Night" ? "https://cdn-icons-png.flaticon.com/512/1400/1400310.png" : "https://spng.pngfind.com/pngs/s/68-683356_moon-png-tumblr-moon-icon-transparent-png.png"} alt="greeting" />
        </div>
        <h3>{props.name}</h3>
        <p>Current Time: {currentTime}</p>
      </div>
      <div className="button-div">
        <h2>Tasks</h2>
        <button>Completed</button>
        <button>Todo</button>
        <button>Today</button>
      </div>
      <div className="button-signout">
        <p>{props.email.substring(0, 20) + '.....'}</p>
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
